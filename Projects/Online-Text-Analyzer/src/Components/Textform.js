import React, {useState} from 'react'

function Textform(props) {

  const handleUpclick=()=>{
    let newText=text.toUpperCase();
    setText(newText);
  }

  const handleLoclick=()=>{
    let newText=text.toLowerCase();
    setText(newText);
  }

  const handleOnChange=(event)=>{
      setText(event.target.value);
  }

  const handleClearClick=()=>{
    let newText='';
    setText(newText);
  }

  const handleEmailclick=()=>{
    let newText=text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
    setText(newText.join('\n'));
  }

  const handleCopyclick=()=>{
    navigator.clipboard.writeText(text);
  }
  
  const handleExtraspaces=()=>{
    let newText=text.split(/[  ]+/);
    setText(newText.join(" "));
  }

  const handleReverseText=()=>{
    let newText=text.split("").reverse().join("");
    setText(newText);
  }

  

  const[text,setText]=useState("");
    return (
<form>
  <div className="container my-3" style={{color: props.mode==='light'?'black':'white'}}>
    <h2>{props.heading}</h2>
    <div className="mb-3">
     <textarea className="form-control" onChange={handleOnChange} style={{backgroundColor: props.mode==='light'?'white':'#080834' , color: props.mode==='light'?'black':'white'}} value={text} id="myBox" rows="10"></textarea>
    </div >
    <button disabled={text.length===0} className="btn btn-primary mx-3 my-3" type="button" onClick={handleUpclick}>Convert To Uppercase</button>
    <button disabled={text.length===0} className="btn btn-primary mx-4 my-3" type="button" onClick={handleLoclick}>Convert To Lowercase</button>
    <button disabled={text.length===0} className="btn btn-primary mx-4 my-3" type="button"onClick={handleExtraspaces}>Remove Extra Spaces</button>
    <button disabled={text.length===0} className="btn btn-primary mx-4 my-3" type="button" onClick={handleEmailclick}>Extract Emails</button>
    <button disabled={text.length===0} className="btn btn-primary mx-4 my-3" type="button" onClick={handleCopyclick}>Copy Text</button>
    <button disabled={text.length===0} className="btn btn-primary mx-4 my-3" type="button" onClick={handleClearClick}>Clear Text</button>
    <button disabled={text.length===0} className="btn btn-primary mx-3 my-3" type="button" onClick={handleReverseText}>Reverse Text</button>
  </div>

  <div className="container my-3" style={{color: props.mode==='light'?'black':'white'}}>
    
  <h2>Your Text Summary</h2>
  <h5 className="my-3">{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} Words | {text.length} Characters   | {(text.length===0)?0:(text.replace(/\n *\n/gm, '').split(/\n/).length)} Paragraphs   | {text.split(". ").length - 1} Sentences</h5>
  <h5 className="my-3">{text.length===0?0:0.008*text.split(" ").length} Minutes to read (approximately)</h5>
  
  <h2>Preview</h2> 
  <p>{text.length>0?text:"Enter something in TexBox above to preview it here"}</p>
  </div>   
</form>
    )
}

export default Textform