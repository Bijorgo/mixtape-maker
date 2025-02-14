// Toggle to mark a song as "listened" or "unlistened."
import { useState } from 'react'; 

export default function StatusToggle({ mixtapeItemId, currentStatus }) {
    const [status, setStatus] = useState(currentStatus);

    function toggleStatus() {
        const newStatus = status === "unlistened" ? "listened" : "unlistened";
        setStatus(newStatus);
        
        // Update the status in the database or send it to the API
        fetch(`/mixtape-items/${mixtapeItemId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
        }).then((response) => {
            if (!response.ok) {
                console.error("Failed to update the status");
            }
        });
    }

    return (
        <button onClick={toggleStatus}>
            Mark as {status === "unlistened" ? "Listened" : "Unlistened"}
        </button>
    );
}
