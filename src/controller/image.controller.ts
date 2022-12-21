import { Request, Response } from "express";
import ImageHelper from "../helpers/image.helper";
import TextController from "../helpers/text.helper";
import fs from "fs";
import zlib from "zlib";

const {
  createEncryptedText,
  createEncryptedTextWithPassword,
  createDecryptedTextWithPassword,
  createDecryptedText,
} = new TextController();

export default class ImageController extends ImageHelper {
  public imageWithoutPasswordController = async (
    req: Request,
    res: Response
  ) => {
    try {
      const { buffer } = req.file!;
      if (!buffer) {
        res.status(400).send({ message: "No file found" });
      }
      const encoded = this.imageToBase64(buffer);
      const encryptedBaseText = createEncryptedText(encoded);
      res.status(200).send({ encryptedBaseText });
    } catch (error) {
      res.status(500).send({ error });
    }
  };

  public imageWithPasswordController = async (req: Request, res: Response) => {
    try {
      const { password } = req.body,
        { file }: any = req.files;
      const [{ buffer }] = file;
      const encoded = this.imageToBase64(buffer); // image is converted in base 64 format
      const encryptedBaseText = createEncryptedTextWithPassword(
        encoded,
        password
      );
      res.status(200).send({ encryptedBaseText });
    } catch (error) {
      console.log("error: ", error);
      res.status(500).send({ error });
    }
  };

  /**
   * decryptBase64WithPassword
   */
  public decryptWithPassword = async (req: Request, res: Response) => {
    //make text controller for this

    try {
      const { deflate } = req.query;
      const { encryptedText, password } = req.body;
      const decryptedText = createDecryptedTextWithPassword(
        encryptedText,
        password
      );
      const imageBuffer = this.base64ToImage(decryptedText);
      if (deflate == "true") {
        const deflatedData = zlib.deflateSync(imageBuffer).toString("utf-8");
        res.status(201).send({ data: deflatedData });
      } else {
        res.status(201).send({ data: imageBuffer });
      }
    } catch (error) {
      res.status(500).send({ error });
    }
  };

  /**
   * decryptBase64
   */
  public decrypt = async (req: Request, res: Response) => {
    try {
      const { deflate } = req.query;
      const { encryptedText } = req.body;
      if (!encryptedText) {
        res.status(400).send({ message: "No text found" });
        return;
      }
      const decryptedText = createDecryptedText(encryptedText);
      const imageBuffer = this.base64ToImage(decryptedText);
      if (deflate == "true") {
        const deflatedData = zlib.deflateSync(imageBuffer).toString("utf-8");
        res.status(201).send({ data: deflatedData });
      } else {
        res.status(201).send({ data: imageBuffer });
      }
    } catch (error) {
      res.status(500).send({ error });
    }
  };
}
