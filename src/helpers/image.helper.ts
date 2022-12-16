import { Format } from "../enums/utils.enums";

export default class ImageHelper {
  public imageToBase64(bitmap: any) {
    const encodedImage = Buffer.from(bitmap).toString(Format.BASE_64);
    return encodedImage;
  }

  public base64ToImage(code: any) {
    const decodedImage = Buffer.from(code, Format.BASE_64);
    return decodedImage;
  }
}
