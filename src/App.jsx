import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import FrontPage from './Pages/FrontPage'
import Layout from './Pages/Layout'
import TripForm from './Pages/TripForm'
import TripResult from "./Pages/TripResult"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<FrontPage/>}/>
            <Route path="plan-trip" element={<TripForm/>}/>
            <Route path="your-trip" element={<TripResult/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
