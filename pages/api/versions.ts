import { NextApiRequest, NextApiResponse } from 'next'
import commands from './_data'
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

const cors = initMiddleware(Cors({ methods: ['GET', 'OPTIONS'] }))

export const config = {
	runtime: 'edge',
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    await cors(req, res)
    if (req.method !== 'GET') {
        return res.status(405).json({})
    }
    return res.status(200).json({
        versions: Object.keys(commands),
    })
}
