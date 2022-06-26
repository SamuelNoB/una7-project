import { Partner } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import prisma from '@core/db'

type Data = {
  data: Partner | null
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

async function getOnePartner(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {id} = req.query
  const aPartner = await prisma.partner.findUnique({
    where: {
      id: Number(id)
    },
  });
  return res.status(200).json({data: aPartner})
}

apiRoute.get(getOnePartner)
export default apiRoute;