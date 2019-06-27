// Requerimos la libreria mongoose
const mongoose = require('mongoose')

// Somilar a la conexion con MongoClient, nos conectamos a la bd
// 1er argumento: cadena de conexion
// 2do argumento: { useNewUrlParser: true } indica que utilice el nuevo anilizador de url de mongo
// 2do argumento: { useFindAndModify: false } indica que el findOneAndUpdate() de mongoose utilice el nuevo metodo findOneAndUpdate() del controlador MongoDB y no el findAndModify() del controlador MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true, useFindAndModify: false }).then((connect) => {
    console.log('Database connect: ', connect)
}).catch(e => console.log('Database error connect: ', e))

// Exportamos mongoose con su nueva cofiguracion de conexion
module.exports = {mongoose}