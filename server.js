const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelizeStore = require('sequelizeStore')(sequelize.Store);
const helpers =  require('helpers');


const routes = require('./');
const sequelize = require('./');


const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// function used for the middleware
const sess = {
    secret: 'Secret Tech Blog',
    cookie: {},
    resave: false,
    store: new sequelizeStore({
        db: sequelize
    })
};

// sets up the express application 
app.use(session(sess));

// renders the HTML using express handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// Sends the message that the port is active and is working on 3001
app.listen(PORT, () => {
    console.log(`App is listening of port ${PORT}`);
    sequelize.sync({ force: false });
})
