const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'etoveto232',
        database: 'facerecognitionbrain'
    }
});

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => { console.log(res.send('success'))});
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)}); 
app.get('/profile/:id', (req, res) => { profile.getProfile(req, res, db)});
app.put('/image', (req, res) => { image.handleEntries(req, res, db)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})
