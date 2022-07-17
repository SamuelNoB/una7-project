import nextConnect from 'next-connect'
import { getSession } from "next-auth/react"
import { Banner } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import multiparty from 'multiparty';
import {convertImage} from '../../../core/imageConverter';
import prisma from '@core/db'

type Data = {
  message: string
  data: Banner
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
  data: any,
  image: any
}
async function updateBanner(
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

  const {id, data, image} = await new Promise<promiseDataInput>((resolve, rejects) => {
    form.parse(req, (err, fields, files) => {
      const parsedData: any = {
        active: fields.active[0],
        displayUntil: new Date(fields.displayUntil[0]),
        name: fields.name[0],
        link: fields.link[0],
      }
      if (files.Image) {
        parsedData.image = files.Image[0]
        parsedData.imageType = files.Image[0].headers['content-type']
      }
      resolve({id: Number(fields.id[0]),data: parsedData ,image: parsedData.image});
    });
  });

  if (data.image) {
    data.image = await convertImage(image.path)
  }

  data.active = data.active === 'true' ? true : false;
    const result = await prisma.banner.update({
      where: {
        id: id
      },
      data
    });

  return res.status(200).json({
    message: "Cliente criado com sucesso",
    data: result
  })
}

//const uploadMiddleware = multerUpload.single('Image')
//apiRoute.use(uploadMiddleware)
apiRoute.put(updateBanner)
export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};