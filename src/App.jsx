import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Header from "./pages/Header";
import TechStack from "./pages/TechStack";
import Projects from "./pages/projects";

// import Services from "../Components/Services";
// import CustomerReasons from "../Components/CustomerReasons";
import Footer from "../src/components/Footer";
import "./App.css";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Navbar />
        </nav>
        <main>
          <nav className="HeaderSection">
            <Header />
          </nav>
          {/* <nav className="WhyChooseSection">
          <WhyChoose />
        </nav> */}

          <nav className="BlogSection">
            <TechStack />
            <Projects />
          </nav>
          {/* <nav className="TestimonialSection">
          <Testimonial />
        </nav> */}

          <Routes>
            {/* <Route path="/" exact component={Front} />
            <Route path="/services" component={Services} />
            <Route path="/customer-reasons" component={CustomerReasons} /> */}
          </Routes>
          <div className="">
            <Contact />
          </div>
        </main>
        <footer className="footer">
          <Footer />
        </footer>
      </div>
    </Router>
  );
};

export default App;
