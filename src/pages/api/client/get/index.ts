import { PrismaClient,Client } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

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

const prisma = new PrismaClient()

async function getClients(req: NextApiRequest, res: NextApiResponse) {
  const clients = await prisma.client.findMany({
    orderBy: {
      name: 'asc'
    }
  });

  return res.status(200).json({clients});
}
apiRoute.get(getClients)
export default apiRoute