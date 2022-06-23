import { NextApiRequest, NextApiResponse } from 'next'
import commands from './_data'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({})
    }
    return res.status(200).json({
        versions: Object.keys(commands),
    })
}
