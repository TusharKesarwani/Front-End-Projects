import React from "react";





import NQueensProblem from "./backTrackingAlgorithms/nQueensProblem/nQueensProblem";

// Stylesheets
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div><NQueensProblem/>

      
      </div>
    );
  }
}