const express = require('express')
require('dotenv').config()
const schema = require('./Schema/Schema')
const {graphqlHTTP} = require('express-graphql');
const connectDatabase = require('./Database')
const cors = require('cors')

const port = process.env.PORT || 8000;

const app = express();

connectDatabase()

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development',
  }));

app.listen(port, console.log(`server started on ${port}`))