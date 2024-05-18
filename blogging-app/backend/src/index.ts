import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { userRouter } from "./router/userRouter";
import { blogRouter } from "./router/blogRouter";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use(logger());
app.use("/*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blogs", blogRouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
