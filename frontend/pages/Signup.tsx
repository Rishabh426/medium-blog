import Quote from "../components/Quote"
import Auth from "../components/Auth"

export default function Signup() {

    return (
        <div className="grid grid-cols-2">
            <Auth />
            <Quote />
        </div>
        
    )
}