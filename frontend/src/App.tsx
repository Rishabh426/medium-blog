import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "../components/Signup"
import Signin from "../components/Signin"
import Blog from "../components/Blog"

function App() {

  return (  
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
