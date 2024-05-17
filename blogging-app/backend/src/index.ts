import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { userRouter } from './router/userRouter';
import { blogRouter } from './router/blogRouter';

const app = new Hono()

app.use(logger())

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blogs', blogRouter);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
