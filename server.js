// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  if (process.env.WIP === 'true') {
    response.send('Very sorry, but I\'m updating MarkMe! for improving user experience. Sorry for the inconvenience!')
  } else {
    response.sendFile(__dirname + "/views/index.html");
  }
});

app.get("/dev", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
})

app.get("/help", (request, response) => {
  response.sendFile(__dirname + "/views/help.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
