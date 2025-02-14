import { useState, useEffect } from "react";

function UpdateSong({ songId, onUpdate }) {
  const [songData, setSongData] = useState({
    name: "",
    artist: "",
    album: "",
    duration: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the current song details when the component mounts
  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/songs/${songId}`);
        const result = await response.json();

        if (response.ok) {
          setSongData({
            name: result.name,
            artist: result.artist,
            album: result.album,
            duration: result.duration,
          });
        } else {
          setError("Failed to load song details.");
        }
      } catch (error) {
        setError("Error fetching song details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongDetails();
  }, [songId]);

  // Handle form submit to update the song details
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!songData.name || !songData.artist) {
      setError("Song name and artist are required fields.");
      return;
    }

    setError(""); // Clear any previous error

    try {
      const response = await fetch(`http://localhost:5000/songs/${songId}`, {
        method: "PATCH", // Use PATCH instead of PUT for partial updates
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(songData),
      });

      const result = await response.json();

      if (response.ok) {
        onUpdate(result); // Notify parent to update the song list
        alert("Song updated successfully!");
      } else {
        setError(result.error || "Failed to update song.");
      }
    } catch (error) {
      setError("Failed to update song.");
      console.error(error);
    }
  };

  // If still loading, show loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If an error occurred, show the error message
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800">Update Song</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700">
            Song Name:
          </label>
          <input
            type="text"
            id="name"
            value={songData.name}
            onChange={(e) => setSongData({ ...songData, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="artist" className="block text-gray-700">
            Artist:
          </label>
          <input
            type="text"
            id="artist"
            value={songData.artist}
            onChange={(e) => setSongData({ ...songData, artist: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="album" className="block text-gray-700">
            Album:
          </label>
          <input
            type="text"
            id="album"
            value={songData.album}
            onChange={(e) => setSongData({ ...songData, album: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-gray-700">
            Duration:
          </label>
          <input
            type="text"
            id="duration"
            value={songData.duration}
            onChange={(e) => setSongData({ ...songData, duration: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Update Song
        </button>
      </form>
    </div>
  );
}

export default UpdateSong;
