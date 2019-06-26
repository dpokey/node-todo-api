// Importamos los modelos
const {Todo} = require('../models/todo')

// Importamos ObjectID para validar el id
const {ObjectID} = require('mongodb')

/* El siguiente ejemplo crea un enrutador como módulo, carga una función de middleware en él, define algunas rutas y monta el módulo del enrutador en una ruta en la aplicación principal. */
const express = require('express');
const router = express.Router()

const _ = require('lodash')

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
    .patch((req, res) => {
        const id = req.params.id
        // Crearemos una variable body
        // Aqui usaremos el metodo pick de la libreria lodash. 
        // Esto es debido a que el usuario podria enviar algunos parametros que no deseamos que ellos puedan actualizar, como por ejemplo la propiedad completed
        
        // 1er argumento: req.body (objeto a analizar)
        // 2do argumento: conjunto de propiedades que desea extraer de ese objeto
        // Metodo pick permite extraer (si existen) un conjunto de propiedades de un objeto, aqui estamos extrayendo las unicas propiedades que el usuario puede actualizar y asignandolo a un nuevo objeto body
        // pick en otras palabras, intercepta propiedades
        // la variable body tiene un subconjunto de cosas que el usuario paso a nosotros
        const body = _.pick(req.body, ['text', 'completed'])

        // Logica de validacion
        // Validamos si id es valido        
        if (!ObjectID.isValid(id)) {
            return res.status(404).send()
        }

        // Validamos body.completed
        if (_.isBoolean(body.completed) && body.completed) {
            // Aqui modificamos el nuevo objeto body que solo tiene lo que interceptamos
            // getTima() obtiene un sello de tiempo en javascript
            // Este es el numero de milisegundos desde la medianoche del 1er enero de 1970
            // Un valor en positivo, es el numero de milisegundos desde esa fecha y en negativo es en el pasado de esa fecha
            body.completedAt = new Date().getTime()
        } else {
            body.completed = false
            // cuando se desea borrar un valor de una propiedad en bd solo igualarla a null
            body.completedAt = null
        }

        // Actualizamos el documento
        // findByIdAndUpdate Permite encontrar un docuemnto por su id y actualizarlo
        // 1er argumento: es el filtro que se va a tener que cumplir para actualizar
        // 2do argumento: Son los cambios reales que se desean hacer. Aqui usamos los Mongo Update Operators. Existen varios operadores para actualizacion. 
        //      $set: Para establecer un campo de un valor dentro de un update
        //      $inc: Incremento de un valor de un campo
        // 3er argumento: opciones que se pueden definir: existen varias opciones
        //      new: lo establecemos en true para que no devuelva el documento original. sino el modificado
        // 4to argumento: es un callback function, pero se va a dejar de usar para usar las promesas como en los casos anteriores
        Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
            // validamos si no lo encuentra
            if (!todo) {
                return res.status(404).send()
            }

            res.send({todo})
        }).catch(e => res.status(404).send())
    })

module.exports = router