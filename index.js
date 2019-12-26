const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
var path = require('path');
// Import the axios library, to make HTTP requests
const axios = require('axios');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended : true
}));
app.use(express.static(path.join(__dirname,'/public')));
// This is the client ID and client secret that you obtained
// while registering the application
const clientID = '87995a6d87e3f5107687';
const clientSecret = '9432755d4c61ac47cc1bfafa3c6dbe20fa598d4d';

// Declare the redirect route

app.get('/dashboard', (req, res) => {
  // The req.query object has the query params that were sent to this route.
  const requestToken = req.query.code;
  axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      headers: {
          accept: 'application/json'
      }
  }).then((response) => {
        const access_token = response.data.access_token;
        console.log(response.data);
        // redirect the user to the home page, along with the access token
        res.redirect(`/dashboard.html?access_token=${access_token}`);
  })
})

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port port!`))