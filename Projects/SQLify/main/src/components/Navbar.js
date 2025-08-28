import React from "react";
import { Link } from "react-router-dom";
import '../style/components/Navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">SQLify</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/from-csv" className="navbar-link">Import from CSV</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/from-excel" className="navbar-link">Import from Excel</Link>
                </li>
                
            </ul>
            
        </nav>
    );
};

export default Navbar;