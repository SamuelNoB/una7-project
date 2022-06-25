import nextConnect from 'next-connect'
import { getSession } from "next-auth/react"
import { Publication } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import multiparty from 'multiparty';
import {convertImage} from '../../../core/imageConverter';
import prisma from '@core/db'
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

type promiseDataInput = {
  data: any,
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
      const parsedData: any = {
        id: Number(fields.id[0]),
        active: fields.active[0],
        title: fields.title[0],
        subTitle: fields.subtitle[0],
        content: fields.content[0],
      }
      if (files.Image) {
        parsedData.coverImage = files.Image[0]
      }
      resolve({data: parsedData, image: parsedData.coverImage});
    });
  });

  if (data.coverImage) {
    data.coverImage = await convertImage(image.path)
  }
  data.active = data.active === 'true' ? true : false;

    const result = await prisma.publication.update({
      where: {
        id: data.id
      },
      data
    });

  return res.status(200).json({
    message: "Publicação atualizada com sucesso",
    data: result
  })
}

apiRoute.put(handler)
export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};