const mongoose = require('mongoose');

const URI = process.env.URI
    ? process.env.URI
    : 'mongodb://localhost:27017/test';

console.log(URI);

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.on('open', _ => {
    console.log('Database is Connected to ', URI);
});

db.on('error', _ => {
    console.log(err);
});
