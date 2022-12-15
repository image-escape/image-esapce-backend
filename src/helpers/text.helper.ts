import * as crypto from "crypto";

export default class TextController {
  private _secret: string = process.env.SECRET_KEY!;
  private _algorithm: string = process.env.ALGORITHM!;

  private _createEncryptionKey = () => {
    return crypto.scryptSync(this._secret, "salt", 24);
  };

  private _createIV = () => {
    return Buffer.alloc(16, 0);
  };

  private _createCustomKey = (password: string) => {
    return crypto.scryptSync(password, "salt", 24);
  };

  // To Create Encrypted Text Without Password
  public createEncryptedText = (text: string) => {
    const key = this._createEncryptionKey(),
      iv = this._createIV();
    // console.log("iv: ", iv);
    // console.log("key: ", key);
    const cipher = crypto.createCipheriv(this._algorithm, key, iv);
    const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
    // console.log("encrypted: ", encrypted, text);das
    return encrypted;
  };

  public createDecryptedText = (encryptedText: string) => {
    const key = this._createEncryptionKey(),
      iv = this._createIV();
    const decipher = crypto.createDecipheriv(this._algorithm, key, iv);
    const decrypted =
      decipher.update(encryptedText, "hex", "utf8") + decipher.final("utf8");
    // console.log("decrypted: ", decrypted);
  };

  // To Create Encrypted Text With Password
  public createEncryptedTextWithPassword = (text: string, password: string) => {
    const key = this._createCustomKey(password),
      iv = this._createIV();
    // console.log("iv: ", iv);
    // console.log("key: ", key);
    const cipher = crypto.createCipheriv(this._algorithm, key, iv);
    const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
    // console.log("encrypted: ", encrypted, text);
    return encrypted;
  };

  public createDecryptedTextWithPassword = (
    encryptedText: string,
    password: string
  ) => {
    const key = this._createCustomKey(password),
      iv = this._createIV();
    const decipher = crypto.createDecipheriv(this._algorithm, key, iv);
    const decrypted =
      decipher.update(encryptedText, "hex", "utf8") + decipher.final("utf8");
    console.log("decrypted: ", decrypted);
  };
}
