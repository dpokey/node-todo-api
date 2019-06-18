

// Importamos los modelos
const {Todo} = require('../models/todo')

/* El siguiente ejemplo crea un enrutador como módulo, carga una función de middleware en él, define algunas rutas y monta el módulo del enrutador en una ruta en la aplicación principal. */

const express = require('express');
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Welcome Todos')
    next()
})

// Puede crear controladores de ruta para una ruta de acceso mediante el uso de app.route (). Debido a que la ruta se especifica en una sola ubicación, la creación de rutas modulares es útil, ya que reduce la redundancia y los errores tipográficos.
router.route('/')
    .get((req, res) => {
        res.send('ala')
    })
    .post((req, res) => {
        console.log(req.body);
        const todo = new Todo({
            text: req.body.text
        }).save().then((doc) => {
            res.send(doc)
        }, (error) => {
            res.status(400).send(error)
        })
    })

module.exports = router