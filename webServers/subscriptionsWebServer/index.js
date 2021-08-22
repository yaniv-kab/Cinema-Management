const express = require('express');
const cors = require('cors')
const app = express();
const mebmersBL = require('./models/allBL/membersBL')
const moviesBL = require('./models/allBL/moviesBL')
const memberController = require('./controllers/memberController')
const movieController = require('./controllers/moviesController')
const subscriptionController = require('./controllers/subscriptionController')
require('./configs/dataBase')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/subscriptions', subscriptionController)
app.use('/api/members', memberController);
app.use('/api/movies', movieController);


app.listen(8000, () => {
    //mebmersBL.shapedMembers()
    //moviesBL.shapedMovies()
    console.log("server is running on port 8000");
});