import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(props) {
  return (
<nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="./"><h3>Online Text-Analyzer</h3></Link>
    
      <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'} d-grid gap-2 d-md-flex justify-content-md-end`}>
         <input className="form-check-input" onClick={props.switchMode} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
         <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable DarkMode</label>
      </div>
    </div>
</nav>
  )
}

export default Navbar