import supertest from "supertest";
import app from "../index";
import path from "path";
import imageProcessing from "../utilities/imageProcessing";
import sharp from "sharp";
import fsp from "fs/promises";

// create a request object
const request = supertest(app);

describe("Test endpoint response", () => {
  it("test server is work", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });

  it("test api with request parameter endpoint  result 200", async () => {
    // eslint-disable-next-line prettier/prettier
    const response = await request.get(
      "/api?filename=fjord&width=900&height=900"
    );
    expect(response.status).toBe(200);
  });

  it("test api without request parameter endpoint  result 400", async () => {
    const response = await request.get("/api");
    expect(response.status).toBe(400);
  });

  it("test api with some request parameter  endpoint result 400", async () => {
    const response = await request.get("/api?filename=fjord&height=900");
    expect(response.status).toBe(400);
  });
});

describe("test processing Image", () => {
  it("test Image processed was successfully created", async () => {
    const pathFile = path.resolve(__dirname, "../../images/", "fjord" + ".jpg");
    const pathThumb = path.resolve(
      __dirname,
      "../../thumb/",
      "fjord" + "500" + "500" + ".jpg"
    );
    const width = 500;
    const height = 500;
    await imageProcessing(pathFile, pathThumb, width, height);
    const photo = (await fsp.readFile(pathThumb)).buffer;

    expect(photo).toBeInstanceOf(ArrayBuffer);
  });
});
