import { useState } from "react";

export default function MixtapeEdit({ title: initialTitle = "", description: initialDescription = "", onUpdateMixtape }) {
    // Set defaults of title and description as empty string to prevent premature error
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [message, setMessage] = useState(""); // User sees message for feedback on actions

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onUpdateMixtape({ title, description });
            setMessage("Mixtape updated successfully!");
        } catch (error) {
            setMessage("Failed to update mixtape.");
        }
    };
    // Update form has title and description pre populated so you can edit rather that replace
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700 font-medium">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded-md"
                ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Save Changes
            </button>
            {message && <p className="text-center text-green-500 mt-2">{message}</p>}
        </form>
    );
}
