import Load from "./components/Load";
import Navigation from "./components/Navigation";
import Contributor from "./sections/Contributor";
import Main from "./sections/Main";
import Project from "./sections/Project";
import Footer from "./sections/Footer";
import React, { useEffect, useRef } from "react";
import locomotiveScroll from "locomotive-scroll";

function App() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new locomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });
  }, []);

  return (
    <>
      <Load />
      <Navigation />
      <Main />
      <Project />
      <Contributor />
      <Footer />
      <div ref={scrollRef}></div>
    </>
  );
}

export default App;