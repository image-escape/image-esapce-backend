import { Router } from "express";
import ImageController from "../controller/image.controller";
import {
  multerMultiUpload,
  multerSingleUpload,
} from "../middleware/multer.middleware";
const router: Router = Router();

const { imageWithoutPasswordController, imageWithPasswordController,decryptBase64WithPassword,decryptBase64 } =
  new ImageController();

router.post("/", multerSingleUpload, imageWithoutPasswordController);
router.post("/password", multerMultiUpload, imageWithPasswordController);
router.post("/decryptPass",multerMultiUpload, decryptBase64WithPassword);
router.post("/decrypt",multerMultiUpload, decryptBase64);

export default router;

