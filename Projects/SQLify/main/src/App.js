import React from "react";
import {HashRouter as Router , Route , Routes} from "react-router-dom";
import FromCSV from "./pages/FromCSV";
import FromExcel from "./pages/FromExcel";
import Home from "./pages/Home";
import FromJSON from "./pages/FromJSON";  




import './style/App.css'
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/from-csv" element={<FromCSV />} />
          <Route path="/from-excel" element={<FromExcel />} />
          <Route path="/from-json" element={<FromJSON />} />
        </Routes>
    </Router>
  );
}

export default App;
