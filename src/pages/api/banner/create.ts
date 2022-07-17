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
  data: createBannerInput,
  image: any
}
async function createBanner(
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
        active: fields.active[0],
        name: fields.name[0],
        displayUntil: fields.displayUntil[0],
        link: fields.link[0],
        Image: files.Image[0]
      }
      resolve({data: parsedData ,image: files.Image[0]});
    });
  });
  data.Image = await convertImage(image.path)

  data.active = data.active === 'true' ? true : false;
  const result = await prisma.banner.create({
    data: {
      image: data.Image,
      imageType: image.headers['content-type'],
      active: data.active,
      displayUntil: data.displayUntil,
      name: data.name,
      link: data.link
    }
  })

  return res.status(200).json({
    message: "Banner criado com sucesso",
    data: result
  })
}

//const uploadMiddleware = multerUpload.single('Image')
//apiRoute.use(uploadMiddleware)
apiRoute.post(createBanner)
export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};