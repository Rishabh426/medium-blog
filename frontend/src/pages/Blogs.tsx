import { Link } from "react-router-dom";
import { Blogcard } from "../../components/Blogcard";
import { Appbar } from "../../components/Appbar";

export default function Blogs() {

    return (
        <div>
            <Appbar />
            <div className="pt-8 flex justify-center">
                <div className="max-w-xl">
                    <Blogcard 
                        authorname={"Rishabh Sharma"}
                        title={"How an ugly single page website makes $5000 a month without affiliate marketing"}
                        content={"How an ugly single page website makes $5000 a month without affiliate marketing. How an ugly single page website makes $5000"}
                        publishdate={"19 Oct 2025"}
                    />
                    <Blogcard 
                        authorname={"Rishabh Sharma"}
                        title={"How an ugly single page website makes $5000 a month without affiliate marketing"}
                        content={"How an ugly single page website makes $5000 a month without affiliate marketing. How an ugly single page website makes $5000"}
                        publishdate={"19 Oct 2025"}
                    />
                    <Blogcard 
                        authorname={"Rishabh Sharma"}
                        title={"How an ugly single page website makes $5000 a month without affiliate marketing"}
                        content={"How an ugly single page website makes $5000 a month without affiliate marketing. How an ugly single page website makes $5000"}
                        publishdate={"19 Oct 2025"}
                    />
                </div>
            </div>
        </div>
        
    )
}


