import {useState, useEffect} from "react";

function SongList() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch("http://localhost:5000/songs");
                if (!response.ok) {
                    alert("Error retreiving songs.");
                    return;
                }
                const result = await response.json();
                setSongs(result.songs || []);
            } catch (error) {
                alert("Error retreiving songs");
                console.error(error);
            }
        };
        fetchSongs();
    }, []);

return (
    <div>
        <h1>List of All Songs In The Database:</h1>
        <ul>
            {songs.map((song) => (
                <li key={song.id}>
                    {song.name} by {song.artist} (album: {song.album})
                </li>
            
            ))}
        </ul>
    </div>
)

}

export default SongList