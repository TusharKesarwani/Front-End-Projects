import React from "react";
import { useState } from "react";
import '../style/components/TableCols.css'

const TableCols = ({cols , onColsChange})=>{
//All'inizio le colonne selezionate sono tutte
const [selectedCols , setSelectedCols] = useState(cols);
//Funzione da chiamare all'onChange dell'input
function handleColChange(e) {
const colAffected = e.target.value;
//Se avessi usato direttamente la variabile di stato , non avrebbe funzionato perchè l'aggiornamento di stato è asincrono
setSelectedCols((prevSelected) => {
let newSelected;
if (prevSelected.includes(colAffected)) {
newSelected = prevSelected.filter((c) => c !== colAffected);
 } else {
newSelected = [...prevSelected, colAffected];
 }
// Notifichiamo il componente padre con il nuovo stato corretto
onColsChange(newSelected); //lift state up
return newSelected;
 });
 }

return (
<div className="table-cols-container">
<h2 className="table-cols-title">Choose the columns to include</h2>
<div className="columns-grid">
{cols.map((col, index) => (
<div key={index} className="column-item">
<label className="column-label">
<input
type="checkbox"
className="column-checkbox"
value={col}
checked={selectedCols.includes(col)}
onChange={handleColChange}
/>
<div className="column-content">
<span className="column-name">{col}</span>
<span className="include-text">Include?</span>
</div>
</label>
</div>
))}
</div>
</div>
)
}

export default TableCols;