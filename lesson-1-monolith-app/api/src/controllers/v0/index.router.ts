import { FeedRouter } from "./feed/routes/feed.router";

// router.use('/user', UserRouter)

export function IndexRouter() {
  const Call = require("@hapi/call");

  const router = new Call.Router();

  router.use("/feed", FeedRouter);

  router.add(
    {
      method: "GET",
      path: "/",
    },
    `V0`
  );
}
