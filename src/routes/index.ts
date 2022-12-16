import path from "path";
import { readdirSync } from "fs";

import { Router } from "express";

const router = Router();

const isCompiled = path.extname(__filename) === ".js";//check if the file extension is js or not
const thisFileName = path.basename(__filename);//this gets us the file name

const loadRoutes = async (dirPath: string, prefix = "/") => {
  readdirSync(dirPath, {
    withFileTypes: true,
  }).forEach(async (f) => {
    if (f.isFile()) {
      if (f.name == thisFileName) return;

      const isRouteMod = f.name.endsWith(`.routes.${isCompiled ? "js" : "ts"}`);//if compiled then js hona chahiye warna ts hona chahiye
      if (isRouteMod) {
        const route = f.name.replace(`.routes.${isCompiled ? "js" : "ts"}`, "");//gets the route ex image
        const modRoute = path.join(prefix, route);//adds prefix to route
        console.log("🛰️", "Loaded", modRoute);

        const mod = await import(path.join(baseDir, f.name));//imports routes

        router.use(modRoute, mod.default);//middleware runner
      }
    } else if (f.isDirectory()) {
      await loadRoutes(path.resolve(dirPath, f.name), prefix + f.name);
    }
  });
};

let baseDir = path.dirname(__filename);
baseDir = path.resolve(baseDir); // base directory == routes

loadRoutes(baseDir);
export default router;
