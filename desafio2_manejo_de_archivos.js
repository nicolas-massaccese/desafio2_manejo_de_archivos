const fs = require ('fs');


class Container {

    constructor (fileName) {
        this.fileName = fileName
    }

    save = async (product) => {        
        const fileData =  fs.readFileSync(`./${this.fileName}.txt`, 'utf-8');
        const fileDataJson = JSON.parse(fileData);
        const objet = fileDataJson[( fileDataJson.length - 1)];
        const newID = objet.id + 1;
        const newProduct = {'id':newID, ...product};
        fileDataJson.push(newProduct);
        const fileDataString = JSON.stringify(fileDataJson);
        try {
            await fs.promises.writeFile(`./${this.fileName}.txt`, fileDataString);
        } catch (err) {
            console.error(err);
        }
        return (newID);
    }

    getById(idNumber) {
        const fileData = fs.readFileSync(`./${this.fileName}.txt`, 'utf-8');
        const fileDataJson = JSON.parse(fileData);
        let objectId = null;
        objectId = fileDataJson.find(element => element.id == idNumber);
        return objectId;
    }


    getAll () {
        const fileData =  fs.readFileSync(`./${this.fileName}.txt`, 'utf-8');
        return (JSON.parse(fileData));
    }

    deleteById = async (idNumber) => {
        const fileData =  fs.readFileSync(`./${this.fileName}.txt`, 'utf-8');
        const fileDataJson = JSON.parse(fileData);
        const indexObjet = fileDataJson.findIndex(element => element.id == idNumber);
        if ( indexObjet != -1 ) {
            fileDataJson.splice(indexObjet, 1);
            const fileDataString = JSON.stringify(fileDataJson);
            try {
                await fs.promises.writeFile(`./${this.fileName}.txt`, fileDataString);
            } catch (err) {
                console.error(err);
            }
        }
    }

    deleteAll = async () => {        
        let emptyArray = [];
        try {
            await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(emptyArray));
        } catch (err) {
            console.error(err);
        }
    }
}


const product = new Container ('products');


const newProduct = {
    title: 'reloj',
    price: 25000,
    thumbnail: 'https://cdn-xiaomi.waugi.com.ar/1098-thickbox_default/xiaomi-mi-smart-band-6-smart-watch-reloj-inteligente.jpg'
    };


console.log(product.save(newProduct));
console.log(product.getById(2));
console.log(product.getAll());
product.deleteById(1);
product.deleteAll();