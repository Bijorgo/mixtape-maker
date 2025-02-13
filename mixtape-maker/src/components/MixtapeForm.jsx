//  Form to create or edit mixtapes (title, description).
import { useState } from "react"

export default function MixtapeForm({ addNewMixtape }){
    // States
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ error, setError ] = useState("")

    // Submit handler 
    function handleSubmit(event){
        // Prevent redirect
        event.preventDefault();

        // Form validation: title is required, description is optional
        if (!title) {
            setError("Pleases fill out title field.");
            return;// Prevents form submit if title is missing
        }

        // If form is valid, clear error
        setError("")

        // If form is valid, create newMixtape object
        const newMixtape = {
            title,
            description: description || "" // Default to empty string
        };

        // Send new mixtape to server
        fetch("http://localhost:5000/mixtapes",{
            method: "POST",
            headers: {
                // Check headers
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMixtape)
        })

        .then( r=> r.json())
        .then( mixtape => {
            // Add form info to newMixtape object
            addNewMixtape(mixtape)
            // Clear fields after submit
            setTitle("");
            setDescription("");
            // Add success message
        })
        .catch(error => console.log(error));  
    };


    return(
        <form className="mixtape-form" onSubmit={handleSubmit}>
            <h3>Create a new mixtape</h3>
            <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={ event => setTitle(event.target.value) }
                value={title}
                className="input-field"
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                onChange={ event => setDescription(event.target.value) }
                value={description}
                className="input-field"
            />
            <input type="submit" value="save"/>
        </form>
    )
}