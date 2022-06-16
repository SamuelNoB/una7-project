import nextConnect from 'next-connect'
import { getSession } from "next-auth/react"
import { Partner } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import multiparty from 'multiparty';
import {convertImage} from '../../../core/imageConverter';
import prisma from '@core/db'
type Data = {
  message: string
  data: Partner
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
  data: createPartnerInput,
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

  const form = new multiparty.Form({autoFields: true, autoFiles: true});
  const {data, image} = await new Promise<promiseDataInput>((resolve, rejects) => {
    form.parse(req, (err, fields, files) => {
      const parsedData = {
        name: fields.name[0],
        link: fields.link[0],
        active: fields.active[0] === 'true'? true: false,
        Image: files.Image[0]
      }
      resolve({data: parsedData, image: files.Image[0]});
    });
  });

  data.Image = await convertImage(image.path)
  const result = await prisma.partner.create({
    data: {
      name: data.name,
      link: data.link,
      active: data.active,
      image: data.Image ?? '',
      imageType: image.headers['content-type']
    }
  });

  return res.status(200).json({
    message: "Parceiro criado com sucesso",
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