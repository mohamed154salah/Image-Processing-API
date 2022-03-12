"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
var sharp_1 = __importDefault(require("sharp"));
function imageProcessing(pathImages, pathThumb, width, height) {
    return (0, sharp_1.default)(pathImages).resize(width, height).toFile(pathThumb);
}
exports.default = imageProcessing;
