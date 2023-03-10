import { Router } from "express";
import ImageController from "../controller/image.controller";
import {
  multerMultiUpload,
  multerSingleUpload,
} from "../middleware/multer.middleware";
const router: Router = Router();

const {
  imageWithoutPasswordController,
  imageWithPasswordController,
} = new ImageController();


router.post("/", multerSingleUpload, imageWithoutPasswordController);
router.post("/password", multerMultiUpload, imageWithPasswordController);

export default router;
