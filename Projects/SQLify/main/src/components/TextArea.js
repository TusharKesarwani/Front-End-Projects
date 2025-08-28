import React from "react";
import '../style/components/TextArea.css'
const TextArea = ({ sqlContent }) => {
    return (
        <textarea 
            placeholder="Your SQL script will appear here..."
            className="text-area sql-output" 
            value={sqlContent} 
            rows={10} 
            cols={50} 
        />
    );
}

export default TextArea;