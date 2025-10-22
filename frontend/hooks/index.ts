import { useEffect, useState } from "react"
import axios, { type AxiosResponse } from "axios"
import { BACKEND_URL } from "../config"

export interface Blog {
  content: string,
  title: string,
  id: number,
  author: {
    name: string,
  }
}

interface SingleBlogResponse {
  blog: Blog
}

interface MultipleBlogsResponse {
  blog: Blog[]
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [blog, setBlog] = useState<Blog>()

  useEffect(() => {
    axios.get<SingleBlogResponse>(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then((response: AxiosResponse<SingleBlogResponse>) => {
      setBlog(response.data.blog)
      setLoading(false)
    })
  }, [id])

  return { loading, blog }
}

export const useBlogs = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    axios.get<MultipleBlogsResponse>(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: localStorage.getItem("token") || ""
      }
    })
    .then((response: AxiosResponse<MultipleBlogsResponse>) => {
      setBlogs(response.data.blog)
      setLoading(false)
    })
  }, [])

  return { loading, blogs }
}