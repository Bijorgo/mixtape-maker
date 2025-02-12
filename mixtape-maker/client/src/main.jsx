import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DeleteSong from "./components/DeleteSong.jsx"
import MixtapeContents from "./components/MixtapeContents.jsx"
import MixtapeDisplay from "./components/MixtapeDisplay.jsx"
import MixtapeForm from "./components/MixtapeForm.jsx"
import SongForm from "./components/SongForm.jsx"
import SongList from "./components/SongList.jsx"
import SongSearch from "./components/SongSearch.jsx"
import StatusToggle from "./components/StatusToggle.jsx"
import UserLogin from "./components/UserLogin.jsx"
import UserRegistration from "./components/UserRegistration.jsx"
import App from "./components/App.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: 
        <>
        <UserRegistration />
        <UserLogin />
        <MixtapeDisplay />
        <MixtapeForm/>
        </>
      },
      {
        path: "songs",
        element: 
        <>
        <SongForm />
        <DeleteSong />
        <SongSearch />
        <SongList />
        <StatusToggle />
       
        </>
      },
      {
        path: "errorpage",
        element: <ErrorPage />
      },
      {
        path: "mixtapecontent",
        element: 
        <>
        <MixtapeContents />
        <StatusToggle />
        </>
      }
    ],
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
