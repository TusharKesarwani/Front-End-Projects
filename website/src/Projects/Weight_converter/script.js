let kgRef = document.getElementById("kg");
let gmRef = document.getElementById("gm");
let lbRef = document.getElementById("lb");
let ozRef = document.getElementById("oz");

let convertFromKg = () => {
  let kg = kgRef.value;
  if(kg<0){
  kgRef.value="";
  alert("Enter a positive value");
  return ;}
  //toFixed(2) limits the decimals to 2 digits.
  gmRef.value = (kg * 1000).toFixed(2);
  lbRef.value = (kg * 2.205).toFixed(2);
  ozRef.value = (kg * 35.274).toFixed(2);
};

let convertFromGm = () => {
    let gm = gmRef.value;
    if(gm<0){
      gmRef.value="";
      alert("Enter a positive value");
      return ;}
    kgRef.value = (gm / 1000).toFixed(2);
    lbRef.value = (gm / 453.6).toFixed(2);
    ozRef.value = (gm / 28.35).toFixed(2);
  };

let convertFromLb = () => {
  let lb = lbRef.value;
  if(lb<0){
    lbRef.value="";
    alert("Enter a positive value");
    return ;}
  kgRef.value = (lb / 2.205).toFixed(2);
  gmRef.value = (lb * 453.6).toFixed(2);
  ozRef.value = (lb * 16).toFixed(2);
};

let convertFromOz = () => {
  let oz = ozRef.value;
  if(oz<0){
    ozRef.value="";
    alert("Enter a Positive Value");
    return ;}
  kgRef.value = (oz / 35.274).toFixed(2);
  gmRef.value = (oz * 28.35).toFixed(2);
  lbRef.value = (oz / 16).toFixed(2);
};

kgRef.addEventListener("input", convertFromKg);
gmRef.addEventListener("input", convertFromGm);
lbRef.addEventListener("input", convertFromLb);
ozRef.addEventListener("input", convertFromOz);
window.addEventListener("load", convertFromKg);