import { PrismaClient, Publication } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

type Data = {
  message: string
  data?: Publication
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

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let {id}: any = req.query
  id = Number(id)
  let result
  try {
    result= await prisma.publication.findUnique({
      where: {
        id
      }
    });
  } catch (error) {
    console.log(error);
    
  }
  if (!result) {
    return res.status(400).json({
      error: 'não foi encontrado nenhuma publicaçao'
    });
  }
  return res.status(200).json({
    message: 'Publicação encontrada',
    data: result
  });
}

apiRoute.get(handler)
export default apiRoute
