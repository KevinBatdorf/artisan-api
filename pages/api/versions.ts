import { NextRequest, NextResponse } from 'next/server'
import commands from './_data'
import cors from '../../lib/cors'

export const config = {
    runtime: 'edge',
}

export default async function handler(req: NextRequest, res: NextResponse) {
    if (req.method !== 'GET') {
        return new Response(JSON.stringify({}), {
            status: 405,
        })
    }
    return cors(
        req,
        new NextResponse(JSON.stringify({ versions: Object.keys(commands) }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        }),
    )
}
