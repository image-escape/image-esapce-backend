import multer from "multer";

// Multer Middleware
const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,
  // limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 },
});

export const multerMultiUpload = upload.fields([
  {
    name: "file",
    maxCount: 1,
  },
  {
    name: "pass",
    maxCount: 1,
  },
]);

export const multerSingleUpload = upload.single("file");
