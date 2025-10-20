import { Appbar } from "./Appbar"
import type { Blog } from "../hooks"
import { Avatar } from "./Blogcard"

export const Fullblog = ({ blog } : { blog : Blog}) => {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-20 max-w-screen-xl">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            Posted on oct 20 2025
                        </div>
                        <div className="text-gray-500 pt-5">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-slate-600">
                            Author
                        </div>
                        <div className="flex w-full mt-4">
                            <div className="pr-5 flex flex-col justify-center">
                                <Avatar size="big" name={blog.author.name || "Anonymous"}/>
                            </div>
                            <div>
                                <div className="text-xl font-bold ">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    Random catch phrase about the author ability to grab the user attention
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}