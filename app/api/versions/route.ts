import { NextRequest, NextResponse } from 'next/server'
import commands from '../../../lib/data'
import cors from '../../../lib/cors'

export async function OPTIONS(req: NextRequest) {
    return cors(req, new NextResponse(null))
}

export async function GET(req: NextRequest) {
    return cors(
        req,
        new NextResponse(JSON.stringify({ versions: Object.keys(commands) }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        }),
    )
}
