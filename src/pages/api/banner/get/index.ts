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
  let {onlyActive}: any = query;
  onlyActive = onlyActive =='true' ? true : false;
  let filter: any = {}
  if (onlyActive === true) {
    filter = {
      active: true,
      OR: [
        {
          displayUntil: {
            gte: new Date()
          }
        },
        {
          displayUntil: null
        }
      ]
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