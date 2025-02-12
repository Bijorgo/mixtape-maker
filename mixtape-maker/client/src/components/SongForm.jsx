import {useState} from "react";

function SongForm() {
    const [name, setName] = useState("");
    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [duration, setDuration] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !artist) {
            alert("Song name and artist are required feilds.");
            return;
        }

    const songData = {name, artist, album, duration}

    try {
        const response = await fetch("http://localhost:5000/songs", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(songData),

        });

        if (response.ok) {
            alert("Song added successfully!");
            setName("");
            setArtist("");
            setAlbum("");
            setDuration("");

        } else { 
            const result = await response.json()
            alert(result.error || "Error occurred while adding song"); }
        } catch (error) {
            alert("Failed to add song");
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Add A New Song</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Song Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="artist">Artist:</label>
                    <input type="text" id="artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="album">Album:</label>
                    <input type="text" id="album" value={album} onChange={(e) => setAlbum(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="duration">Duration in seconds:</label>
                    <input type="text" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </div>
                <button type="submit">Add Song</button>
            </form>
        </div>
    );
    
    }

    export default SongForm;
