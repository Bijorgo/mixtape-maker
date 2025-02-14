import { useState } from "react";

function SongSearch() {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name && !artist) {
      alert("Please enter a song name or an artist.");
      return;
    }

    const searchParams = {};

    if (name) {
      searchParams.name = name;
    }
    if (artist) {
      searchParams.artist = artist;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/songs/search?${new URLSearchParams(searchParams)}`
      );
      const result = await response.json();

      if (response.ok) {
        setSongs(result.songs || []);
        setError("");
      } else {
        setSongs([]);
        setError(result.error || "No songs found.");
      }
    } catch (error) {
      setSongs([]);
      setError("Error connecting to the server.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800">Search For A Song</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Song Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="artist" className="block text-sm font-medium text-gray-700">
            Artist:
          </label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Search
        </button>
      </form>

      {error && <div className="text-red-600 text-center">{error}</div>}

      {songs.length > 0 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Search Results:</h2>
          <ul className="space-y-2">
            {songs.map((song) => (
              <li key={song.id} className="bg-gray-100 p-4 rounded-md">
                <p className="text-lg font-medium">{song.name}</p>
                <p className="text-sm text-gray-600">{song.artist}</p>
                {song.album && <p className="text-sm text-gray-600">{song.album}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SongSearch;
