// MixtapeForm.jsx
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
        <div>
            <h1>Form Loaded</h1>
            <form onSubmit={handleSubmit}>
                <h3>Create a new mixtape</h3>
                {/* Display error message if validation fails */}
                {error && <div className="error-message">{error}</div>}
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                />
                <input type="submit" value="Save" />
            </form>
        </div>
    );
}
