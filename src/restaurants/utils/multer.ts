import { UnprocessableEntityException } from '@nestjs/common';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { existsSync, mkdirSync } from 'fs';

export const multerOptions = {
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE),
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      // Allow storage of file
      return cb(null, true);
    }

    // Reject file
    cb(
      new UnprocessableEntityException(
        `Unsupported file mimetype type ${file.mimetype}`,
      ),
      false,
    );
  },
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = './photos';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any) => {
      const extFileName = extname(file.originalname);
      const guid = nanoid();

      cb(null, `${guid}${extFileName}`);
    },
  }),
};
