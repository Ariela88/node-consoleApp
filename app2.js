const fs = require('fs');

const inputUrl = process.argv[2];
const outputUrl = process.argv[3];
const separator = process.argv[4];


const data = readFile(inputUrl);

    if (data) {
        const result = transformData(data, separator);
        writeData(outputUrl, result);
    }

    
function transformData(data, separator) {
    const rows = data.split(/\r?\n/);
    const disney = rows.reduce((result, row) => {
      const disneyArray = row.split('#');
      for (let j = 0; j < disneyArray.length; j++) {
        let string = disneyArray[j].trim();
        result.push(string + separator);
      }
      return result;
    }, []);
    return disney;
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
