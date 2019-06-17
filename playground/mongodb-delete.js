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

    // Existen varios metodos para eliminar

    // deleteMany para eliminar muchos documentos a la vez
    // 1er argumento: es el filtro que se va a tener que cumplir para borrar
    // Regularmente no tiene mucho valor usar la promesa en este metodo a menos se desee saber el numero de registros eliminados o desea validar si hay errores

    db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
        // El objeto result tiene la cantidad de registros eliminados y si todo salio ok
        console.log(result);
    }, (error) => {
        console.log('Unable to delete Many Todos');
    })

    // deleteOne para eliminar un documento especifico
    // este metodo a pesar de que varios documentos cumplan el filtro, solo borra el primero
    // 1er argumento: es el filtro que se va a tener que cumplir para borrar
    // Regularmente no tiene mucho valor usar la promesa en este metodo a menos se desee saber el numero de registros eliminados o desea validar si hay errores
    db.collection('Todos').deleteOne({text: 'Eat lunch one'}).then((result) => {
        // El objeto result tiene la cantidad de registros eliminados y si todo salio ok
        console.log(result);
    }, (error) => {
        console.log('Unable to delete One Todos');
    })
    
    // findOneAndDelete para eliminar un docuemnto, pero tambien devuelve el docuemnto borrado
    // este metodo a pesar de que varios documentos cumplan el filtro, solo borra el primero
    // Se puede usar cuando se desea deshacer los cambios
    // 1er argumento: es el filtro que se va a tener que cumplir para borrar
    // Regularmente SI tiene mucho valor usar la promesa en este metodo porque te devuelve el elemento eliminado
    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        // El objeto result tiene el objeto real que hemos borrado y si todo salio ok y astErrorObject indica el numero de documentos que se han eliminado
        console.log(result);
    }, (error) => {
        console.log('Unable to delete One Find Todos');
    })


    client.close()
})

