import { useState, useEffect } from "react"
import MixtapeForm from "../components/MixtapeForm"

export default function Home(){
    //Landing page where users can view available mixtapes
    // States
    const [ mixtapes, setMixtapes ] = useState([])
    // Initital fetch GET request
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
            <MixtapeForm addNewMixtape={addNewMixtape}/>
        </div>
    )
}
