import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Importing Components
import DeleteSong from "./components/DeleteSong.jsx";
import MixtapeContents from "./components/MixtapeContents.jsx";
import MixtapeDisplay from "./components/MixtapeDisplay.jsx";
import MixtapeForm from "./components/MixtapeForm.jsx";
import SongForm from "./components/SongForm.jsx";
import SongList from "./components/SongList.jsx";
import SongSearch from "./components/SongSearch.jsx";
import StatusToggle from "./components/StatusToggle.jsx";
import UserLogin from "./components/UserLogin.jsx";
import UserRegistration from "./components/UserRegistration.jsx";
import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

// Define Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <>
            <UserRegistration />
            <UserLogin />
            <MixtapeDisplay />
            <MixtapeForm />
          </>
        ),
      },
      {
        path: "songs",
        element: (
          <>
            <SongForm />
            <DeleteSong />
            <SongSearch />
            <SongList />
            <StatusToggle />
          </>
        ),
      },
      {
        path: "mixtapecontent",
        element: (
          <>
            <MixtapeContents />
            <StatusToggle />
          </>
        ),
      },
    ],
  },
]);

// Render the Router
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
