import Hapi from "@hapi/hapi";
import { sequelize } from "./sequelize";
import { V0MODELS } from "./controllers/v0/model.index";
import { IndexRouter } from "./controllers/v0/index.router";

/*
const dotenv = require("dotenv");
dotenv.config();
*/

const init = async () => {
  await sequelize.addModels(V0MODELS);
  await sequelize.sync();

  const hostname = "localhost";

  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: hostname,
    routes: {
      cors: {
        origin: ["Access-Control-Allow-Origin", "http://localhost:8100"],
        headers: [
          "Access-Control-Allow-Headers",
          "Origin",
          "X-Requested-With",
          "Content-Type",
          "Accept",
          "Authorization",
        ],
      },
    },
  });

  server.route([
    {
      method: "GET",
      path: "/api/v0",
      handler: (request, h) => {
        return IndexRouter;
      },
    },
    {
      method: "GET",
      path: "/",
      handler: (request, h) => {
        return "/api/v0";
      },
    },
  ]);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

init();
