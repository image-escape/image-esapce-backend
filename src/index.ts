import dotenv from "dotenv";
import TextController from "./helpers/text.helper";
import fs from "fs";
import ImageHelper from "./helpers/image.helper";
import router from "./routes/index";
dotenv.config();
import express from "express";
export const app: express.Application = express();
import multer from "multer";
import cors from "cors";

const {
  createEncryptedText,
  createDecryptedText,
  createEncryptedTextWithPassword,
  createDecryptedTextWithPassword,
} = new TextController();

const { imageToBase64, base64ToImage } = new ImageHelper();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  // limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 },
});

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api", router);

app.post(
  "/image/pass",
  upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
    {
      name: "pass",
      maxCount: 1,
    },
  ]),
  (req, res) => {
    const password = req.body.pass;
    const file: any = req.files;
    const encoded = imageToBase64(file.file[0].buffer); // image is converted in base 64 format
    const encryptedBaseText = createEncryptedTextWithPassword(
      encoded,
      password
    );
    res.status(200).send({ encryptedBaseText }); // encrypted base 64 format being sent
  }
);

app.listen(5000, () => {
  console.log("🚀Server started on port 5000");
});

// upload image > convert image to base64> using multer then encrypt without password
// upload image > convert image to base64> using multer then encrypt with password
