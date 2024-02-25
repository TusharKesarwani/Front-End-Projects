import Load from "./components/Load";
import Navigation from "./components/Navigation";
import Contributor from "./sections/Contributor";
import Main from "./sections/Main";
import Project from "./sections/Project";
import Footer from "./sections/Footer";
import ScrollButton from "./components/ScrollButton";



function App() {


  return (
    <>
      <Load />
      <ScrollButton />
      <Navigation />
      <Main />
      <Project />
      <Contributor />
      <Footer />
    </>
  );
}

export default App;
