import express, { Request, Response } from "express";
import sharp from "sharp";
import fsp from "fs/promises";
import fs from "fs";
import path from "path";
import imageProcessing from "../utilities/imageProcessing";
const routes = express.Router();

routes.get("/api", function (req: Request, res: Response) {
  //check if query parameter sent 
  if (!req.query.width || !req.query.height || !req.query.filename) {
    res.status(400).send("Please, enter your filename,width,height");
  } else {
    //save parameter that have been sent 
    // eslint-disable-next-line prettier/prettier
    const filename: string = req.query.filename as string;
    // eslint-disable-next-line prettier/prettier
    const width = req.query.width
      ? parseInt(req.query.width as string, 10)
      : null;
    const height = req.query.height
      ? parseInt(req.query.height as string, 10)
      : null;

    //get the path to thumb and images folders  
    const pa = path.resolve(__dirname, "../../images/", filename + ".jpg");
    const pathThumb = path.resolve(
      __dirname,
      "../../thumb/",
      filename + width + height + ".jpg"
    );
    //check if file exists
    fs.stat(pathThumb, function (err) {
      if (err == null) {
        //if file exists in thumb folder just display it   
        fsp
          .readFile(pathThumb)
          .then((Data: Buffer) => {
            res.status(200).contentType("jpg").send(Data);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      } else if (err.code === "ENOENT") {
        // file does not exist in thumb folder check if file exists in images 
        //folder to start processing 
        fs.stat(pa, function (er) {
          if (er == null) {
            try {
              imageProcessing(pa, pathThumb, width, height).then(() => {
                fsp
                  .readFile(pathThumb)
                  .then((Data: Buffer) => {
                    res.status(200).contentType("jpg").send(Data);
                  })
                  .catch(() => {
                    res.status(500).send("Error occurred processing the image");
                  });
              });
            }
            catch (err) {
              res.status(500).send("Error occurred processing the image" + err);
            }
          } else if (err.code === "ENOENT") {
            res.send("File not Exists");
          }
        });
      } else {
        console.log("Some other error: ", err.code);
      }
    });
  }
});
//check server work 
routes.get("/", (req: Request, res: Response) => {
  res.send("server is work !")
})
export default routes;
