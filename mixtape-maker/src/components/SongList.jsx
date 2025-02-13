import { useState, useEffect } from "react";
import DeleteSong from "./DeleteSong"; // Import DeleteSong component

function SongList() {
  const [songs, setSongs] = useState([]);

  // Fetch songs from the server when component mounts
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("http://localhost:5000/songs");
        if (!response.ok) {
          alert("Error retrieving songs.");
          return;
        }
        const result = await response.json();
        setSongs(result.songs || []);
      } catch (error) {
        alert("Error retrieving songs");
        console.error(error);
      }
    };
    fetchSongs();
  }, []);

  // Handle song deletion after successful deletion from DeleteSong component
  const handleDelete = (songId) => {
    setSongs(songs.filter((song) => song.id !== songId)); // Remove deleted song from the state
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800">
        List of All Songs In The Database:
      </h1>
      <ul className="space-y-4">
        {songs.map((song) => (
          <li
            key={song.id}
            className="p-4 bg-gray-50 rounded-md shadow-md hover:bg-gray-100 transition duration-300"
          >
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold text-gray-700">
                {song.name} by <span className="text-gray-500">{song.artist}</span>
              </div>
              <div className="text-sm text-gray-400">{song.album}</div>
            </div>

            {/* Use the DeleteSong component for each song */}
            <DeleteSong songId={song.id} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
