import { Router } from "express";
import ImageController from "../controller/image.controller";
const router: Router = Router();

const {
  imageWithoutPasswordController,
  imageWithPasswordController,
  decryptWithPassword: decryptBase64WithPassword,
  decrypt: decryptBase64,
} = new ImageController();

router.post("/", decryptBase64);
router.post("/password", decryptBase64WithPassword);

export default router;
