import {useState} from "react";

function DeleteSong() {
    const [songId, setSongId] = useState("");

    const handleDelete = async (event) => {
        event.preventDefault();

        if (!songId) {
            alert("Please enter a song ID to delete a song.");
            return;
        }
        try {
            const repsonse = await fetch(`http://localhost:5000/songs/${songId}`, {
                method: "DELETE",
            });

        const result = await response.json();
    
        if (response.ok) {
            alert(result.message || "Song successfully deleted!");
            setSongId("");
        } else {
            alert(result.error || "Error occurred while deleting song.");
        }
        } catch (error) {
            alert("Failed to delete song.")
            console.error(error);
        }
    };

    return (
        <div>
           <h1>Delete A Song</h1>
           <form onSubmit={handleDelete}>
                <div>
                    <label htmlFor="songId">Enter ID of Song To Delete:</label>
                    <input type="number" id="songId" value={songId} onChange={(e) => setSongId(e.target.value)}/>
                </div>
                <button type="submit">Delete Song</button>
           </form>
        </div>
    )

    }

    export default DeleteSong;