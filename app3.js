const fs = require('fs');

const inputUrl = process.argv[2];
const outputUrl = process.argv[3];
const delimiter = process.argv[4];

    
    const data = readFile(inputUrl);

    if (data) {
        const result = transformData(data, delimiter);
        writeData(outputUrl, result);
    }




function transformData(data, delimiter) {

const newArray = []

for (const row of data) {

  
   const newRow = data.split('#')
   const newObj = []

   for (let i = 0; i < newRow.length; i++) {
    const element = newRow[i];
    
    newObj.push(element)

   }
    
   newArray.push(newRow + delimiter)
    
} 



return newArray




}







function readFile(url) {
    try {
        const data = fs.readFileSync(url, 'utf8');
        return data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

function writeData(url, data) {
    try {
        fs.writeFileSync(url, JSON.stringify(data, null, 2)); 
        console.log('Fatto!');
    } catch (err) {
        console.error(err);
    }
}