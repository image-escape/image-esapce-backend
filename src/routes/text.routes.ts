import { Router } from "express";
import ImageController from "../controller/image.controller";
const router: Router = Router();

const {
  imageWithoutPasswordController,
  imageWithPasswordController,
  decryptWithPassword: decryptBase64WithPassword,
  decrypt: decryptBase64,
} = new ImageController();

router.post("/decryptPass", decryptBase64WithPassword);
router.post("/decrypt", decryptBase64);

export default router;
