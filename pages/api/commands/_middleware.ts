import { NextRequest } from 'next/server'
import Fuse from 'fuse.js'
import cors from '../../../lib/cors'
import commands from '../_data'

export async function middleware(req: NextRequest) {
    const params = req.nextUrl.searchParams

    // Make sure its a GET request
    if (req.method !== 'GET') {
        return new Response(JSON.stringify({}), {
            status: 405,
        })
    }

    const versions = Object.keys(commands)
    const version =
        versions?.find((version) => version === params.get('v')) ??
        versions.at(-1)
    const json = commands[version as keyof typeof commands]

    // Search the list for the search term if provided
    let results
    const search = params.get('s')
    if (search) {
        const fuse = new Fuse(json, {
            keys: ['name', 'description', 'aliases'],
        })
        results = fuse.search(search).map((result) => result.item)
    }

    const data = {
        version: version,
        commands: results ?? json,
    }

    // Return data to client with cors headers
    return cors(
        req,
        new Response(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            },
        }),
    )
}
