import multer from "multer";
import mime from 'mime-types'
import { randomUUID } from "crypto";

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      const fileName = randomUUID();
      const ext = '.'+ mime.extension(file.mimetype);
      req.body.coverImage =  fileName+ext;
      cb(null, fileName+ext);
    }
  })
})

export default multerUpload;