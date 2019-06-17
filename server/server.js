
// Objetivos: Nos Conectamos a BD, creamos un Modelo, guardamos ese modelo

// Requerimos la libreria mongoose
const mongoose = require('mongoose');

// Somilar a la conexion con MongoClient, nos conectamos a la bd
// 1er argumento: cadena de conexion
// 2do argumento: { useNewUrlParser: true } indica que utilice el nuevo anilizador de url de mongo
mongoose.connect('mongodb://localhost:27017/TodoApp')

// Creamos un modelo
// 1er argumento: Es el nombre de la cadena que voy a coincidir con el nombe de la variable
// 2do argumento: Objeto Schema que va a definir las propiedades para el modelo, y dentro de las propiedades se van a definir un objeto que va a contener las diferentes opciones disponibles que deseamos especificar o validar
const Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
})

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