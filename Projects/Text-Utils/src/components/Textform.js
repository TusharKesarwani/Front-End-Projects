import React , {useState} from 'react'

export default function Textform(props) {
  const[text , setText] = useState('');
  const upButton =()=>{
    let newText =text.toUpperCase();
    setText(newText);
  }

  const loButton =()=>{
    let newText =text.toLowerCase();
    setText(newText);
  }

  const onChange =(event)=>{
    
    setText(event.target.value);
  }

  const clearButton =()=>{
    let newText = "" ;
    setText(newText);
  }

  const copyText =()=>{
    var text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);

  }

  const extraSpaces =()=>{
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
  }
  return (  <>
             <div>
            
            <div className="mb-3" >
             <label for="exampleFormControlTextarea1" class="form-label">{props.heading}</label>
             <textarea className="form-control" value={text} onChange={onChange} id="myBox" rows="10" ></textarea>
            </div>
             </div>
            <button type="button" className="btn btn-dark mx-2" onClick={upButton}>Convert to Upper-Case</button>
            <button type="button" className="btn btn-dark mx-2" onClick={loButton}>Convert to Lower-Case</button>
            <button type="button" className="btn btn-dark mx-2" onClick={clearButton}>Clear Text</button>
            <button type="button" className="btn btn-dark mx-2" onClick={copyText}>Copy Text</button>
            <button type="button" className="btn btn-dark mx-2" onClick={extraSpaces}>Remove Extra Spaces</button>
            <div className='container my-3'>
              <h2>Your Text Summary</h2>
              <p>{text.split(" ").length-1} words and {text.length} characters</p>
              <p>{0.008 *text.split(" ").length } Minutes read </p>
              <h3>Preview</h3>
              <p>{text}</p>
            </div>
            </>
  )
}
