import nextConnect from 'next-connect'
import { getSession } from "next-auth/react"
import { PrismaClient, Client } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import multerUpload from '../../../core/multerConfig'

type Data = {
  message: string
  data: Client
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


async function createClient(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const session = await getSession({ req })
  if( !session) {
    return res.status(401).json({
      error: 'Você não pode acessar essa rota'
    })
  }

  const data: createClientInput = req.body;
  data.visible = data.visible === 'true' ? true : false;
    const result = await prisma.client.create({
      data: {
        clientPhoto: data.Image,
        visible: data.visible,
        name: data.name,
        link: data.link
      }
    });

  return res.status(200).json({
    message: "Cliente criado com sucesso",
    data: result
  })
}

const uploadMiddleware = multerUpload.single('Image')
apiRoute.use(uploadMiddleware)
apiRoute.post(createClient)
export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};