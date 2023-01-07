
import './App.css';
//import About from './components/About';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import React , {useState} from 'react'
import Alert from './components/Alert';


function App() {
  const [mode, setmode] = useState('dark') ;
  return (
    <>
    <Navbar title = "Text-Utils Application" text-light  mode ={mode} />
    <Alert alert = "Welcome To Text-Utils"/>
    <div className='container my-3'>
    <Textform heading = "Enter your text here"/>
    
    {/*<About>*/}
    </div>
    </>

  );
}

export default App;
