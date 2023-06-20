
// variables

var pInput = document.getElementById("p");
var qInput = document.getElementById("q");
var eInput = document.getElementById("e");
var dInput = document.getElementById("d");
var pTextInput = document.getElementById("input");
var cTextInput = document.getElementById("output");
var genBtn = document.getElementById("genBtn");
var op = document.getElementById("op");
var opBtn = document.getElementById("opBtn");

var p = 0;
var q = 0;
var n = 0;
var phi = 0;
var e = 0;
var d = 0;
var isEncryption = true;







//setters
function setP(val) {
  p = val;
}

function setQ(val) {
  q = val;
}

function setN(val) {
  n = val;
}

function setPhi(val) {
  phi = val;
}

function setE(val) {
  e = val;
}

function setD(val) {
  d = val;
}


//event listeners

genBtn.addEventListener("click", function () {
    p = parseInt(pInput.value);
    q = parseInt(qInput.value);
    generateKeys();
    eInput.value = "("+e+","+n+")";
    dInput.value = "("+d+","+n+")";
});

op.addEventListener("click", function (event) {
    if(event.target.value == "encrypt"){
        isEncryption = true;
        document.getElementById("opTitle").innerHTML = "Encrypt";
        opBtn.innerHTML = "Encrypt";
        document.getElementById("result").innerHTML = "Cipher text = ";
    }else{
        isEncryption = false;
        document.getElementById("opTitle").innerHTML = "Decrypt";
        opBtn.innerHTML = "Decrypt";
        document.getElementById("result").innerHTML = "Plain text = ";
    }
});

opBtn.addEventListener("click", function () {
    if(isEncryption){
        encrypt();
    }else{
        decrypt();
    }
});


//checkprime - function to check if a number is prime
function checkprime(n) {
  if (n === 2) {
    return true;
  } else if (n % 2 === 0 || n === 1 || n === 0) {
    return false;
  } else {
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }
}

//gcd - function to find gcd of two numbers
function gcd(a, b) {
  if (b === 0) {
    return a;
  } else {
    return gcd(b, a % b);
  }
}



//  generateKeys - function to generate keys using p and q

function generateKeys() {
  if (p && q) {
    if (checkprime(p) && checkprime(q)) {
      let nz = p * q; // n = p*q
      let phiz = (p - 1) * (q - 1); // phi = (p-1)*(q-1)
      setN(nz);
      setPhi((p - 1) * (q - 1));

      let ez = 2; // e = 2
      while (ez < phiz) {
        if (gcd(ez, phiz) === 1) {
          // e and phi must be coprime
          break;
        } else {
          ez++;
        }
      }

      setE(ez);

      let dz = 1;
      while (dz < phiz) {
        if ((ez * dz) % phiz === 1) {
          // d = (1/e)mod(phi)
          break;
        } else {
          dz++;
        }
      }
      setD(dz);
      console.log("p: " + p);
        console.log("q: " + q);
        console.log("n: " + n);
        console.log("phi: " + phi);
        console.log("e: " + e);
        console.log("d: " + d);

    } else {
      alert("p and q must be prime");
    }
  } else {
    alert("p and q cannot be empty");
  }
}



//binarymod - function to calculate (b^e)mod(m)
function binarymod(b, e, m) {
  let r = 1;
  b = b % m;
  while (e > 0) {
    if (e % 2 == 1) {
      r = (r * b) % m;
    }
    e = Math.floor(e / 2);
    b = (b * b) % m;
  }
  return r;
}


function encrypt() {
    console.log("encrypt")
  let m = parseInt(pTextInput.value);
  let c = binarymod(m, e, n);
  cTextInput.value = c;
}

function decrypt() {
    let c = parseInt(pTextInput.value);
    let m = binarymod(c, d, n);
    console.log(c,m)
    cTextInput.value = m;
}
