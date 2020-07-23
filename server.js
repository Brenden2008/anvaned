// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const session = require('express-session');
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

async function getAccessToken(code, client_id, client_secret) {
  const request = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code
    })
  });
  const text = await request.text();
  console.log("RESPONSE!!!");
  console.log(text);
  const params = new URLSearchParams(text);
  return params.get("access_token");
};

async function fetchGitHubUser(token) {
  const request = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: "token " + token
    }
  });
  return await request.json();
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/", (request, response) => {
  if (process.env.WIP === 'true') {
    response.send('Very sorry, but I\'m updating MarkMe! for improving user experience. Sorry for the inconvenience!')
  } else {
    response.render(__dirname + "/views/index.ejs");
  }
});

app.get("/login/github", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user%20public_repo`
  );
});

app.get("/login/github/callback", async (req, res) => {
  const code = req.query.code;
  const access_token = await getAccessToken(code, clientID, clientSecret);
  console.log(access_token);
  req.session.token = access_token;
  const user = await fetchGitHubUser(access_token);
  
  if (user) {
    req.session.access_token = access_token;
    req.session.github = user;
    req.session.githubId = user.id;
    req.session.loggedin = true;
    req.session.username = user.login;
    res.redirect("/home");
  } else {
    res.send("Login did not succeed!");
  }
});

app.get("/dev", (req, res) => {
  res.render(__dirname + "/views/index.ejs");
})

app.get("/help", (request, response) => {
  response.sendFile(__dirname + "/views/help.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
