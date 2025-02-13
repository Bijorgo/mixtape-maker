import SongForm from "../components/SongForm";
import SongList from "../components/SongList";
import SongSearch from "../components/SongSearch";

export default function Songs() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          My Songs
        </h1>

        <div className="space-y-4">
          {/* Song Search Component */}
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <SongSearch />
          </div>

          {/* Song List Component */}
          <div className="bg-white p-4 rounded-md shadow-sm">
            <SongList />
          </div>

          {/* Song Form Component */}
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <SongForm />
          </div>
        </div>
      </div>
    </div>
  );
}
