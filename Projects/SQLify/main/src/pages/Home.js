import React from "react";
import Navbar from "../components/Navbar";
import '../style/pages/Home.css'


const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        <h1>Welcome to SQLify</h1>
        <p>
          This tool allows you to convert your local files directly into SQL statements.
          Simply upload a CSV, Excel, or JSON file and get the corresponding &nbsp;<code>CREATE TABLE</code> and <code>INSERT INTO</code> statements instantly.
        </p>
        <p>
          All operations are performed <strong>client-side</strong>, so your data never
          leaves your computer. SQLify is open source, so you can clone the repository
          and host it yourself if you want.
        </p>
        <div className="repo-link-container">
          <p>
            <strong>Link to repo:</strong> 
            <br />
            <a href="https://github.com/vincenzo113/sqlify" target="_blank" rel="noopener noreferrer">
              https://github.com/vincenzo113/sqlify
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;