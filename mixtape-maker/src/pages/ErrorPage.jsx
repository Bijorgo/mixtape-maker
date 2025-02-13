import { Link } from "react-router-dom";

export default function ErrorPage(){
    return(
        <div>
            <h1>Ruh roh, something went wrong!</h1>
            <Link
                to="/"
                className="link-home"
            />
        </div>
    )
}