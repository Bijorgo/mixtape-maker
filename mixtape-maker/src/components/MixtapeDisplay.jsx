import { Link } from "react-router-dom";

export default function MixtapeDisplay({ mixtapes }) {
    if (!mixtapes || mixtapes.length === 0) {
        return <div>No mixtapes available</div>;
    }

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

