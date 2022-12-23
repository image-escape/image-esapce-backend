import { Router } from "express";
import TextConvertController from "../controller/text.controller";
import ImageController from "../controller/text.controller";
const router: Router = Router();

const {
  decryptWithPassword: decryptBase64WithPassword,
  decrypt: decryptBase64,
} = new TextConvertController();

router.post("/", decryptBase64);
router.post("/password", decryptBase64WithPassword);

export default router;
