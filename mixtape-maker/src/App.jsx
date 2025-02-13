import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'
import './App.css'

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
    </div>
  )
}
