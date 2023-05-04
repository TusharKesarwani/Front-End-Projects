function addKeyValueToFile(file, key) {
    // Load the file contents into a variable
    const fileContents = require(file);
    // const contents = JSON.parse(fileContents);
  
    // Loop through the array and add the key-value pair to each object
    var i = 1;
    fileContents.forEach((object) => {
      object[key] = i++;
    });
  
    // Save the modified file back to disk
    const fs = require('fs');
    fs.writeFileSync(file, JSON.stringify(fileContents));
  }
  addKeyValueToFile('./data.json', 'Id');
  