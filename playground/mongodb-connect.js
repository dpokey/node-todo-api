
// Ejemplo de destructuracion de ES6
// Es una nueva manera de hacer variables a partir de las propiedades de un objeto
const user = {name: 'Pierre', age: 30}
const {name} = user;

console.log(name);


// Usamos MongoClient
// const MongoClient = require('mongodb').MongoClient;

// Usamos MongoClient con destructuracion. esto crea una variable MongoClient haciendola igual a la propiedad MongoClient de la liberia mongodb.
// Con ObjetID nos va a permitir hacer nuevos id de iobjetos sobre la marcha. incluso si no estamos usando MongoDB como BD. nos va a permitir crear identificadores unicos
const {MongoClient, ObjectID} = require('mongodb');

// Creamos una nueva instancia de ObjectID
const obj = new ObjectID()
// Pitamos un nuevo ObjectID
console.log (obj)



/* Nos conectamos a Mongo con connect
1er argumento: string que es la url donde vive su bd
[protocolo]://[dominio]:[puerto]/[base de datos]

En mongodb no necesitamos crear antes la bd, esta se crean automaticamente al darle un nombre en la conexion si esta no existiera previamente. Mongo no va a crear la base de datos hasta que no comience a agregar datos en ella

2do argumento: callback function que se disparara despues de la coneccion, si se haya logrado o no
Si la conexion falla podemos escribir un mensaje, si la conexion es exitosa, podemos manipular la bd 
Esta funcion recibe 2 argumentos

    1er argumento: error
    2do argumento: objeto db que es el que podemos ejecuttar para escribir comandos de CRUD 
    2do argumento update: objeto client ue es el que podemos ejecuttar para escribir comandos de CRUD*/

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error) {
        /* El uso del return permite salir de la ejecucion de las demas lineas de codigo de la funcion y no continuar y detener el programa.
        Como alternativa al return se puede usar la clausula else{} */
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')

    // Obtenemos la referencia a la bd que estamos buscando
    const db = client.db('TodoApp')

    /* Creamos una coleccion Todos y le insertamos un documento con insertOne que tiene 2 argumentos
    1er argumento: objeto que va a representar a nuestro documento
    2do argumento: callback function que se va a disparar si las cosas van bien o mal
    Esta funcion recibe 2 argumentos
        1er argumento: error
        2do argumento: resultado que va a ser proporcionado si las cosas van bien */
    
    
    db.collection('Todos').insertOne({ 
        text: 'Something to do', 
        completed: false
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert todo', error);            
        }
        // En result.ops se almacenan todos los documentos que se insertaron
        console.log(JSON.stringify(result.ops, undefined, 2));
    })
    

    
    db.collection('Users').insertOne({
        name: 'Pierre',
        age: 30,
        location: 'Lima'
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert User', error);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));

        // Como result.ops es una matris de todos los elemntos que se crearon, podemos acceder a la propiedad __id del primer elemento de la siguiente forma:
        console.log(JSON.stringify(result.ops[0]._id, undefined, 2));

        // Con getTimestamp() se obtiene la marca de tiempo cuando fue creado un documento
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    })
    


    // Cierra la conexion al servidor de MongoDB
    client.close()
})
