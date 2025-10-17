import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { env } from 'hono/adapter'

const app = new Hono()

app.get('/', async (c) => {
  const { DATABASE_URL, JWT_SECRET } = env<{ DATABASE_URL: string; JWT_SECRET: string }>(c);
  console.log(DATABASE_URL);
  return c.text('hi')
})

app.post('/api/v1/signup', async (c) => {
  const { DATABASE_URL, JWT_SECRET } = env<{ DATABASE_URL: string; JWT_SECRET: string }>(c)

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  })

  const jwt = await sign({ id: user.id }, JWT_SECRET)
  return c.json({ jwt })
})

app.post('/api/v1/signin', async (c) => {
  const { DATABASE_URL, JWT_SECRET } = env<{ DATABASE_URL: string; JWT_SECRET: string }>(c)

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  })

  if (!user) {
    c.status(403)
    return c.json({ error: 'user not found' })
  }

  const jwt = await sign({ id: user.id }, JWT_SECRET)
  return c.json({ jwt })
})

export default app