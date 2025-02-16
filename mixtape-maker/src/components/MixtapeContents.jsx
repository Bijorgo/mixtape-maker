import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StatusToggle from "./StatusToggle"; // Import the StatusToggle component

export default function MixtapeContents() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [mixtape, setMixtape] = useState(null);
    const [mixtapeItems, setMixtapeItems] = useState([]); // Store mixtape items
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        fetchMixtapeDetails();
    }, [id]);

    const fetchMixtapeDetails = async () => {
        try {
            console.log("Fetching mixtape with ID:", id);

            const mixtapeResponse = await fetch(`http://localhost:5000/mixtapes/${id}`);
            const mixtapeData = await mixtapeResponse.json();
            if (!mixtapeResponse.ok) throw new Error(`Failed to fetch mixtape: ${mixtapeData.error}`);
            setMixtape(mixtapeData);

            // Fetch mixtape items (contains song_id and status)
            const mixtapeItemsResponse = await fetch(`http://localhost:5000/mixtape-items/mixtape/${id}`);
            const mixtapeItemsData = await mixtapeItemsResponse.json();
            if (!mixtapeItemsResponse.ok) throw new Error(`Failed to fetch mixtape items: ${mixtapeItemsData.error}`);
            
            setMixtapeItems(mixtapeItemsData); // Store mixtape items

            // Extract song IDs from mixtape items
            const songIds = mixtapeItemsData.map(item => item.song_id);

            // Fetch all songs and filter them
            const songsResponse = await fetch(`http://localhost:5000/songs`);
            const allSongsData = await songsResponse.json();
            if (!songsResponse.ok) throw new Error(`Failed to fetch songs: ${allSongsData.error}`);
            
            const filteredSongs = allSongsData.songs.filter(song => songIds.includes(song.id));
            setSongs(filteredSongs);
        } catch (error) {
            console.error("Error fetching mixtape details:", error);
            setMessage(error.message);
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    const deleteSongFromMixtape = async (mixtapeItemId) => {
        try {
            const response = await fetch(`http://localhost:5000/mixtape-items/${mixtapeItemId}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to remove song");

            setMessage("Song removed from mixtape successfully!");
            setMessageType("success");

            fetchMixtapeDetails(); // Refresh UI
        } catch (error) {
            setMessage(error.message);
            setMessageType("error");
        }
    };

    const deleteMixtape = async () => {
        try {
            const response = await fetch(`http://localhost:5000/mixtapes/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete mixtape");

            setMessage("Mixtape and all songs deleted successfully!");
            setMessageType("success");
            navigate("/");
        } catch (error) {
            setMessage(error.message);
            setMessageType("error");
        }
    };

    if (loading) return <div className="text-center text-xl text-gray-600">Loading...</div>;
    if (!mixtape || Object.keys(mixtape).length === 0) {
        return <div className="text-center text-xl text-red-600">Mixtape not found.</div>;
    }

    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
                <h1 className="text-3xl font-semibold text-gray-800">{mixtape.title}</h1>
                <p className="text-lg text-gray-600">{mixtape.description}</p>
                <button
                    onClick={deleteMixtape}
                    className="w-full bg-red-500 text-white py-2 rounded-lg mt-4 hover:bg-red-600"
                >
                    Delete Mixtape
                </button>

                {message && (
                    <div className={`mt-4 text-center p-2 rounded-md ${messageType === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
                        {message}
                    </div>
                )}

                <h3 className="text-xl font-semibold text-gray-800">Songs in this Mixtape:</h3>
                <ul className="space-y-4">
                    {songs.length > 0 ? (
                        songs.map((song) => {
                            // Find corresponding mixtape item
                            const mixtapeItem = mixtapeItems.find(item => item.song_id === song.id);
                            return (
                                <li key={song.id} className="bg-gray-100 p-4 rounded-md shadow-sm hover:bg-gray-200 transition duration-200">
                                    <div className="flex justify-between items-center">
                                        <div className="text-lg font-semibold text-gray-700">
                                            {song.name} by <span className="text-gray-500">{song.artist}</span> (Album: {song.album})
                                        </div>
                                        <div className="flex space-x-4">
                                            
                                            {mixtapeItem && (
                                                <StatusToggle
                                                    mixtapeItemId={mixtapeItem.id}
                                                    currentStatus={mixtapeItem.status}
                                                />
                                            )}
                                            <button
                                                onClick={() => deleteSongFromMixtape(mixtapeItem.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                            >
                                                Remove from Mixtape
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    ) : (
                        <p className="text-gray-500">No songs found in this mixtape.</p>
                    )}
                </ul>
                <h3 className="text-xl font-semibold text-gray-800">Add A New Song To This Mixtape:</h3>
                <SongForm mixtapeId={mixtape.id} />
            </div>
        </div>
    );
}
