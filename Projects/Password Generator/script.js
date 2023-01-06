//PASSWORD GENERATOR FUNCTION
function getPassword() {
    const chars = '0123456789/%?@$#';
    const clength = chars.length;
    let password = '';
    while (password.length < 20) {
        password = password.concat(randomWord(chars.length));
        password = password.concat(chars[randomNumber(clength)]);
    }
    password = password.substring(0, 16);
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
  var copyText = document.getElementById("myInput");

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
