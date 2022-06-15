import { Client } from '@prisma/client'
import prisma from '../../../../core/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

type Data = {
  message: string
  client?: Client
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

async function getClient(req: NextApiRequest, res: NextApiResponse) {
  let {id}: any = req.query
  id = Number(id)
  const result = await prisma.client.findUnique({
    where: {
      id
    }
  });

  if (result) {
    return res.status(400).json({
      error: 'não foi encontrado nenhum cliente'
    });
  }
  return res.status(200).json({
    message: 'cliente encontrado',
    client: result
  });
}

apiRoute.get(getClient)
export default apiRoute
