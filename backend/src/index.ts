import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { sign } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>();

app.post('/api/v1/signup', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  
  try {

    const user_exist = await prisma.user.findUnique({
      where: {
        email: body.email,
      }
    })

    if(user_exist) {
      return c.json({
        message: "User already exists",
      })
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      }
    });
    
    const jwt = await sign({
      userid: user.id,
    }, c.env.JWT_SECRET);
  }

  catch(err) {
    console.log("Error occured while signing up ." + err);
  }
})


app.post('/api/v1/signin', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      }
    });
  
    if(!user) {
      c.status(403);
      return c.json({
        error: "User not found",
      });
    }

    const jwt = await sign({
      id: user.id,
    }, c.env.JWT_SECRET)

    return c.json({jwt});
  }
  catch(err) {
    return c.json({
      error: "Error while performing signin",
    })
  }
});

app.post('/api/v1/blog', async (c) => {

})

app.put('/api/v1/blog', async (c) => {

})

app.get('/api/v1/blog/:id', async (c) => {

})

export default app
