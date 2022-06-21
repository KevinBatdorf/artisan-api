import { NextRequest } from 'next/server'
import cors from '../../../lib/cors'
import commands from '../_data'

export async function middleware(req: NextRequest) {
    // Make sure its a GET request
    if (req.method !== 'GET') {
        return new Response(JSON.stringify({}), {
            status: 405,
        })
    }

    const data = {
        versions: Object.keys(commands),
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
