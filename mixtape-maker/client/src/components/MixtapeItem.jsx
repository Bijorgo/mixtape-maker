// Display song name, artist, album, and listen status. Include options to mark as "listened" or "unlistened."
import { useState, useEffect } from "react"

export default function MixtapeItem(){
    // States
    const [ mixtapes, setMixtapes ] = useState([])
    // Initital fetch GET request
    useEffect(() => {
        fetch("http://localhost:5000/mixtapes")
        .then( r => r.json() )
        .then( mixtapeData => setMixtapes(mixtapeData))
        .catch( error => console.log(error))
    },[])
    // Fetch GET request

}