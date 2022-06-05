import nextConnect from 'next-connect'
import { getSession } from "next-auth/react"
import { PrismaClient, Publication } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import multerUpload from '../../../core/multerConfig'

type Data = {
  message: string
  data: Publication
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


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const session = await getSession({ req })

  if( !session) {
    return res.status(401).json({
      error: 'Você não pode acessar essa rota'
    })
  }
  const user = await prisma.user.findUnique( {
    where: {
      email: session.user?.email
    }
  })

  const data: createPostInput = req.body;
  data.active = data.active === 'true' ? true : false;
    const result = await prisma.publication.create({
      data: {
        content: data.content,
        subTitle: data.subtitle,
        title: data.title,
        active: data.active,
        authorId: user?.id,
        coverImage: data.Image ?? ''
      }
    });

  return res.status(200).json({
    message: "Publicação criada com sucesso",
    data: result
  })
}

const uploadMiddleware = multerUpload.single('Image')
apiRoute.use(uploadMiddleware)
apiRoute.post(handler)
export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};