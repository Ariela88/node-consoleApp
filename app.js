const fs = require('fs');

const inputUrl = process.argv[2]
const outputUrl = process.argv[3]



let data = readFile(inputUrl)


if (data) {

    const result = transformData(data)

    writeData(outputUrl, result);

}

function transformData(data){

    const rows = data.split(/\r?\n/)

//creare una costante 'header' con la prima riga che avrete tolto a rows (unshift)
//create una costante 'headerArray' splittando la stringa header sulle virgole
//creare un array chiamato students (vuoto)
//ciclate sull'array rows, quindi sulle restanti 4 righe e creare una costante rowArray splittando la singola row sulle virgole
//create un oggetto vuoto chiamato students
//ciclate sull'headerArray
//per ogni elemento dell'array aggiungere la key esatta esempio student[headerArray[j]] = rowArray [j]

//aggiungo student a students
//ritorna json.stringify di students
//tipizzare i valori numerici e booleani
//aggiungere un parametro alla applicazione che mi permette di indicare il carattere divisorio ()
//gestire la possibilità che nel csv ci siano degli spazi non voluti



    return JSON.stringify(rows)

}


function readFile(url) {

    try {
        const data = fs.readFileSync(url, 'utf8');
        return data

    } catch (err) {
        console.error(err.message);
        return null;
    }


}


function writeData(url, data) {


    try {
        fs.writeFileSync(url, data);
        // file written successfully
    } catch (err) {
        console.error(err);
    }

}




