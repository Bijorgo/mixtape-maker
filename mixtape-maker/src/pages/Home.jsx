import { useState, useEffect } from "react";
import MixtapeForm from "../components/MixtapeForm";
import MixtapeDisplay from "../components/MixtapeDisplay";
import MixtapeContents from "../components/MixtapeContents";
import { Link } from "react-router";

export default function Home() {
    // State to store mixtapes
    const [mixtapes, setMixtapes] = useState([]);

    // Logic for user log in / authentication has been commented out
    // It is currently not operable and it stands in the way of functionality of
    // the rest of the application. It has not been deleted yet so that we have
    // the oportunity to implement and fix it later. The break lies in using session
    // to keep the user logged in, as well as making the connection from user to
    // mixtapes in the database.

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
        <div className="bg-gray-50 min-h-screen py-8 px-6 md:px-12">
            <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
                Welcome to Your Mixtape Collection
            </h1>

            <div className="mb-6 text-center">
                <MixtapeForm addNewMixtape={addNewMixtape} />
            </div>

            <h2 className="text-2xl font-bold text-gray-700 mb-4">My Mixtapes:</h2>
            
            {/* Display all mixtapes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mixtapes.map((mixtape) => (
                    <div key={mixtape.id} className="bg-white shadow-lg rounded-lg p-4">
                        <h3 className="text-xl font-semibold text-gray-800">{mixtape.title}</h3>
                        <p className="text-sm text-gray-600">{mixtape.description || "No description available."}</p>
                        <Link to={`/mixtapes/${mixtape.id}`} className="text-blue-500 hover:text-blue-700 mt-2 inline-block">
                            View Mixtape Contents
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
