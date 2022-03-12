/* eslint-disable prettier/prettier */
import sharp from "sharp";
function imageProcessing(
    pathImages: string,
    pathThumb: string,
    width: number | null,
    height: number | null
):Promise<sharp.OutputInfo> {
 return  sharp(pathImages).resize(width, height).toFile(pathThumb);
}
export default imageProcessing;
