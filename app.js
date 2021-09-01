const express = require("express");
const app = express();
require('dotenv').config()
const path = require('path')
const PORT = process.env.PORT || 5000;

// initiate DB
require('./database')

// just for testing 
app.use((req, res, next) => {
  console.log("url - ", req.url,"\tIp -", req.ip)
  next()
});

// ############ middlewares ################
app.use(express.json());
app.use("/routes/auth",require("./routes/auth"));
app.use("/routes/post",require("./routes/post"));
app.use("/routes/user",require("./routes/user"));
// #########################################


if (process.env.NODE_ENV == "production") {
  app.use(express.static('client/build'))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}



//The 404 Route final error pages ################
app.route('*')
  .get((req, res) => {
    console.log('404 page open');
    res.status(404).send(`<h1>Page not found 404 </h1>`);
  })
  .post((req, res) => {
    console.log('404 page open');
    res.status(404).send(`<h1>Page not found 404 </h1>`);
  })


app.listen(PORT, () => {
  console.log(`server is running on http://127.0.0.1:${PORT}`);
});
