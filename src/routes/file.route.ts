import { Router  } from "express";
import { multerErrorHandler, uploadMulter, validateAuthorization } from "../middlewares/file.middleware";
import { fileController } from "../controllers";

export const routerFile = Router();
export const routerStaticFile = Router();

routerFile.post('/file-justification-upload', uploadMulter.single('archivo'), multerErrorHandler, fileController.uploadFile)
routerStaticFile.get('', validateAuthorization)