import supertest from "supertest";
import app from "../index";

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
