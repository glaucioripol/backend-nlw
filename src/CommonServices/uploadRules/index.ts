import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

//  existe o multer filter
const configStorage = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', '..', 'uploads'),
    filename(request, file, callback) {
      const hash = crypto.randomBytes(6).toString('hex')
      const cleanName = file.originalname
      // .replace(/[^A-Z0-9]/gi, '_').toLowerCase() // fazer isso em util
      const filename = `${hash}-${cleanName}`
      request.body.filename = filename

      callback(null, filename)
    },
  }),
}

export const upload = multer(configStorage)
