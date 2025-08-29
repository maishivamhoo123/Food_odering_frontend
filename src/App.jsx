// Unused 'useState' import is removed
import './App.css'
import AppRoute from './Route/Route'
import { BrowserRouter} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      {/* This div applies the scrolling fix to your entire app */}
      <div className="scroll-container">
        <AppRoute/>
      </div>
    </BrowserRouter>
  )
}

export default App;