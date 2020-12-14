import Hapi from "@hapi/hapi";
import { FeedItem } from "../../feed/models/FeedItem";
import * as AWS from "../../../../aws";

const server = Hapi.server();

export function FeedRouter() {
  server.route([
    {
      method: "GET",
      path: "/",
      handler: async (request, h) => {
        const items = FeedItem.findAndCountAll({
          order: [["id", "DESC"]],
        });

        (await items).rows.map((item) => {
          if (item.url) {
            item.url = AWS.getGetSignedUrl(item.url);
          }
        });

        return items;
      },
    },
    {
      method: "GET",
      path: "/:id",
      handler: async (request, h) => {
        const { id } = request.params;

        const item = FeedItem.findByPk(id);

        return item;
      },
    },
  ]);
}
