const fs = require('fs');

const inputUrl = process.argv[2];
const outputUrl = process.argv[3];


console.log("Digita il carattere che vuoi usare per dividere gli elementi: ");
process.stdin.once('data', (input) => {
    const delimiter = input.toString().trim();
    const data = readFile(inputUrl);

    if (data) {
        const result = transformData(data, delimiter);
        writeData(outputUrl, result);
    }

    process.stdin.pause();
});

function transformData(data, delimiter) {
    const rows = data.split(/\r?\n/);
    const header = rows.shift();

    
    const headerReplaced = header.replace(/#/g, delimiter);
    const headerArray = headerReplaced.split(delimiter);

    const students = [];

    for (const row of rows) {
        const rowArray = row.split('#');
        const student = {};

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

            student[key] = value;
        }

        students.push(student);
    }

    return students;
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
