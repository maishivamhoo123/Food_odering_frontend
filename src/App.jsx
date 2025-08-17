import { useState } from 'react'
import './App.css'
import AppRoute from './Route/Route'
import { BrowserRouter} from "react-router-dom";
function App() {

  return (
  <BrowserRouter>
    <AppRoute/>
  </BrowserRouter>
  )
}

export default App
