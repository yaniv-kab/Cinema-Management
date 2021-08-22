const express = require('express');
const cors = require('cors');
const app = express();

const userController = require('./controllers/userController');
const usersFileController = require('./controllers/usersFileController');
const permissionsFileController = require('./controllers/premissionsFileController')

require('./configs/dataBase');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


app.use('/api/users',userController);
app.use('/api/file/users',usersFileController);
app.use('/api/premissions',permissionsFileController)


app.listen(8001,console.log("server is Running on port 8001"))