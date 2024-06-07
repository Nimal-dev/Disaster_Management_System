const express = require('express');
const db = require('./config/db');
var bodyParser = require('body-parser');
var cors = require('cors');
const session = require('express-session');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

const port = 4000;

const userRouter = require('./Routes/userRouter');
const adminRouter = require('./Routes/adminRouter');
const stateRouter = require('./Routes/stateRouter'); // Ensure this is the correct path
const volunteerRouter = require('./Routes/volunteerRouter');
const authRouter = require('./Routes/Router');

db();


app.get('/', (req, res) => { res.send('Loaded'); });
app.use('/state', stateRouter);
app.use('/admin', adminRouter);
app.use('/volunteer', volunteerRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);

app.listen(port, () => { console.log('Server Is Running'); });
