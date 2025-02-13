import { useState, useEffect } from "react"
import MixtapeForm from "../components/MixtapeForm"
import MixtapeDisplay from "../components/MixtapeDisplay"
import MixtapeContents from "../components/MixtapeContents";
import SongForm from "../components/SongForm";
import SongList from "../components/SongList";

export default function Home(){
    //Landing page where users can view available mixtapes
    // States
    const [ mixtapes, setMixtapes ] = useState([])
    const [userId, setUserId] = useState(null); // Store the logged-in user's ID

    // Fetch the logged-in user's ID from the backend
  useEffect(() => {
    fetch("http://localhost:5000/current_user")  // Fetch the user_id from the session
      .then((response) => response.json())
      .then((data) => {
        if (data.user_id) {
          setUserId(data.user_id);
        } else {
          alert("You must be logged in to view mixtapes.");
        }
      })
      .catch((error) => console.log(error));
  }, []);

    // Initital fetch GET request to fetch mixtapes for user
    useEffect(() => {
        if (userId) {
            fetch("http://localhost:5000/mixtapes")
            .then( r => r.json() )
            .then( mixtapeData => setMixtapes(mixtapeData))
            .catch( error => console.log(error))
        }
    },[userId])

    const addNewMixtape = (newMixtape) => {
        setMixtapes( origMixtapes => [...origMixtapes, newMixtape])
    };

    return(
        <div>
            <MixtapeDisplay mixtapes={mixtapes} />
            <MixtapeContents />
            <MixtapeForm addNewMixtape={addNewMixtape}/>
            <SongForm />
            <SongList />
        </div>
    )
}
