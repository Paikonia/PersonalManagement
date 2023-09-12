const express = require('express')
const graphqlExpress = require('express-graphql')
const app = express()

app.use(
  "/",
  graphqlExpress({
    graphiql: true,
  })
);

app.listen(5050, ()=> {

})

