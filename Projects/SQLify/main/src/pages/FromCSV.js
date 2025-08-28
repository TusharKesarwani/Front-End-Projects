import React from "react";
import Navbar from "../components/Navbar";
import Filemenu from "../components/Filemenu";
import TextArea from "../components/TextArea";
import Papa from "papaparse";
import { useEffect } from "react";
import { useState } from "react";
import { retrieveSQLfromCSV , downloadSQL , copySQL} from "../utils/Function";
import '../style/pages/FromCSV.css'
import AreaForPaste from "../components/AreaForPaste";
import TableCols from "../components/TableCols";
import TableNameField from "../components/TableNameField";


const FromCSV = () => {

     const [sqlContent , setSqlContent] = useState("");
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [cols , setCols] = useState([]); //Colonne del CSV
     const [csvData , setCSVData] = useState() ; //Dati CSV

    const onClose = ()=>{
      setIsModalOpen(false);
    }


    const handleUpload = (event) => {
        const file = event.target.files[0];
        Papa.parse(file, {
  header: true,
  complete: function(results) {
    const cleanedData = results.data
      .map(row => {
        const newRow = {};
        Object.keys(row).forEach(key => {
          newRow[key] = row[key].trim() === "" ? null : row[key]; // rimuove anche spazi
        });
        return newRow;
      })
      // Rimuove righe completamente vuote
      .filter(row => Object.values(row).some(value => value !== null));
      setCols(results.meta.fields); //Settiamo le colonne a tutta l'intestazione del csv
      setCSVData(cleanedData); //Salvo i dati CSV
      setSqlContent(retrieveSQLfromCSV(results.meta.fields, cleanedData));
  }
});
    };

    const handleCopy = () => {
        copySQL(sqlContent);
    };

    const handleDownload = () => {
        downloadSQL(sqlContent);
    };

    const handlePaste = () => {
      setIsModalOpen(true);
    };





  return (
<div className="from-csv-page">
<Navbar />
<div className="from-csv-content">
<div className="from-csv-header">
<h1 className="from-csv-title">CSV to SQL</h1>
<p className="from-csv-description">
 Upload a CSV file or paste your spreadsheet data into this tool.
 This app generates SQL <code>CREATE TABLE</code> and{" "}
<code>INSERT INTO</code> statements that you can copy or download.
 Run the SQL in your database and start querying your data.
</p>
<div className="from-csv-card">
<Filemenu
sqlContent={sqlContent}
handleUpload={handleUpload}
handleCopy={handleCopy}
handleDownload={handleDownload}
handlePaste={handlePaste}
fileExtension=".csv"
/>
{sqlContent.trim() && (
<TableNameField onTableNameChange = {(updatedTableName)=>{setSqlContent(retrieveSQLfromCSV(cols , csvData , updatedTableName.trim()))
}}/>
)}
<div className="from-csv-card textarea-section">
<TextArea
placeholder="Your SQL script will appear here..."
sqlContent={sqlContent}
/>
</div>
<AreaForPaste
isOpen={isModalOpen}
onClose={onClose}
setSqlContent={setSqlContent}
extension={"CSV"}
/>
</div>
{/* SPOSTA QUI IL TableCols */}
{sqlContent.trim() && (
<TableCols
cols={cols}
onColsChange={(selectedCols) => {
setSqlContent(retrieveSQLfromCSV(selectedCols, csvData));
 }}
/>
 )}
</div>
</div>
</div>
 );
};

export default FromCSV;