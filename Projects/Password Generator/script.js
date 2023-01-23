var len = document.getElementById("length");


//PASSWORD GENERATOR FUNCTION
function getPassword() {
   const chars = '0123456789/%?@$#';
    var lengthOfPassword = len.value;
    flag=0;
    if(lengthOfPassword==''){
        window.alert('Please Enter the length');
        flag=1;
    }

    if(lengthOfPassword<=4 && flag==0){
        window.alert('Password length cannot be less than 4 characters');
    }


    //console.log(lengthOfPassword);
    const clength = chars.length;
    let password = '';
    let p=0;
    console.log(randomWord(chars.length))
    while (p<lengthOfPassword) {
        password = password.concat(randomWord(chars.length));
        password = password.concat(chars[randomNumber(clength)]);
        p++;
    }
    password = password.substring(0, p);
    document.getElementById('password').value = password;
    
}

function randomNumber(e) {
    return Math.floor(Math.random() * e);
}

function randomWord() {
    const number = randomNumber(words.length);
    return words[number];
}
//////////////////////////////////////

//COPY BUTTON SCRIPT
function Copy() {
    // Get the text field
  var copyText = document.getElementById("password");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);
  
  // Alert the copied text
  alert("Copied the text: " + copyText.value);
  }

////////////////////////////////////////////////////////


const words = ['BOB', 'BAM', 'BND', 'XOF', 'BIF',
  'KHR', 'XAF', 'CVE', 'XAF', 'CLP', 'COP', 'KMF',
  'CRC', 'CUP', 'CDF', 'DKK', 'DJF', 'XCD', 'DOP',
  'EGP', 'XAF', 'ERN', 'ETB', 'FJD', 'XAF', 'GEL',
  'mud', 'sky', 'grew', 'hard', 'ill', 'frame',
  'XCD', 'GNF', 'GTQ', 'XOF', 'GYD', 'HTG', 'HNL',
  'GNF', 'HNL', 'ISK', 'IRR', 'Japan', 'Australia', 'Afghanistan',
  'Albania', 'Algeria', 'Brunei', 'Barbados', 'Chile', 'Dominica', 'Zambia',
  'Aromatic', 'Hearty', 'Roux', 'Victuals', 'Chiffonade', 'Divine', 'Omakase',
  'Sapid', 'Earthy', 'Fresh', 'Smoky', 'Sweet', 'Sour', 'Airy',
  'Chewy', 'Creamy', 'Crumbly', 'Blackened', 'Broiled', 'Glazed', 'Sauteed',
  'Basement', 'Den', 'Hall', 'Porch', 'Yard', 'Counter', 'Mirror',
  'Sink', 'Armchair ', 'Rug', 'Glass', 'Napkin', 'Stove', 'Microwave',
  'Toaster', 'dig', 'new', 'rest', 'play', 'win', 'strong'];
