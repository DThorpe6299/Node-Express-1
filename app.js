const express = require('express');
const app = express(); // line 2 should use the 'const' keyword not 'var'
const routes = require('./routes');
const ExpressError = require("./expressError")

app.use(express.json());
app.use('/', routes)


app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});

app.use((err,req,res,next)=>{
  res.status(err.status || 500);

  return res.json({
      error: err.message,
    });
})


// the route(s) should be in a routes.js file so that app.js does not get cluttered.

// we apply the router to all routes with app.use


module.exports = app;
//app.listen should be in its own server.js file with app being imported.