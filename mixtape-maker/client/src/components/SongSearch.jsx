import {useState} from "react";

function SongSearch() {
    const [name, setName] = useState("");
    const [artist, setArtist] = useState("");
    const [songs, setSongs] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name && !artist) {
            alert("Please enter a song name or an artist.");
            return;
        }

        const searchParams = {}

        if (name) {
            searchParams.name = name;
        }
        if (artist) {
            searchParams.artist = artist;
        }

        try {
            const response = await fetch(`http://localhost:5000/songs/search?${new URLSearchParams(searchParams)}`);
            const result = await response.json();

            if (response.ok) {
                setSongs(result.songs || [])
                setError("");
            } else {
                setSongs([])
                setError(result.error || "No songs found.");

            }
        } catch (error) {
            setSongs([]);
            setError("Error connecting to the server.");
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Search For A Song</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Song Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="artist">Artist:</label>
                    <input type="text" id="artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
                </div>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SongSearch