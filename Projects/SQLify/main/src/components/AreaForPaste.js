// src/components/AreaForPaste.js
import React, { useState } from "react";
import Papa from "papaparse";
import { retrieveSQLfromCSV } from "../utils/Function";
import '../style/components/AreaForPaste.css';

const AreaForPaste = ({ isOpen, onClose, setSqlContent , extension }) => {
  const [pastedData, setPastedData] = useState("");

  if (!isOpen) return null; // non renderizza nulla se la modale è chiusa

  const handleConvert = () => {
    const results = Papa.parse(pastedData, { header: true });
    const sql = retrieveSQLfromCSV(results.meta.fields, results.data);
    setSqlContent(sql);
    handleClose();
  };

const handleClose = () => {
    setPastedData("");
    onClose();
}

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Paste your {extension} data</h2>
        <textarea
          value={pastedData}
          onChange={(e) => setPastedData(e.target.value)}
          placeholder={`Paste your ${extension} data here...`}          rows={10}
        />
        <div className="modal-buttons">
          <button onClick={handleConvert} disabled={!pastedData.trim()}>
            Convert to SQL
          </button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AreaForPaste;