import { useState } from "react";

function SongForm() {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !artist) {
      alert("Song name and artist are required fields.");
      return;
    }

    const songData = { name, artist, album, duration };

    try {
      const response = await fetch("http://localhost:5000/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(songData),
      });

      if (response.ok) {
        alert("Song added successfully!");
        setName("");
        setArtist("");
        setAlbum("");
        setDuration("");
      } else {
        const result = await response.json();
        alert(result.error || "Error occurred while adding song");
      }
    } catch (error) {
      alert("Failed to add song");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800">Add A New Song</h1>
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
        <div>
          <label htmlFor="album" className="block text-sm font-medium text-gray-700">
            Album:
          </label>
          <input
            type="text"
            id="album"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration in seconds:
          </label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Add Song
        </button>
      </form>
    </div>
  );
}

export default SongForm;
