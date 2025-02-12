// Display song name, artist, album, and listen status. Include options to mark as "listened" or "unlistened."
// Links from Home
export default function MixtapeContents(){
    const { id } = useParams(); // Get mixtape ID from URL params
    const [mixtape, setMixtape] = useState(null);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

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
            const songsResponse = await fetch(`/mixtape-items?mixtape_id=${id}`);
            const songsData = await songsResponse.json();
            
            if (songsResponse.ok) {
                const songIds = songsData.mixtape_items.map(item => item.song_id);
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
        <h3>Songs in this Mixtape:</h3>
        <ul>
            {songs.length > 0 ? ( // Check to see if there are songs in the array
            songs.map((song) => (
                <li key={song.id}>
                <strong>{song.name}</strong> by {song.artist} (Album: {song.album})
                </li>
            ))
            ) : ( // If no songs in array: display no songs found
            <p>No songs found in this mixtape.</p>
            )}
        </ul>
        </div>
    );
}