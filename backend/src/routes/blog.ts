import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify, sign } from "hono/jwt"
import { CreateBlog, updateBlog } from "@rishabh100x/medium-common";

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

    const authHeader = c.req.header("Authorization") || "";
    if(!authHeader) {
        c.status(403);
        return c.json({
            message: "Missing auth header",
        })
    }
    const user = await verify(authHeader, c.env.JWT_SECRET) as { id: string } ;

    if(user) {
        c.set("userId", user.id);
        await next();
    }   
    else {
        c.status(403);
        return c.json({
            message: "You are not aunthenticated",
        })
    }   
})

blogRouter.post("/", async (c) => {
    
    const body = await c.req.json();
    const { success } = CreateBlog.safeParse(body);

    if(!success) {
        c.status(403);
        return c.json({
            error: "Invalid post type",
        })
    }

    const authorId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
        data: { 
            title: body.title,
            content: body.content,
            authorId: Number(authorId),
        }
    })

    return c.json({
        id: blog.id,
    })
})

blogRouter.put("/",async (c) => {

    const body = await c.req.json();
    const { success } = updateBlog.safeParse(body);

    if(!success) {
        c.status(403);
        return c.json({
            error: "Invalid post input",
        })
    }
    
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

blogRouter.get("/:id", async (c) => {

    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findUnique({
            where: {
                id: Number(id),
            }
        });
    
        if(!blog) {
            return c.json({
                error: "cannot find blog",
            })
        }
    
        return c.json({
            id: blog,
        })
    }
    catch(err) {
        c.status(411);
        return c.json({
            error: "Error while fetching the data",
        })
    }

})



