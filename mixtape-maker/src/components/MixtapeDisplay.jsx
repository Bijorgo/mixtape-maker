import { Link } from "react-router-dom";

// This component is not currently used anywhere. This component should be furter
// expanded to take on some of the logic in Home component, then 
// use this component in the return of Home for a more readable flow

export default function MixtapeDisplay({ mixtapes }) {
    // If there are no mixtapes, display...
    if (!mixtapes || mixtapes.length === 0) {
        return <div>No mixtapes available</div>;
    }
    // Otherwise display the mixtape title, description, and link to its contents
    return (
        <div>
            <h2>My Mixtapes: </h2>
            <div>
                {mixtapes.map((mixtape) => (
                    <div key={mixtape.id}>
                        <h3>{mixtape.title}</h3>
                        <p>{mixtape.description || "No description available"}</p>
                        <Link to={`/mixtapes/${mixtape.id}`}>
                            View Mixtape Contents
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

