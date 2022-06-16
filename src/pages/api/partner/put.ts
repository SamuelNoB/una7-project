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
  id: number,
  data: updatePartnerInput,
  image: any
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const session = await getSession({ req })

  if(!session) {
    return res.status(401).json({
      error: 'Você não pode acessar essa rota'
    })
  }

  const form = new multiparty.Form({autoFields: true, autoFiles: true});
  const {id, data, image} = await new Promise<promiseDataInput>((resolve, rejects) => {
    form.parse(req, (err, fields, files) => {
      const id = fields.id[0]
      const parsedData = {
        name: fields.name[0],
        link: fields.link[0],
        active: fields.active[0],
      }
      resolve({id, data: parsedData, image: files.image[0]});
    });
  });
  const payload: any = {
    ...data,
  }
  if (image) {
    payload.image = await convertImage(image.path)
    payload.imageType = image.headers['content-type']
  }
  

  const result = await prisma.partner.update({
    where: {
      id
    },
      data: {
        ...payload
      }
  });

  return res.status(200).json({
    message: "Parceiro criado com sucesso",
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