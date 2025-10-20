import { Blogcard } from "../../components/Blogcard";
import { Appbar } from "../../components/Appbar";
import { useBlogs } from "../../hooks"

export default function Blogs() {

    const { loading, blogs } = useBlogs();
    if(loading) {
        return (
            <div>
                Loading ...
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


