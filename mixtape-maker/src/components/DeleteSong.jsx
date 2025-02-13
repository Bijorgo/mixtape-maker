import { useState } from "react";

function DeleteSong({ songId, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (event) => {
    event.preventDefault();

    setIsDeleting(true);

    try {
      const response = await fetch(`http://localhost:5000/songs/${songId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        // Call the parent's onDelete function to update the song list
        onDelete(songId);
        alert(result.message || "Song successfully deleted!");
      } else {
        alert(result.error || "Error occurred while deleting song.");
      }
    } catch (error) {
      alert("Failed to delete song.");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mt-2 flex justify-end">
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

export default DeleteSong;
