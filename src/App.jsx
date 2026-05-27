import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import Posts from './components/Posts'
import Update from './components/Update'
import Delete from './components/Delete'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/posts" Component={Posts} />
          <Route path="/update" Component={Update} />
          <Route path="/delete" Component={Delete} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
