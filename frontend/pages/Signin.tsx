import Quote from "../components/Quote"
import Auth from "../components/Auth"

export default function Signup() {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type="signin"/>
            </div>
            <div>
                <Quote />
            </div>
        </div>
    )
}