// Display song name, artist, album, and listen status. Include options to mark as "listened" or "unlistened."
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';




// Links from Home
export default function MixtapeContents(){
    const navigate = useNavigate();
    const { id } = useParams(); // Get mixtape ID from URL params
    const [mixtape, setMixtape] = useState(null);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");  // State to store feedback messages
    const [messageType, setMessageType] = useState("");  // To style success or error messages


    // Fetch mixtape data and songs when the component mounts
    useEffect(() => {
        const fetchMixtapeDetails = async () => {
        try {
            // Fetch the mixtape details based on the mixtape ID
            const mixtapeResponse = await fetch(`/mixtapes/${id}`);
            const mixtapeData = await mixtapeResponse.json();
            
            if (mixtapeResponse.ok) {
            setMixtape(mixtapeData);
            // Fetch the songs associated with this mixtape
            const songsResponse = await fetch(`/mixtape-items/${id}`);
            const songsData = await songsResponse.json();
            
            if (songsResponse.ok) {
                const songIds = songsData.mixtape_items ? songsData.mixtape_items.map(item => item.song_id) : [];
                // Fetch the song details
                const songDetailsResponse = await fetch(`/songs`);
                const allSongs = await songDetailsResponse.json();
                const filteredSongs = allSongs.songs.filter(song =>
                songIds.includes(song.id)
                );
                setSongs(filteredSongs);
            }
            } else {
            console.error("Failed to fetch mixtape details:", mixtapeData.error);
            }
        } catch (error) {
            console.error("Error fetching mixtape details:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchMixtapeDetails();
    }, [id]);

    const deleteSongFromMixtape = async (mixtapeItemId) => {
        try {
            const response = await fetch(`/mixtape-items/${mixtapeItemId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
    
            if (response.ok) {
                setMessage("Song removed from mixtape successfully!");
                setMessageType("success");
                // Adjusting here to use the correct field if needed
                setSongs(songs.filter(song => song.id !== mixtapeItemId));  // Assuming `song.id` corresponds to `mixtapeItemId`
            } else {
                setMessage(data.error || "Failed to remove song.");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("An error occurred while deleting the song.");
            setMessageType("error");
        }
    };
    

    const deleteMixtape = async () => {
        try {
            const response = await fetch(`/mixtapes/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();

            if (response.ok) {
                setMessage("Mixtape and all songs deleted successfully!");
                setMessageType("success");
                navigate("/");  // Redirect to home page
            } else {
                setMessage(data.error || "Failed to delete mixtape.");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("An error occurred while deleting the mixtape.");
            setMessageType("error");
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!mixtape) {
        return <div>Mixtape not found.</div>;
    }

    return (
        <div>
            <h1>{mixtape.title}</h1>
            <p>{mixtape.description}</p>
            <button onClick={deleteMixtape}>Delete Mixtape</button>

            {/* Display the feedback message */}
            {message && (
                <div className={`message ${messageType}`}>
                    {message}
                </div>
            )}

            <h3>Songs in this Mixtape:</h3>
            <ul>
                {songs.length > 0 ? ( // Check to see if there are songs in the array
                songs.map((song) => (
                    <li key={song.id}>
                        <strong>{song.name}</strong> by {song.artist} (Album: {song.album})
                        <button onClick={() => deleteSongFromMixtape(song.mixtapeItemId)}>
                            Remove from Mixtape
                        </button>
                    </li>
                ))
                ) : ( // If no songs in array: display no songs found
                <p>No songs found in this mixtape.</p>
                )}
            </ul>
        </div>
    );
}