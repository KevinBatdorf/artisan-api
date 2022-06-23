import { NextRequest, NextResponse } from 'next/server'
import cors from '../../lib/cors'

export async function middleware(req: NextRequest, res: NextResponse) {
    return cors(req, res)
}
