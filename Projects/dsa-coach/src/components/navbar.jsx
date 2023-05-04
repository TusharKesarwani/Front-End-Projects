import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg myNav">
  <div className="container-fluid">
    <a className="navbar-brand" href="https://sampadadhikary.cyclic.app/" target="blank"><img src="/resources/home.png" width="50px" alt="home"/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav navList">
        <li>
          <a className="navItems" aria-current="page" href="#hero">Home</a>
        </li>
        <li>
          <a className="navItems" href="#topics">DSA Sheet</a>
        </li>
        <li>
          <a className="navItems" href="#about">About</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}
