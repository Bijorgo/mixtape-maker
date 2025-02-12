// Display mixtape preview in Home
import { Link } from "react-router-dom"

export default function MixtapeItem({ mixtapes }){
    return(
        <div>
            <h2>My Mixtapes: </h2>
            <div>
                {mixtapes.map( mixtape => (
                    <div
                        key={mixtape.id}
                        //className=""
                    >
                        <p>Something to display the mixtape goes here</p>
                        <Link
                        to={`/???/$mixtape.id`}
                        //className=""
                        >
                            View Mixtape Contents
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}