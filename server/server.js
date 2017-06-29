const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const config = require('./config');
const pc = require('./controllers/profileCtrl');
const uc = require('./controllers/userCtrl');

const app = express();

// cors whitelist
var corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(bodyParser.json());
app.use(cors(corsOptions)); // this enables CORS across all origins based on the specified whitelist origins 
app.use(session({
    secret: config.sessionSecret
}));
// __dirname is a  node built in method that is the name of the directory our server is being run from. This just help to make srue the correct files are being served
app.use(express.static(__dirname + '/public')); // this will send all of our static front-end files from our server. We no longer need a live server

// ========== ENDPOINTS ===============
app.post('/api/login', uc.login);
app.get('/api/profiles', pc.getFriendsProfiles);


app.listen(3000, () => {
    console.log("Listening on port 3000");
});