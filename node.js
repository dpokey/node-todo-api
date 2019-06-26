/* MONGO DB */
/* 
    El ejecutable mongod pondra en marcha el servidor de base de datos
    y nos permitira conectarnos al servidor

    mongod --dbpath <ruta_donde_almacena_data>
    Para iniciar el servidor de mongo y establecer la ruta donde se almacenara la data, este inicia por defecto en el puerto 27017

    mongo
    Abrimos una consola que se conecta a la base de datos

    db.Todos.insert({text: 'Film new node course'})
    Para insertar un nuevo documento en la coleccion Todos
    Esto devuelve la cantidad de valores insertados

    db.Todos.find()
    Para devolver todas las colecciones los documentos dela coleccion Todos
    _id es un identificador unico para cada registro

    En NoSQL una Coleccion es una tabla de SQL
    En NoSQL un Documento es un registro/fila de SQL
    En NoSQL una propiedad del docuemnto es una Columna SQL

    En NoSQL todos los documentos no tienen las mismas propiedades
    En SQL todos los registros obligatoriamente tienen las mismas columnas
    Regularmente todos los documentos de una coleccion tienen las mismas propiedades
    Cuando se unan diferentes propiedades tiene valor porque se esta haciendo mineria de datos

*/

/* RObo Mongo */
/* 
    Es un IDE de administracion de BD Mongo
*/

/* Mongo DB Native Library */
/* 
    Es la biblioteca nativa de mongo que nos permitira conectarnos desde node a mongo

    Mongo client es lo que le permite coenctarse a mongo server y ejecutar comenados

    id Object
    No es incremental, es aleatorio. esto debido a que mongo fue construido para crecer de manera horizontal
    Es de 12 bytes
    4 primeros son un sello de tiempo en el qu fue creado
    3 segundos son un identificador de la maquina
    2 terceros son un identificador del proceso
    3 cuartos son un contador similar al incremental de SQL

    MongoDB crea por defecto los identificadores, pero nosotros tambien lo podemos especificar al momento de crear el documento especificando la propiedad __id:

*/

/* Mongoose */
/* 
    Mapeo Relacional
    Hace que sea mas facil estructurar los datos
    Permite hacer ciertos tipos de vallidacion pa usuarios, validacion de contraseñas.

    Mongoose mantiene la conxion atravez del tiempo
    Nunca va a realizar un query a la db antes de realizar la conexion a ella. esto lo hace poderoso ya que se encarga del orden de las ejecuciones 

    Mongoose Validators
    ----------------------
    Permite hacer validaciones en el esquema del modelo definido
    - Si un valor es requerido
    - La longitud maxima y minima de un numero o cadena
*/

/* Postman */
/* 

*/

/* Bobyparse Library */
/* 
    Es una libreria de JS que analiza el body de una solicitud post y la convierte en un objeto JSON
    En la nueva version de express >=4.16.0 se puede usar directamente express.json() sin necesidad de instalar el body parser
*/

/* Router */
/* 
    Una Routerinstancia es un sistema completo de middleware y enrutamiento; por esta razón, a menudo se lo conoce como una "mini-aplicación".
*/

/* A tener en cuenta para configurar en HEROKU */
/* 
    En package.json se debe indicar mediante start, como heroku va a iniciar nuestra aplicacion

    "scripts": {
        "start": "node server/server.js",
    }

    Tambien se debe indicar la version de node que va a ultizar para ejecutar nuestro proyecto

    "engines": {
        "node": "10.11.0"
    }

    Por consola:
    
    heroku create
    Creamos una aplicacion en heroku

    ------------------------------------------------------
    heroku addons:create mongolab:sandbox
    Agregamos el complemento para usar un mongodb hosteado en heroku
    mongolab: es el nombre del complemento a instalar
    sandbox: es el plan que deseamos usar (gratis)

    heroku config
    Para obtener todas las variables de configuracion de su aplicacion en heroku
    ------------------------------------------------------
    
    /* Libreria dotenv */
    
    /*
    Esto lo vamos a remplazar usando el modulo dotenv, el cual nos permite configurar un archivo en la raiz del proyecto .env donde colocaremos todas las variables de entorno

    Luego en el archivo .gitignore vamos a agregar el archivo .env para que no sea considerado para ser enviado a github

    El objetivo de esto es que las variables de entorno que contienen nuestros password, cadenas de conexion, claves API, no sean expuestas en un repositorio remoto

    ------------------------------------------------------

    El addon anterior creo una variable MONGODB_UNI que se va a utilizar en el archivo mongoose.js para establecer la conexion
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }).then((connect) => {
        console.log('Database connect: ')
    }).catch(e => console.log('Database error connect: ', e))

    git push heroku master
    Para confirmar los cambios
    
    heroku logs
    Muestra los logs de su aplicacion en heroku

    heroku open
    Para abrir la url donde esta delplegada nuestra aplicacion de heroku
*/

/* ¿Como configurar variable de entorno en heroku? */
/* 
    https://devcenter.heroku.com/articles/config-vars
    https://es.stackoverflow.com/questions/200261/como-configurar-variable-de-entorno-en-heroku

    Heroku te permite desde la terminal de linux ejecutar mas funcionalidades puedes visualizarla te invito a ejecutar el siguiente comando
    heroku help

    Para configurar las variable de entorno de nuestro proyecto en heroku, sigue los sigientes pasos:

    Inicia tu logeo de tu cuenta y ingresa tus credenciales con
    heroku login
    
    Te ubicas sobre tu proyecto o te clonas si no lo tienes
    cd <Tu Proyecto> ó heroku git clone https://git.heroku.com/<Tu Proyecto>.git && cd <Tu Proyecto>
    
    ya listo para la configuracion de las variables de entorno
    heroku config:set DB_HOST='escribe-tu-host' 
    heroku config:set DB_USER='escribe-tu-user' 
    heroku config:set DB_PASS='escribe-tu-pass' 
    heroku config:set DB_NAME='escribe-tu-name' 
    heroku config:set DB_CHARSET='escribe-tu-charset'
    
    para ver los valores asignado a las variable solo con
    heroku config:get DB_HOST
    
    para remover los valores asignado a las variable solo con
    heroku config:unset DB_HOST

    Adicional a esto si quieres ver todas las variables que tienes configuradas lo puedes ver con
    heroku run printenv
    
    con heroku run tu puedes ejecutar cualquier comando en el alojamiento de heroku y capturando la salida en tu terminal muy util para cualquier necesidad.
*/
/* lodash library */
/* 
    
*/