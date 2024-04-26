import './App.css';
import Landing from './Landing';
import Map from './Map';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './Nav';
import Canvas from './Canvas';

function App() {

  return (

    <>
    <BrowserRouter>
      <Nav/>
    <Routes>

      <Route path="/" element={<Landing />} />
      <Route path="/map" element={<Map />} />
      <Route path="/canvas" element={<Canvas />} />
      </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
