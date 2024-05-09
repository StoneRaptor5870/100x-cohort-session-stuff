import { Hono, Next, Context } from 'hono'

const app = new Hono()

async function authMiddleware(c: Context, next: Next) {
  if (c.req.header("Authorization")) {
    await next()
  } else {
    return c.text("you dont have access");
  }
}

app.post('/', authMiddleware, async (c) => {
  const body = await c.req.json()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text('Hello Hono!')
})

app.get('/', async (c) => {
  return c.text("HELLO THERE")
})

export default app
