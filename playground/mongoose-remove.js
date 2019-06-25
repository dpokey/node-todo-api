// Importamos ObjectID de mongodb library para utilizar su metodo de validacion de id
const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// Metodo remove({}) Permite eliminar varios registros
// pero no se puede utilizar sin argumentos, obligatoriamente debe tener argumentos
// 1er argumento: indica filtro a tener en cuenta para eliminar
//      En caso se desee eliminar todos los docuemtnos de una coleccion se debe pasar un objeto vacio {}
// Update: Remove esta deprecado, ahora usar deleteMany(), si se desea eliminar todos los docuemntos de una coleccion no es necesario el objeto vacio
// result: contiene un objeto con los resultados del metodo remove/deleteMany y el numero de registros eliminados. { n: 5, ok: 1, deletedCount: 5 }

// Todo.deleteMany().then(result => {
//     console.log(result)
// })


// Metodo findOneAndRemove() Eliminara un documento que coincida con el filtro, pero adicionalmente devolvera ese documento eliminado. esto es la diferencia del metodo anterior, ya que en ese caso no se obtiene los documentos eliminados, apenas nos dice solo la cantidad de documentos eliminados
// 1er argumento: filtro

// Todo.findOneAndDelete({_id: '5d12992f223923040ca017ac'}).then(todo => {
//     console.log(todo)
// })

// Metodo findByIdAndDelete() Eliminara un documento y devolvera el documento eliminado, pero solo podra ser filtrado por su id. 
// 1er argumento: filtro id
// Ambos van a devolver el documento borrado

Todo.findByIdAndDelete('5d129930223923040ca017aa').then(todo => {
    console.log(todo)
})