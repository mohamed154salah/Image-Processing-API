"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var promises_1 = __importDefault(require("fs/promises"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var imageProcessing_1 = __importDefault(require("../utilities/imageProcessing"));
var routes = express_1.default.Router();
routes.get("/api", function (req, res) {
    //check if query parameter sent 
    if (!req.query.width || !req.query.height || !req.query.filename) {
        res.status(400).send("Please, enter your filename,width,height");
    }
    else {
        //save parameter that have been sent 
        // eslint-disable-next-line prettier/prettier
        var filename = req.query.filename;
        // eslint-disable-next-line prettier/prettier
        var width_1 = req.query.width
            ? parseInt(req.query.width, 10)
            : null;
        var height_1 = req.query.height
            ? parseInt(req.query.height, 10)
            : null;
        //get the path to thumb and images folders  
        var pa_1 = path_1.default.resolve(__dirname, "../../images/", filename + ".jpg");
        var pathThumb_1 = path_1.default.resolve(__dirname, "../../thumb/", filename + width_1 + height_1 + ".jpg");
        //check if file exists
        fs_1.default.stat(pathThumb_1, function (err) {
            if (err == null) {
                //if file exists in thumb folder just display it   
                promises_1.default
                    .readFile(pathThumb_1)
                    .then(function (Data) {
                    res.status(200).contentType("jpg").send(Data);
                })
                    .catch(function (err) {
                    res.status(500).send(err);
                });
            }
            else if (err.code === "ENOENT") {
                // file does not exist in thumb folder check if file exists in images 
                //folder to start processing 
                fs_1.default.stat(pa_1, function (er) {
                    if (er == null) {
                        try {
                            (0, imageProcessing_1.default)(pa_1, pathThumb_1, width_1, height_1).then(function () {
                                promises_1.default
                                    .readFile(pathThumb_1)
                                    .then(function (Data) {
                                    res.status(200).contentType("jpg").send(Data);
                                })
                                    .catch(function () {
                                    res.status(500).send("Error occurred processing the image");
                                });
                            });
                        }
                        catch (err) {
                            res.status(500).send("Error occurred processing the image" + err);
                        }
                    }
                    else if (err.code === "ENOENT") {
                        res.send("File not Exists");
                    }
                });
            }
            else {
                console.log("Some other error: ", err.code);
            }
        });
    }
});
//check server work 
routes.get("/", function (req, res) {
    res.send("server is work !");
});
exports.default = routes;
