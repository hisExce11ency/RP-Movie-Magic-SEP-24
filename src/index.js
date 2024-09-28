import express from "express";

import routes from "./routes.js";

import hendlebarsInit from "../config/handlevarsInit.js";
import expressInit from "../config/expressInit.js";

const app = express();

hendlebarsInit(app);
expressInit

app.use(routes);

app.listen(5055, () => console.log('Server is listening on http://localhost:5055...'));