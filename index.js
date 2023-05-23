const express = require('express')
const morgan = require('morgan')
const helmetMiddleware = require('./config/helmet');
const cors = require('./config/cors');
const connectDB = require('./config/database');
const bodyParserMiddleware = require('./config/bodyParser');
const indexRoutes = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

app.use(bodyParserMiddleware);
app.use(helmetMiddleware);
app.use(cors);
app.use(morgan('combined'))
app.use("/uploads", express.static("uploads"));

connectDB();

app.use('/', indexRoutes)
app.use('/users', usersRouter)

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

module.exports = server;
