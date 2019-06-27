const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }).then((client) => {
    console.log('Connected to MongoDB server')

    const db = client.db('dbName')

    // Here you can place your operations with the bd

    client.close();
}, e => console.log('Error to connect', e))

