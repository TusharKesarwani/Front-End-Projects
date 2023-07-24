import React from "react";
import crown from "./crown.png";

import { getNQueensAnimations } from "./../backTrackingAlgorithms";

import BackBar from './../backbar';

// Stylesheets
import "./../animate.min.css";
import "./nQueensProblem.css";

const SIZE_OF_BOARD = 4;
var ANIMATION_SPEED_SECONDS = 1.5;

const CELL_COLOR = "#BFC9CA";
const SAFE_COLOR = "#DC143C";
const CROWN_COLOR = "#FFFFFF";
const SAFE = "#2ECC71";

export default class NQueensProblem extends React.Component {
    constructor(props) {
        super(props);

        this.state = { disabled: false };
    }

    componentDidMount() {
        this.drawBoard(SIZE_OF_BOARD);
    }

    drawBoard(SIZE) {
        // This function draws the NxN board and according to the size applies styling which makes easier to visualise huge sized boards on small screens.
        let padding = 0;
        let fontSize = 0;

        // Deleting the previous board cells and results section for new start
        document.getElementById("nQueensBoard").innerHTML = "";
        document.getElementById("NQueenResults").innerHTML = "";

        // Calculating the board size and style values
        switch (SIZE) {
            case 4:
                padding = 20;
                fontSize = 30;
                ANIMATION_SPEED_SECONDS = 1.5;
                break;
            case 5:
            case 6:
                padding = 10;
                fontSize = 25;
                ANIMATION_SPEED_SECONDS = 1;
                break;
            case 7:
                padding = 7;
                fontSize = 20;
                ANIMATION_SPEED_SECONDS = 0.5;
                break;
            case 8:
                padding = 7;
                fontSize = 18;
                ANIMATION_SPEED_SECONDS = 0.5;
                break;
            default:
                return;
        }
        // creating the board
        const container = document.getElementById("nQueensBoard");

        // Adding Rows and Columns to the board
        container.style.setProperty("--Qgrid-rows", SIZE);
        container.style.setProperty("--Qgrid-cols", SIZE);

        // Adding cells to the board
        for (let j = 0; j < SIZE * SIZE; j++) {
            let cell = document.createElement("div");
            let item = document.createElement("i");

            cell.appendChild(item).className = "fas fa-crown";
            container.appendChild(cell).className = "Qgrid-item q-array-tile";
        }

        // Styling the cells
        const arrayTiles = document.getElementsByClassName("q-array-tile");
        const crownsI = document.getElementsByClassName("fa-crown");
        for (let l = 0; l < arrayTiles.length; l++) {
            arrayTiles[l].style.padding = `${padding}px`;
            arrayTiles[l].style.backgroundColor = CELL_COLOR;
            crownsI[l].style.fontSize = `${fontSize}px`;
            crownsI[l].style.color = CELL_COLOR;
        }

        // Since everything is just created dynamically we have to apply styles
        // one by one to each element because depending on the board size we are
        // determining the corressponding styles.
    }

    NQueensProblem() {
        // Getting the size from the input box
        let size = parseInt(document.getElementById("boardInput").value);

        // checking if size is greater than 3 because no solutions exist for n <= 3
        // checking if size is lesser than 17 because the user's RAM will be
        // used heavily for greater sizes and page can be unresponsive.
        if (size < 4 || size > 8) {
            alert("Board Size must be between 4 and 8");
            return;
        }
        // finally drawing the board
        this.drawBoard(size);

        // getting the cells for visualisations
        const arrayTiles = document.getElementsByClassName("q-array-tile");

        // getting the crown element inside the cell
        const crown = document.getElementsByClassName("fa-crown");

        // getting the results div
        const resultsDiv = document.getElementById("NQueenResults");

        // getting the Animations for NQueens.
        const NQueensAnimations = [];
        getNQueensAnimations(size, NQueensAnimations);

        let count = 0;
        for (let i = 0; i < NQueensAnimations.length; i++) {
            count++;

            // Disabling all the input sources untill Algorithm is finished.
            this.setState({ disabled: true });

            const [row, col, isQueenSafe] = NQueensAnimations[i];
            const idx = size * row + col;

            // Creating an alert message for Progress Section
            let alert = document.createElement("div");
            alert.classList.add("alert");
            alert.classList.add("animate__animated");
            alert.classList.add("animate__slideInDown");

            setTimeout(() => {
                // checking if this is a valid position
                if (isQueenSafe) {
                    // valid positions are highlighted as RED which is royal
                    arrayTiles[idx].style.backgroundColor = SAFE_COLOR;
                    arrayTiles[idx].classList.add("safe-queen");

                    // making the crown visible
                    crown[idx].style.color = CROWN_COLOR;
                    // popping up the crown with an effect
                    crown[idx].classList.add("popupQueen");

                    // Adding the alert message for results div
                    alert.innerHTML = `Trying Queen at row ${row} and col ${col}`;
                    alert.classList.add("alert-success");
                } else {
                    // invalid positions are highlighted as default board color
                    arrayTiles[idx].style.backgroundColor = CELL_COLOR;
                    arrayTiles[idx].classList.remove("safe-queen");

                    // making the crown invisible
                    crown[idx].style.color = CELL_COLOR;
                    // removing the popup animation
                    crown[idx].classList.remove("popupQueen");

                    // Adding the alert message for results div
                    alert.innerHTML = `row ${row} and col ${col} didn't work out. Backtracking`;
                    alert.classList.add("alert-danger");
                }
                // adding alert to results div
                resultsDiv.prepend(alert);
                // adding a transition for color change
                arrayTiles[idx].style.transition = "200ms all";
            }, ANIMATION_SPEED_SECONDS * 1000 * i);
            // looping according to animation speeds
        }

        // getting the queens at final safe positions
        const trueValues = document.getElementsByClassName("safe-queen");

        setTimeout(() => {
            for (let i = 0; i < trueValues.length; i++) {
                trueValues[i].style.backgroundColor = SAFE;
                trueValues[i].style.transition = "300ms all";

                // Enabling the input sources for another visualization
                this.setState({ disabled: false });

                // This means we have reached at final positions with Queens placed
                // on Valid positions
                if (i === trueValues.length - 1) {
                    // Adding final alert message
                    let alert = document.createElement("div");
                    alert.classList.add("alert");
                    alert.classList.add("animate__animated");
                    alert.classList.add("animate__slideInUp");
                    alert.innerHTML = `All Queens have been placed on Valid positions`;
                    alert.classList.add("alert-primary");

                    // Prepending the alert message
                    resultsDiv.prepend(alert);
                }
            }
        }, (count + 1) * ANIMATION_SPEED_SECONDS * 1000);
    }

    render() {
        const { disabled } = this.state;

        return (
            <div>
                <BackBar />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="row">
                                <div className="col-sm-12">
                                    <center>
                                        <h2>
                                            <img
                                                className="mb-2"
                                                src={crown}
                                                width="40px"
                                                alt={""}
                                            />{" "}
                                            N-Queens Visualiser
                                        </h2>
                                    </center>
                                </div>
                            </div>
                            <div
                                className="Qbox Qboard mb-2"
                                id="nQueensBoard"
                            ></div>
                            <div className="row">
                                <div className="input-group mt-1 container col-sm-6">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Board Size
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        id="boardInput"
                                        className="form-control"
                                        placeholder="Board Size"
                                        defaultValue="4"
                                        readOnly={disabled}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="custom-btn btn-1"
                                            disabled={disabled}
                                            onClick={() =>
                                                this.NQueensProblem()
                                            }
                                        >
                                            Visualise N-Queens
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div id="NQueenResults" className="col-sm-4 mt-3"></div>
                    </div>
                </div>
            </div>
        );
    }
}
