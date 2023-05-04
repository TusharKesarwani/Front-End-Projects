export default function CardGroup(props) {

  function copyText(){
    navigator.clipboard.writeText(props.title);
    alert("Copied!!");
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="cardHeading" onClick={copyText}>{props.title}</h5>
        <h6 className="cardSub">Total Questions: {props.total}</h6>
        <h6 className="cardSub">Attempted: </h6>
        <a href="#table"><button type="submit" className="cardBtn">Start Now</button></a>
      </div>
    </div>
  );
}
