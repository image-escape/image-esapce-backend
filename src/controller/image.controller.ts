import { Request, Response } from "express";
import ImageHelper from "../helpers/image.helper";
import TextController from "../helpers/text.helper";

const { createEncryptedText, createEncryptedTextWithPassword,createDecryptedTextWithPassword,createDecryptedText } =
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
      console.log("error: ", error);
      res.status(500).send({ error });
    }
  };

  /**
   * decryptBase64WithPassword
   */
  public decryptBase64WithPassword = async (req: Request, res: Response) => {
    try{
      const { password } = req.body,
      { baseFile }: any = req.files;
    const [{ buffer }] = baseFile;
      createDecryptedTextWithPassword(buffer, password)
    }catch (error) {
      console.log("error: ", error);
      res.status(500).send({ error });
    }
  };

  /**
   * decryptBase64
   */
   public decryptBase64 = async (req: Request, res: Response) => {
    try{
      const { baseFile }: any = req.files;
    const [{ buffer }] = baseFile;
    createDecryptedText(buffer)
    }catch (error) {
      console.log("error: ", error);
      res.status(500).send({ error });
    }
  };

}
