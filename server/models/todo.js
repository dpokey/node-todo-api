
// Requerimos mongoose 
const mongoose = require('mongoose')

// Creamos un objeto schema que define la estructura del modelo
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        // Valor requerido obligatorio
        required: true,
        // minimo de caracteres
        minlength: 1,
        // Elimina espacios en blanco al inicio y al final
        trim: true
    },
    completed: {
        type: Boolean,
        // Para establecer un valor por defecto
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
})

// Creamos un modelo
// 1er argumento: Es el nombre de la coleccion en plural que va a coincidir con el nombe de la variable 
// 2do argumento: Objeto Schema que va a definir las propiedades para el modelo, y dentro de las propiedades se van a definir un objeto que va a contener las diferentes opciones disponibles que deseamos especificar o validar
const Todo = mongoose.model('Todos', todoSchema)

module.exports= {Todo}