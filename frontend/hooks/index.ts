import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

interface blog {
    content: string,
    title: string,
    id: number,
    author: {
        name: string,
    }
}
export const useBlogs = () => {
    
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        })
            .then(response => {
                setBlogs(response.data.blog);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}   