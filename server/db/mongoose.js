
// Requerimos la libreria mongoose
const mongoose = require('mongoose');

// Somilar a la conexion con MongoClient, nos conectamos a la bd
// 1er argumento: cadena de conexion
// 2do argumento: { useNewUrlParser: true } indica que utilice el nuevo anilizador de url de mongo
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true })

// Exportamos mongoose con su nueva cofiguracion de conexion
module.exports = {mongoose}