import { NextRequest, NextResponse } from 'next/server'
import Fuse from 'fuse.js'
import commands from './_data'
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

const cors = initMiddleware(Cors({ methods: ['GET', 'OPTIONS'] }))

export const config = {
    runtime: 'edge',
}

export default async function handler(req: NextRequest, res: NextResponse) {
    await cors(req, res)

    const search = req.nextUrl.searchParams.get('s')
    const v = req.nextUrl.searchParams.get('v')

    if (req.method !== 'GET') {
        return new Response(JSON.stringify({}), {
            status: 405,
        })
    }

    const versions = Object.keys(commands)
    const version =
        versions?.find((version) => version === v?.toString()) ?? versions.at(0)
    const json = commands[version as keyof typeof commands]

    // Search the list for the search term if provided
    let results
    if (search?.toString()) {
        const fuse = new Fuse(json, {
            keys: ['name', 'description', 'aliases'],
        })
        results = fuse.search(search?.toString()).map((result) => result.item)
    }

    const data = {
        version: version,
        commands: results ?? json,
    }
    return new NextResponse(JSON.stringify(data), { status: 200 })
}
