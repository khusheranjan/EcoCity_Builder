import { useState } from 'react';
import './App.css';
import Landing from './Landing';
import Map from './Map';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Landing />
      <Map/>
    </>
  )
}

export default App
