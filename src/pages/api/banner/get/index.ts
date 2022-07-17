import { Client } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import prisma from "../../../../core/db";
type Data = {
  clients: Partial<Client>[]
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


async function getBanners(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query
  const {onlyActive} = query;
  let filter: any = {}
  if (onlyActive) {
    filter = {
      active: true,
      displayUntil: {
        lte: new Date()
      }
    }
  }
  const banners = await prisma.banner.findMany({
    where: filter,
    orderBy: {
      id: 'asc'
    }
  });

  return res.status(200).json({banners});
}
apiRoute.get(getBanners)
export default apiRoute