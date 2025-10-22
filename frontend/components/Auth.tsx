
import { useState, type ChangeEvent } from "react"
import { SignupInput } from "@rishabh100x/medium-common"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import axios from "axios"

export default function AuthForm({ type }: { type : "signin" | "signup"}) {

  const navigate = useNavigate();
  const [posts, setpost] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  })

  async function sendReq() {
    
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`, posts);
        const jwt = response.data.jwt;
        localStorage.setItem("token", jwt);
        alert(`${type === "signin" ? "Signed in successfully" : "User created successfully"}`)
        navigate("/blogs");
    }
    catch(err) {
        console.log(err)
        alert("Request failed");
    }
    
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white px-4">
        {/* {JSON.stringify(posts)} */}
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-black mb-2">Create an account</h1>
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                {type === "signin" ? "Signup" : "Signin"}
            </Link>
          </p>
        </div>
        <div className="space-y-6">
          {type === "signup" ? <LabelledInput
            label="Name"
            placeholder="Enter your name"
            onChange={(e) => setpost({ ...posts, name: e.target.value })}
          /> : null}
          <LabelledInput
            label="Email"
            placeholder="Enter your email"
            onChange={(e) => setpost({ ...posts, email: e.target.value })}
          />
          <LabelledInput
            label="Password"
            placeholder="Enter your password"
            onChange={(e) => setpost({ ...posts, password: e.target.value })}
          />
          <button
            onClick={sendReq}
            type="button"
            className="w-full text-white bg-black hover:bg-gray-900 focus:ring-2 focus:ring-gray-400 font-medium rounded-lg text-base px-4 py-3 transition duration-200"
          >
            {type === "signin" ? "Sign in" : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  )
}

interface LabelledInputProps {
  label: string
  placeholder: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function LabelledInput({ label, placeholder, onChange }: LabelledInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-medium text-gray-800">{label}</label>
      <input
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-black focus:ring-0 transition duration-200"
        required
      />
    </div>
  )
}