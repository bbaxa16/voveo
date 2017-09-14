//dependencies
const express = require('express');
const app     = express();
const port    = process.env.PORT || 2080;


//middleware
app.use(express.static('public'));

//listener
app.listen(port, ()=> {
  console.log('listening bruh');
})
