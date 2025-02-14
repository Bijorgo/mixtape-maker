import { useState } from "react"; 

export default function StatusToggle({ mixtapeItemId, currentStatus }) {
    const [status, setStatus] = useState(currentStatus);

    async function toggleStatus() {
        const newStatus = status === "unlistened" ? "listened" : "unlistened";
        setStatus(newStatus);

        try {
            const response = await fetch(`http://localhost:5000/mixtape-items/${mixtapeItemId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error("Failed to update the status");
            }
        } catch (error) {
            console.error(error);
            setStatus(currentStatus); // Revert if failed
        }
    }

    return (
        <button onClick={toggleStatus} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
            Mark as {status === "unlistened" ? "Listened" : "Unlistened"}
        </button>
    );
}
