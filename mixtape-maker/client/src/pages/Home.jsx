import { useState, useEffect } from "react"
import MixtapeForm from "../components/MixtapeForm"
import MixtapeDisplay from "../components/MixtapeDisplay"

export default function Home(){
    //Landing page where users can view available mixtapes
    // States
    const [ mixtapes, setMixtapes ] = useState([])

    // Initital fetch GET request to fetch mixtapes
    useEffect(() => {
        fetch("http://localhost:5000/mixtapes")
        .then( r => r.json() )
        .then( mixtapeData => setMixtapes(mixtapeData))
        .catch( error => console.log(error))
    },[])

    const addNewMixtape = (newMixtape) => {
        setMixtapes( origMixtapes => [...origMixtapes, newMixtape])
    };

    return(
        <div>
            <MixtapeDisplay mixtapes={mixtapes}/>
            <MixtapeForm addNewMixtape={addNewMixtape}/>
        </div>
    )
}
