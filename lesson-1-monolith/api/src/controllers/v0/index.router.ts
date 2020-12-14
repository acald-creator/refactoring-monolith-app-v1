import { FeedRouter } from "./feed/routes/feed.router";
import { UserRouter } from "./users/routes/user.router";

export function IndexRouter() {
  const Call = require("@hapi/call");

  const router = new Call.Router();

  router.use("/feed", FeedRouter);
  router.use("/user", UserRouter);

  router.add({
    method: "GET",
    path: "/",
    handler: async (request, h) => {
      return `V0`;
    },
  });
}
