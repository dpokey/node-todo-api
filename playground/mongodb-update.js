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

    // findOneAndUpdate Permite encontrar un docuemnto y actualizarlo
    // 1er argumento: es el filtro que se va a tener que cumplir para actualizar
    // 2do argumento: Son los cambios reales que se desean hacer. Aqui usamos los Mongo Update Operators. Existen varios operadores para actualizacion. 
    //      $set: Para establecer un campo de un valor dentro de un update
    //      $inc: Incremento de un valor de un campo
    // 3er argumento: opciones que se pueden definir: existen varias opciones
    //      returnOriginal: lo establecemos en false para que no devuelva el documento original. sino el modificado
    // 4to argumento: es un callback function, pero se va a dejar de usar para usar las promesas como en los casos anteriores
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5d040584cde1af32e4c2cf80')
    }, {
            $set: {completed: true}
    }, {
            returnOriginal: false
    }).then((result) => {
        // El objeto result tiene el documento actualizado y si todo salio ok
        console.log(result)
    }, (error) => {
        console.log('Unable to apdate Todos', error);
    })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5d040584cde1af32e4c2cf81')
    }, {
        $set: {name: 'Natalie'},
        $inc: {age: -8}
    }, {
        returnOriginal: false
    }).then((result) => {
        // El objeto result tiene el documento actualizado y si todo salio ok
        console.log(result)
    }, (error) => {
        console.log('Unable to apdate Todos', error);
    })


    client.close()
})

