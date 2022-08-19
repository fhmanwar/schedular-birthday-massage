const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./src/routes/route');
const handleError = require('./src/middlewares/errorHandler');
const config = require('./src/config');
const { getbirthDate } = require('./src/controllers/Birthdate');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/' , (req , res) => {
//     res.status(404).send({
//         code: 1,
//         message: "api path not found, add /api/ to use API",
//         data: [],
//    });
// });

app.use('/', getbirthDate);
app.use('/api/', routes);

app.use(handleError);

app.listen(config.port, config.host, () => {
    console.log(`REST API listening at http://${config.host}:${config.port}/ `);
});