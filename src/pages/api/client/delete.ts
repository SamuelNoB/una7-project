import nextConnect from 'next-connect'
import { getSession } from "next-auth/react"
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
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

async function deleteClient(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const session = await getSession({ req })
  if( !session) {
    return res.status(401).json({
      error: 'Você não pode acessar essa rota'
    })
  }

  const {id} = req.body;
  const client = await prisma.client.findUnique({
    where: {
      id
    }
  });



  await prisma.client.delete({
    where: {
      id
    }
  });

  return res.status(200).json({
    message: "Cliente criado com sucesso",
  })
}

apiRoute.delete(deleteClient)
export default apiRoute