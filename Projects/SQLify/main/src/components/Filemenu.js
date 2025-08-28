import React from 'react';
import '../style/components/Filemenu.css'



const Filemenu = ({handleUpload , handleCopy , handleDownload , handlePaste , fileExtension , sqlContent}) => {
   
    return (
        <nav className='file-menu'>
            <div className="menu-buttons">
                <input type="file" accept={fileExtension} onChange={handleUpload} className="menu-button" />
                <button onClick={handlePaste} className="menu-button">
                    Paste Data
                </button>
                <button onClick={handleCopy} disabled={!sqlContent.trim()} className="menu-button">
                    Copy to Clipboard
                </button>
                <button onClick={handleDownload} disabled={!sqlContent.trim()} className="menu-button">
                    Download SQL
                </button>
            </div>
        </nav>
    );
};

export default Filemenu;