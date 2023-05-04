import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Array from "../data/tableData";
import Matrix from "../data/matrix"
import Strings from "../data/strings";
import Search from "../data/search";
import LinkedList from "../data/linkedlist";
import BitManipulation from "../data/bitManipulation";
import BinaryTree from "../data/binarytree"
import Bst from "../data/bst";
import Greedy from "../data/greedy";
import BackTracking from "../data/backtracking";
import StackQueue from "../data/Stackqueue";
import Heap from "../data/heap";
import Graph from "../data/graph";
import Trie from "../data/trie";
import Dp from "../data/dp";

export default function Table(props) {
  const columns = [
    {
      name: "Serial No.",
      selector: (row) => row.Id,
    },
    {
      name: "Problem",
      selector: (row) => row.Problem,
    },
    {
      name: "URL",
      selector: (row) => <a href={row.URL} target="blank"><img src="resources/gfg.png" width="80px" alt="gfg"/></a>,
    },
  ];

  const cStyle = {
    headCells: {
      style: {
        backgroundColor: "#425F57",
        color: "#fff",
        textAlign:"center",
        fontSize:"1.15rem",
        fontWeight:"600",
        fontFamily:'Poppins'
      }
    },
    rows: {
      style: {
        textAlign:"center",
        minHeight: "50px", // override the row height
        backgroundColor: "#DEF5E5",
        color:"#425F57",
        fontFamily:'Poppins',
        fontSize:"1rem"
      }
    }
  }

  return (
    <div className="problemTable">
      <h4 className="hero4" id="tableHeader">Arrays</h4>
      <DataTable columns={columns} data={Array} customStyles={cStyle} selectableRows pagination fixedHeader />
    </div>
  );
}
