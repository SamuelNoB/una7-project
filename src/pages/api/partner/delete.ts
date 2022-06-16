import nextConnect from 'next-connect'
import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@core/db'

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

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if( !session) {
    return res.status(401).json({
      error: 'Você não pode acessar essa rota'
    })
  }

  const {id} = req.body;

  await prisma.partner.delete({
    where: {
      id
    }
  })

  return res.status(200).json({message: 'Parceiro excluído com sucesso'})
}

apiRoute.delete(handler)
export default apiRoute