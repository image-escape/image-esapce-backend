import { Request, Response } from "express";
import ImageHelper from "../helpers/image.helper";
import TextController from "../helpers/text.helper";
import zlib from "zlib";

const {
  createDecryptedTextWithPassword,
  createDecryptedText,
} = new TextController();

export default class TextConvertController extends ImageHelper {

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
