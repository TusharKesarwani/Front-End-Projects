import React from "react";
import '../style/components/TableName.css'

const TableNameField = ({onTableNameChange})=>{
    function handleTableNameChange(e) {
        onTableNameChange(e.target.value);
    }

    return (
        <div className="table-name-field-container">
            <h2 className="table-name-field-title">Enter the name of the SQL table</h2>
            <input 
                type="text" 
                className="table-name-input" 
                placeholder="Table Name" 
                onChange={handleTableNameChange}
            />
        </div>
    )
}

export default TableNameField;