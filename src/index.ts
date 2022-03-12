/* eslint-disable prefer-const */
import express, { Application } from "express";

import routes from "./routes/index";

const PORT = process.env.PORT || 3000;
// create an instance server
const app: Application = express();
// HTTP request logger middleware
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`);
});

export default app;
