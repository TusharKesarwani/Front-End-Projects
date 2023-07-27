import './App.css';
import Navbar from './Components/Navbar';
import Textform from './Components/Textform';
import React, {useState} from 'react'

import {BrowserRouter as Router,
  Route,
  Routes,
  } from 'react-router-dom';


function App() {
  const [mode,setmode]=useState('light');

  const switchMode=()=>{
    if (mode==='light') {
      setmode('dark');
      document.body.style.backgroundColor='#080834';
      
    } else {
      setmode('light');
      document.body.style.backgroundColor='white';
    }
  }

  return (
    <>
    <Router>
      <Navbar title="<h2>Online Text-Analyser</h2>" mode={mode} switchMode={switchMode}/>
      <div className="container my-3">
        <Routes>   
          <Route exact path="/" element={<Textform heading="Enter Your Text Here" mode={mode}/>} />
        </Routes>
      </div>
   </Router>
    </>
  );
}

export default App;
