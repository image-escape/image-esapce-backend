import dotenv from "dotenv";
import TextController from "./helpers/text.helper";
import fs from "fs";
import ImageController from "./helpers/image.helper";
dotenv.config();
import express from "express";
export const app: express.Application = express();
import multer from "multer";
import multerMiddleware from "./middleware/multer.middleware";

const {
  createEncryptedText,
  createDecryptedText,
  createEncryptedTextWithPassword,
  createDecryptedTextWithPassword,
} = new TextController();

const { imageToBase64, base64ToImage } = new ImageController();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 },
});

app.post("/multerTest", upload.single("file"), (req, res) => {
  console.log(req.file?.buffer);
  const decodedimage = imageToBase64(req.file?.buffer);
  console.log("decodedimage: ", decodedimage);
  const encodedImage = base64ToImage(decodedimage)
  fs.writeFileSync("decode Image.png",encodedImage )
  res.status(200).send({decodedimage});
});

app.listen(4000);

// upload image > convert image to base64> using multer then encrypt without password
// upload image > convert image to base64> using multer then encrypt with password
// 