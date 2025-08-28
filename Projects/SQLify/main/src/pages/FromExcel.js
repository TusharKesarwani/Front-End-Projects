import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Filemenu from "../components/Filemenu";
import { copySQL, downloadSQL, retrieveSQLfromCSV } from "../utils/Function";
import AreaForPaste from "../components/AreaForPaste";
import * as XLSX from "xlsx";
import TextArea from "../components/TextArea";
import "../style/pages/FromExcel.css";
import TableCols from "../components/TableCols";
import TableNameField from "../components/TableNameField";

const FromExcel = () => {
  const [sqlContent, setSqlContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [workbook, setWorkbook] = useState(null);
  const [csvData , setCSVData] = useState() ; 
  const [cols , setCols] = useState([]); 
  const onClose = () => {
    setIsModalOpen(false);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      setWorkbook(wb);
      setSheetNames(wb.SheetNames);
      setSelectedSheet(wb.SheetNames[0]);
      // Set the columns for the first sheet by default
      const ws = wb.Sheets[wb.SheetNames[0]];
      const dataObjects = XLSX.utils.sheet_to_json(ws);
      setCSVData(dataObjects);
      const headers = dataObjects.length > 0 ? Object.keys(dataObjects[0]) : [];
      setCols(headers);
      const sql = retrieveSQLfromCSV(headers, dataObjects);
      setSqlContent(sql);
    };

    reader.readAsBinaryString(file);
  };

  const handleSheetChange = (e) => {
    const sheet = e.target.value;
    setSelectedSheet(sheet);
    if (workbook && workbook.Sheets[sheet]) {
      const ws = workbook.Sheets[sheet];
      const dataObjects = XLSX.utils.sheet_to_json(ws);
      const headers = dataObjects.length > 0 ? Object.keys(dataObjects[0]) : [];
      const sql = retrieveSQLfromCSV(headers, dataObjects);
      setSqlContent(sql);
    }
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
    <div className="from-excel-page">
      <Navbar />
      <div className="from-excel-content">
        <div className="from-excel-header">
          <h1 className="from-excel-title">Excel to SQL</h1>
          <p className="from-excel-description">
            Upload an Excel file or paste your spreadsheet data into this tool.
            This app generates SQL <code>CREATE TABLE</code> and{" "}
            <code>INSERT INTO</code> statements that you can copy or download.
            Run the SQL in your database and start querying your data.
          </p>

          <div className="from-excel-card">
            <Filemenu
              sqlContent={sqlContent}
              handleUpload={handleUpload}
              handleCopy={handleCopy}
              handleDownload={handleDownload}
              handlePaste={handlePaste}
              fileExtension=".xlsx"
            />
            {sqlContent.trim() && (
<TableNameField onTableNameChange = {(updatedTableName)=>{setSqlContent(retrieveSQLfromCSV(cols , csvData , updatedTableName.trim()))
}}/>
)}

            <div className="textarea-section">

              {sheetNames.length > 1 && (
                <div className="from-excel-sheet-select" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                  <label htmlFor="sheet-select" style={{ color: '#000', fontWeight: 600, marginRight: 8 }}>Select sheet:</label>
                  <select
                    id="sheet-select"
                    value={selectedSheet}
                    onChange={handleSheetChange}
                    style={{ padding: '0.5rem', borderRadius: 4 }}
                  >
                    {sheetNames.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
              )}

              <TextArea
                placeholder="Your SQL script will appear here..."
                sqlContent={sqlContent}
              />
            </div>

            <AreaForPaste
              isOpen={isModalOpen}
              onClose={onClose}
              setSqlContent={setSqlContent}
              extension={"Excel"}
            />
          </div>
          <div>
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
    </div>
  );
};

export default FromExcel;