import { useState } from 'react';
import './App.css';
import Bitcoin from './components/bitcoin.jsx';
import CryptoDashboard from './components/CryptoDashboard.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="bg-blue-500 text-white p-4 rounded-lg">Tailwind is working!</div>
      <CryptoDashboard />
      <Bitcoin />
      
    </>
  )
}

export default App
