import fs from "fs";
import multer from "multer";


export default class ImageController{

    public imageToBase64 (bitmap:any) {
        var encodedImage =  Buffer.from(bitmap).toString('base64');
        return encodedImage;

    } 

    public base64ToImage(code:any) {
        var decodedImage = Buffer.from(code, "base64")
        console.log('decodedImage: ',decodedImage);
        return decodedImage;
    }

}

