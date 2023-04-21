import { NextRequest, NextResponse } from 'next/server'
import commands from './_data'
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

const cors = initMiddleware(Cors({ methods: ['GET', 'OPTIONS'] }))

export const config = {
    runtime: 'edge',
}

export default async function handler(req: NextRequest, res: NextResponse) {
    await cors(req, res)
    if (req.method !== 'GET') {
        return new Response(JSON.stringify({}), {
            status: 405,
        })
    }
    return new NextResponse(
        JSON.stringify({
            versions: Object.keys(commands),
        }),
        { status: 200 },
    )
}
