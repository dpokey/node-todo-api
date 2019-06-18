
// Requerimos mongoose 
const mongoose = require('mongoose')

// Creamos un objeto schema que define la estructura del modelo
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})

// Creamos un modelo
// 1er argumento: Es el nombre de la coleccion en plural que va a coincidir con el nombe de la variable 
// 2do argumento: Objeto Schema que va a definir las propiedades para el modelo, y dentro de las propiedades se van a definir un objeto que va a contener las diferentes opciones disponibles que deseamos especificar o validar
const User = mongoose.model('Users', userSchema)

module.exports = {User}