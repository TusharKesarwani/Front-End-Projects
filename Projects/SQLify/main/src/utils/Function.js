

export const retrieveSQLfromCSV = (headerData,csvData ,table_name)=>{
    if(!table_name) table_name = 'table_name'
    const createTableSQL = `CREATE TABLE ${table_name} (${headerData.map(field => `${field} VARCHAR`).join(", ")});`;
    const insertSQL = csvData.map(row => {
        const values = headerData.map(field => `'${row[field] || ''}'`).join(", ");
        return `INSERT INTO ${table_name} (${headerData.join(", ")}) VALUES (${values});`;
    }).join("\n");

    return `${createTableSQL}\n\n${insertSQL}`;
}



export const downloadSQL = (content)=>{
    const blob = new Blob([content] , {type: 'text/sql'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table_name.sql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}




export const copySQL = (content) => {
    navigator.clipboard.writeText(content);
    alert("SQL copied to clipboard!");
}



export const retrieveSQLfromJSON = (file)=>{
    const obj = JSON.parse(file);
    console.log("Oggetto caricato: " , obj); //Log 

}




