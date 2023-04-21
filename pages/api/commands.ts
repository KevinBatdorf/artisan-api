import { NextApiRequest, NextApiResponse } from 'next'
import Fuse from 'fuse.js'
import commands from './_data'
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

const cors = initMiddleware(Cors({ methods: ['GET', 'OPTIONS'] }))

export const config = {
    runtime: 'edge',
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    await cors(req, res)

    const { v, s: search } = req.query

    if (req.method !== 'GET') {
        return res.status(405).json({})
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
    return res.status(200).json(data)
}
