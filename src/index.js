import express from "express";
import 'dotenv/config'


import routes from "./routes.js";

import hendlebarsInit from "./config/handlebarsInit.js";
import expressInit from "./config/expressInit.js";
import mongooseInit from "./config/mongooseInit.js";

const app = express();

mongooseInit();
hendlebarsInit(app);
expressInit(app);

app.use(routes);

app.listen(5055, () => console.log('Server is listening on http://localhost:5055...'));