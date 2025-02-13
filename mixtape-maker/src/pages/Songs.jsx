import MixtapeForm from "../components/MixtapeForm";
import SongForm from "../components/SongForm";
import SongList from "../components/SongList";
import SongSearch from "../components/SongSearch";

export default function MixtapeContents(){
    return(
        <div>
            <SongList />
            <SongSearch />
            <SongForm />
        </div>
    )
}