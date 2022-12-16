import { Request, Response } from "express";
import ImageHelper from "../helpers/image.helper";
import TextController from "../helpers/text.helper";

const { createEncryptedText, createEncryptedTextWithPassword } =
  new TextController();

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
      console.log('error: ', error);
      res.status(500).send({ error });
    }
  };
}
