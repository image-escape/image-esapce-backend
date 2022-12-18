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

app.use("*", (req, res) => {
  console.log("req: ", req.baseUrl);
  res.status(404).json({ message: "Route Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log("🚀Server started on port ", process.env.PORT);
});

// upload image > convert image to base64> using multer then encrypt without password
// upload image > convert image to base64> using multer then encrypt with password
