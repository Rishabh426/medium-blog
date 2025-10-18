import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify, sign } from "hono/jwt"

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string,
    }
}>();

blogRouter.post("/*", async (c, next) => {

    await next();
})

blogRouter.post("/", async (c) => {
    
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
        data: { 
            title: body.title,
            content: body.content,
            authorId: "1",
        }
    })

    return c.json({
        id: blog.id,
    })
})

blogRouter.put("/",async (c) => {

    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const blog = await prisma.post.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: blog.id,
    })

})

blogRouter.get("/", async (c) => {

    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findUnique({
            where: {
                id: body,
            }
        });
    
        if(!blog) {
            return c.json({
                error: "cannot find blog",
            })
        }
    
        return c.json({
            id: blog.id,
        })
    }
    catch(err) {
        c.status(411);
        return c.json({
            error: "Error while fetching the data",
        })
    }

})

blogRouter.get("/bulk", async (c) => {

    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const blog = await prisma.post.findMany();

    return c.json({
        blog
    })
})

