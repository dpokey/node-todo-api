// Importamos ObjectID de mongodb library para utilizar su metodo de validacion de id
const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')
// Hacemos una variable para el _id
const id = '5d0d3a60572eb75408624d17'
const id2 = '5d0902bead2ae2427055ea23'

if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
}

// Metodo find te permite consultar todo lo que desees de la bd mongo
// 0ero argumento: trae todo
// 1er argumento: filtro
Todo.find({
    // mongoose es fantastico ya que no necesita que le pasemos el id creando el objectid como en ejemplos anteriores
    // directamente le puedes pasar el string que contiene el id 
    // mongoose lo convierte directamente a un objetid y luego ejecuta la consulta
    _id: id
}).then(todos => console.log('Todos', todos))

// Metodo findOne similar a find, la unica diferencia es que devuelve un documento como maximo
// es decir siempre agarra el primer documento que coincida con el filtro
// Se recomienda usar este metodo cuando se sabe que lo que se esta buscando es un solo docuemnto, ya que devuelve un solo objeto y no una matriz. Al igual que cuando no lo encuentra devuelve un  nulo y no una matriz vacia
Todo.findOne({
    _id: id
}).then(todo => console.log('Todo', todo))

// Metodo findById es fantastico cuando estas buscando un documento por su id
// no hay otra manera de preguntar por otra cosa que no sea su id
// Lo unico que tiene que hacer es pasar directamente el id
// Si se desea buscar UN documento que no sea por el id, usar el findOne
Todo.findById(id).then(todo => {
    // El problema con los metodos find es que si colocamos un id incorrecto, el resolve de la promesa igual se va a ejecutar
    // para solucionar eso, añadiremos un manejador
    // El if se ejecutara al no encontrar el id dentro de la coleccion
    if (!todo) {
        return console.log('Id not found');
    }
    console.log('Todo by Id', todo)
    // el catch se ejecutara al validar que el id es invalido (mayor cantidad de caracteres por ejemplo u otro tipo de objeto)
    // con esto se le dice al usuario que el id no solo no se encuentra en la coleccion, sino que tambien es invalido
}).catch(e => console.log(e))

/* ================================================= */

User.findById(id2).then(user => {
    if (!user) {
        return console.log('Unable to find User');
    }
    console.log('User by Id', user)
}).catch(e => console.log(e))


