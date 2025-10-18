
import { useState, type ChangeEvent } from "react"
import { SignupInput } from "@rishabh100x/medium-common"

export default function AuthForm() {
  const [posts, setpost] = useState<SignupInput>({
    username: "",
    password: "",
    name: "",
  })

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white px-4">
        {/* {JSON.stringify(posts)} */}
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-black mb-2">Create an account</h1>
          <p className="text-gray-500">
            Already have an account?{" "}
            <a href="/signin" className="text-black font-medium underline hover:no-underline">
              Login
            </a>
          </p>
        </div>
        <div className="space-y-6">
          <LabelledInput
            label="Name"
            placeholder="Enter your name"
            onChange={(e) => setpost({ ...posts, name: e.target.value })}
          />
          <LabelledInput
            label="Email"
            placeholder="Enter your email"
            onChange={(e) => setpost({ ...posts, username: e.target.value })}
          />
          <LabelledInput
            label="Password"
            placeholder="Enter your password"
            onChange={(e) => setpost({ ...posts, password: e.target.value })}
          />
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