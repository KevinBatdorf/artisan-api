import { NextRequest, NextResponse } from 'next/server'
import Fuse from 'fuse.js'
import commands from './_data'
import cors from '../../lib/cors'

export const config = {
    runtime: 'edge',
}

export default async function handler(req: NextRequest, res: NextResponse) {
    const search = req.nextUrl.searchParams.get('s')
    const v = req.nextUrl.searchParams.get('v')

    if (req.method !== 'GET') {
        return new Response(JSON.stringify({}), {
            status: 405,
        })
    }

    const start = Date.now()

    const versions = Object.keys(commands)
    const version =
        versions?.find((version) => version === v?.toString()) ?? versions.at(0)
    const json = commands[version as keyof typeof commands]

    // Search the list for the search term if provided
    let results
    if (search?.toString()) {
        const fuse = new Fuse(json, {
            keys: ['name', 'aliases', 'description', 'synopsis'],
            ignoreLocation: true,
            includeScore: true,
            threshold: 0.5,
        })
        const fuse2 = new Fuse(json, {
            keys: ['arguments.description', 'options.description'],
            ignoreLocation: true,
            includeScore: true,
            threshold: 0.1,
        })
        const search1 = fuse.search(search?.toString())
        const search2 = fuse2.search(search?.toString())
        results = [...search1, ...search2]
        // sort by score
        results.sort((a, b) => (a?.score ?? 0) - (b?.score ?? 0))
        // map to items
        results = results
            .map((r) => r.item)
            // remove duplicates
            .filter((v, i, a) => a.findIndex((t) => t.name === v.name) === i)
    }

    const data = {
        version: version,
        commands: results ?? json,
    }
    return cors(
        req,
        new NextResponse(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'X-Search-Latency': `${Date.now() - start}ms`,
            },
        }),
    )
}
