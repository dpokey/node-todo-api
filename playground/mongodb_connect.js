const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }).then((client) => {
    console.log('Connected to MongoDB server')

    const db = client.db('db01')

    // drop db01
    db.dropDatabase().then(result => {
        console.log('db01 drop')
        // create db01 again
        const db = client.db('db01')

        // insert new collections
        db.collection('Collections').insertOne({ 
            text: 'Something to do'
        }, (error, result) => {
            if (error) {
                return console.log('Unable to insert collection', error);            
            }
            console.log(JSON.stringify(result.ops, undefined, 2));
        })

    },e => console.log(e))
})
