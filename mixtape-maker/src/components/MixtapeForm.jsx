import { useState } from "react";

export default function MixtapeForm({ addNewMixtape }) {
  // States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Submit handler 
  function handleSubmit(event) {
    // Prevent default form submit behavior
    event.preventDefault();

    // Form validation: title is required, description is optional
    if (!title) {
      setError("Please fill out the title field.");
      return; // Prevents form submission if title is missing
    }

    // If form is valid, clear the error
    setError("");

    // Create the newMixtape object without user ID
    const newMixtape = {
      title,
      description: description || "", // Default to empty string if no description
    };

    // Send new mixtape to the server
    fetch("http://localhost:5000/mixtapes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMixtape),
    })
      .then((r) => r.json())
      .then((mixtape) => {
        // Add new mixtape to the list of mixtapes
        addNewMixtape(mixtape);

        // Clear the fields after submitting
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to create mixtape. Please try again.");
      });
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h3 className="text-3xl font-semibold text-center text-gray-800">Create a new mixtape</h3>

      {/* Display error message if validation fails */}
      {error && <div className="text-red-600 text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter the title of the mixtape"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Enter a description (optional)"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
