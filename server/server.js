
// Objetivos: Nos Conectamos a BD, creamos un Modelo, guardamos ese modelo

// Importacion de Liberias
const express = require('express')
const dotenv = require('dotenv').config()

// Importacion de archivos locales
// Creamos por destructuring una variable moongose para requerir mongoose con la conexion
const {mongoose} = require('./db/mongoose')

// Importamos las rutas para cada modelo
const todos = require('./routes/todos')
const users = require('./routes/users')

// Creamos una nueva aplicacion
const app = express()

// Creamos una constante que almacene un puerto
app.set('port', process.env.PORT || 3000)

// Definimos un middleware que registra un log por cada peticion
app.use((req, res, next) => {
    // Creamos una variable now que almacena la hora, instanciamos al objeto Date y ejecutamos su metodo toString para que lo muestre en un formatolegible y la mostramos por consola. adicionalmente mostramos el metodo de la invocacion y la url solicitada
    let now = new Date().toString()
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    next()
})

// Definimos un middleware para que parse el body que vienen en un metodo post como un objeto JSON
app.use(express.json())

// Definimos los midleware que usaran las rutas definidas
// 1er argumento: ruta raiz por default. dentro del archivo ./routes/todos.js esta invocara a /
// 2do argumento: variable que almacena la ruta del archivo ./routes/todos.js
app.use('/todos', todos)

// Escuchamos en el puerto
app.listen(app.get('port'), () => {
    console.log(`Started on port ${app.get('port')}`)
})


/* Ejmplos Parte 1 : Guardamos directamente en la bd */
/* ============================================================== */

/* --------------------------------------------------------------
// Creamos un nuevo Todo con la funcion constructora. Estamos creando una nueva funcion constructora de Todo
// Toma un argumento que va a ser un objeto en el que podemos especificar alguna de estas propiedades
const newTodo = new Todo({
    text: 'Cook dinner'
})

// Guargamos en base de datos
newTodo.save().then((doc) => {
    // Al impimir el documento guardado, se observa que se agrega una propiedad _id y __v que es propio de mongoose y que indica la version del modelo, es decir que si el modelo se modifica, mongose lo detecta automaticamente y actualiza esa propiedad con nu nuevo nuemro de version. realiza el seguimiento de los diversos cambion del modelo a travez del tiempo  
    console.log('Saved Todo', doc);
}, (error) => {
    console.log('Unable to save Todo', error)
})

const newTodo2 = new Todo({
    text: 'Mother fucker',
    completed: true,
    completedAt: 15963
}).save().then((doc) => {
    console.log('Saved Todo2', doc);
}, (error) => {
    console.log('Unable to save Todo', error)
})

const newUser = new User({
    email: ''
}).save().then(doc => console.log('Saved User', doc), error => console.log('Unable to save User', error))
-------------------------------------------------------------- */

/* Ejmplos Parte 2 */
/* ============================================================== */

// Exportamos la app para poder utilizarla en el archivo server.test.js
module.exports = {app}
