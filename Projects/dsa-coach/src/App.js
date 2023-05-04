import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import CardGroup from "./components/cardlist";
import Footer from "./components/footer";
import Table from "./components/table";

function App(props) {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <CardGroup/>
      <Table/>
      <Footer />
    </div>
  );
}

export default App;
