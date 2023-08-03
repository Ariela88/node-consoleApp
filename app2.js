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
    const header = rows.shift();

   
    const headerReplaced = header.replace(/#/g, separator);
    const headerArray = headerReplaced.split(separator);

    const disney = [];

    for (const row of rows) {
        const rowArray = row.split(separator);
        const element = {};

        for (let j = 0; j < headerArray.length; j++) {
            const key = headerArray[j].trim();
            let value = rowArray[j].trim();

            if (!isNaN(value)) {
                value = Number(value);
            } else if (value.toLowerCase() === 'true') {
                value = true;
            } else if (value.toLowerCase() === 'false') {
                value = false;
            }

            element[key] = value;
        }

        disney.push(element);
    }

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

function writeData(url, data, separator) {
    try {
        fs.writeFileSync(url, JSON.stringify(data, null, 2), separator); 
        console.log('Fatto!');
    } catch (err) {
        console.error(err);
    }
}