import { Blogcard } from "../../components/Blogcard";
import { Appbar } from "../../components/Appbar";
import { useBlogs } from "../../hooks"
import { BlogSkeleton } from "../../components/BlogSkeleton";

export default function Blogs() {

    const { loading, blogs } = useBlogs();
    if(loading) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
            
        )
    }
    return (
        <div>
            <Appbar />
            <div className="pt-8 flex justify-center">
                <div className="max-w-xl">
                {blogs.map((blog) => (
                    <Blogcard
                        id={blog.id}
                        key={Math.random()} 
                        authorname={blog.author.name || "Anomyous"}
                        title={blog.title}
                        content={blog.content} 
                        publishdate={"19 Oct 2025"}
                    />
                ))}
                </div>
            </div>
        </div> 
    )
}


