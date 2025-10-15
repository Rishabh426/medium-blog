import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"

const app = new Hono()

app.post('/api/v1/signup', async (c) => {

})

app.post('/api/v1/signin', async (c) => {

})

app.post('/api/v1/blog', async (c) => {

})

app.put('/api/v1/blog', async (c) => {

})

app.get('/api/v1/blog/:id', async (c) => {

})

export default app
