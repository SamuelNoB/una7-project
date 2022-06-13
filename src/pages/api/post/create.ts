import nextConnect from 'next-connect'
import { getSession } from "next-auth/react"
import { PrismaClient, Publication } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import multiparty from 'multiparty';
import {convertImage} from '../../../core/imageConverter';

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
type promiseDataInput = {
  data: createPostInput,
  image: any
}

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
      email: session.user?.email as any
    }
  })

  const form = new multiparty.Form({autoFields: true, autoFiles: true});
  const {data, image} = await new Promise<promiseDataInput>((resolve, rejects) => {
    form.parse(req, (err, fields, files) => {
      const parsedData = {
        active: fields.active[0],
        title: fields.title[0],
        subtitle: fields.subtitle[0],
        content: fields.content[0],
        Image: files.Image[0]
      }
      resolve({data: parsedData, image: files.Image[0]});
    });
  });

  data.Image = await convertImage(image.path)

  data.active = data.active === 'true' ? true : false;
    const result = await prisma.publication.create({
      data: {
        content: data.content,
        subTitle: data.subtitle,
        title: data.title,
        active: data.active,
        authorId: user?.id as any,
        coverImage: data.Image ?? '',
        imageType: image.headers['content-type']
      }
    });

  return res.status(200).json({
    message: "Publicação criada com sucesso",
    data: result
  })
}

apiRoute.post(handler)
export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};