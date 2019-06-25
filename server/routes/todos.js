// Importamos los modelos
const {Todo} = require('../models/todo')

// Importamos ObjectID para validar el id
const {ObjectID} = require('mongodb')

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
        // Especificamos el metodo find() sin parametros, para que nos traiga todos los documentos
        Todo.find().then((todos) => {
            // Podriams especificar res.send(todos), pero de esta forma se enviaria un array de los elementos
            // La mejor forma es enviar un objeto, al cual mas adelante le podriamos agregar mas datos, como el codigo de estado de respuesta, etc, etc
            res.send({todos})
        },(error) => {
            res.status(400).send(error)
        })
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

router.route('/:id')
    .get((req, res) => {
        const id = req.params.id

        // Validamos si id es valido
        if (!ObjectID.isValid(id)) {
            return res.status(404).send()
        }

        Todo.findById(id).then(todo => {
            // Validamos si id coincide con algun documento
            // Esto se realiza ya que si el id es valido pero no se encuentra, el metodo findById igual se ejecuta y no envia error, sino devuelve un null
            if (!todo) {
                return res.status(404).send()
            }
            res.send({todo})
            //catch capturara errores potenciales             
        }).catch(e => {
            console.log(e)
            res.status(400).send()
        })
    })
    .delete((req, res) => {
        const id = req.params.id

        // Validamos si id es valido        
        if (!ObjectID.isValid(id)) {
            return res.status(404).send()
        }

        Todo.findByIdAndDelete(id).then(todo => {
            // Esto se realiza ya que si el id es valido pero no se encuentra, el metodo findByIdAndDelete igual se ejecuta y no envia error, sino devuelve un null
            if (!todo) {
                return res.status(404).send()
            }
            res.send({todo})
            //catch capturara errores potenciales 
        }).catch(e => {
            console.log(e)
            res.status(400).send()
        })
    })

module.exports = router