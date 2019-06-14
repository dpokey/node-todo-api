const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error) {
        /* El uso del return permite salir de la ejecucion de las demas lineas de codigo de la funcion y no continuar y detener el programa.
        Como alternativa al return se puede usar la clausula else{} */
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')

    // Obtenemos la referencia a la bd que estamos buscando
    const db = client.db('TodoApp')

    // Consultamos todos los docuemntos de la colleccion Todos. Esta es una consulta sin filtro
    // find devuelve un cursor mongodb, este cursor no es en si los documentos reales.
    // el cursor tiene un monton de metodos que podemos utilizar para obtener nuestros docuemntos
    // toArray debuelve una matriz de los docuemntos, que tienen priopiedades. devuelve una promesa
    // Lo que significa que podemos añadir un metodo then para resolver la promesa
    // La funcion resolve de la promesa recibe un parametro que son los documentos obtenidos 
    
    // Ahora tenemos un codigo que va a ir a buscar los elementos de una coleccion, los va convertir en un array y los va a imprimir en pantalla
    db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos All');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (error) => {
        console.log('Unable to fetch todos', error);
    })

    // Consulta con filtro
    db.collection('Todos').find({completed: false}).toArray().then((docs) => {
        console.log('Todos Filter by property');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (error) => {
        console.log('Unable to fetch todos', error);
    })

    // Consulta con filtro _id Tenemos que llamar al constructor del ObjectID porque si lo colocamos como strig directo no funciona
    db.collection('Todos').find({_id: new ObjectID('5d0407ee19b9ed0aeebfe148')}).toArray().then((docs) => {
        console.log('Todos Filter by property');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (error) => {
        console.log('Unable to fetch todos', error);
    })

    /* =========================================== */

    // Usamos count en vez de toArray para contar los documentos de una coleccion
    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (error) => {
        console.log('Unable to count Todos', error);
    }) 

    /* =========================================== */

    // Consulta a coleccion User 
    db.collection('Users').find({name: 'Pierre'}).toArray().then((docs) => {
        console.log('Users filter');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (error) => {
        console.log('Unable to fetch Users', error);
    })
    client.close()
})