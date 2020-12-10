const Koa = require("koa");
const app = new Koa();

app.use(async (ctx: { body: string }) => {
  ctx.body = "Hello world";
});

app.listen(3000);
