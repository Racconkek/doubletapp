const path = require('path');

const config = require('config');
const express = require('express');
// const mongodb = require('mongodb');
const mongoose = require('mongoose');

const routes = require('./routes.js');

const publicDir = path.join(__dirname, 'public');
if (config.get('debug')) {
    console.log(publicDir);
}

const uri = 'mongodb+srv://' + config.get('dbUsername') +
    ':' + config.get('dbPassword') + '@studentscluster.yqasi.gcp.mongodb.net/' +
    config.get('dbName') + '?retryWrites=true&w=majority';

// const mongoClient = new mongodb.MongoClient(uri, {useUnifiedTopology: true});
const app = express();
app.use(express.static(publicDir));

routes(app);

app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.sendStatus(500);
});

// mongoClient.connect((err, client) => {
//     if (err) {
//         return console.log(err);
//     }
//
//     app.locals.students = client.db(config.get('dbName')).collection('Students');
//     app.locals.specialties = client.db(config.get('dbName')).collection('Specialties');
//     const port = config.get('port');
//     app.listen(port, () => {
//         console.log(`Server started on ${port}`);
//     });
// });

mongoose.connect(uri, {useUnifiedTopology: true}, err => {
    if (err) {
        return console.log(err);
    }

    const port = config.get('port');
    app.listen(port, () => {
        console.log(`Server started on ${port}`);
    });
});
