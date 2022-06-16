import { Partner } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import prisma from '@core/db'

type Data = {
  data: Partial<Partner>[]
}
type Error = {
  error: string
}

const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest,
    res: NextApiResponse<Data | Error>
  ) {  return res.status(400).json({
    error: 'Ocorreu um erro ao processar a solicitação.'
  })}
})

async function getAllPartner(req: NextApiRequest, res: NextApiResponse<Data>) {
  const allPosts = await prisma.partner.findMany({
    where: {
      active: true
    },
    orderBy: {
      name: 'asc'
    }
  });
  return res.status(200).json({data: allPosts})
}

apiRoute.get(getAllPartner)
export default apiRoute;