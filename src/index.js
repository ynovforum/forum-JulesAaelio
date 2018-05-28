const app = require('./utils/express.js');
const db = require('./utils/database');
const auth = require('./utils/auth');
const passport = require('./utils/auth').passport(db.User);
const authguard = require('./utils/auth-guard');

console.log("App started at " , new Date().toLocaleString());

//Init sessions
app.use(passport.initialize());
app.use(passport.session());

//Declare routes behaviors here
require('./utils/default')(app);
require('./utils/login.js')(app,auth,passport,db);
app.use('/question',require('./endpoints/question-anon')(db));
app.use('/question',authguard,require('./endpoints/question')(db));
require('./utils/errors')(app);

//Launch server
app.listen(process.env.SRV_PORT);
