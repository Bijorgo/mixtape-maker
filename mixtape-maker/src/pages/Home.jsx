import { useState, useEffect } from "react";
import MixtapeForm from "../components/MixtapeForm";
import MixtapeDisplay from "../components/MixtapeDisplay";
import MixtapeContents from "../components/MixtapeContents";
import { Link } from "react-router";

export default function Home() {
    // State to store mixtapes
    const [mixtapes, setMixtapes] = useState([]);
    // const [userId, setUserId] = useState(null); // Store the logged-in user's ID

    // Fetch the logged-in user's ID from the backend (commented out)
    /*
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
    */

    // Fetch all mixtapes when the component mounts
    useEffect(() => {
        // if (userId) { // Commented out user check
            fetch("http://localhost:5000/mixtapes")
                .then((response) => response.json())
                .then((data) => {
                    if (data.mixtapes) {
                        setMixtapes(data.mixtapes); // Ensure correct data structure
                    } else {
                        console.log("No mixtapes found.");
                    }
                })
                .catch((error) => console.log("Error fetching mixtapes:", error));
        // }
    }, []); // Removed userId dependency

    // Function to add a new mixtape to the state
    const addNewMixtape = (newMixtape) => {
        setMixtapes((prevMixtapes) => [...prevMixtapes, newMixtape]);
    };

    console.log("Rendering Home component..."); // Debugging 

    return (
        <div>
            <MixtapeDisplay mixtapes={mixtapes} />
            <MixtapeForm addNewMixtape={addNewMixtape} />
            <h2>My Mixtapes: </h2>
        </div>
    );
}
