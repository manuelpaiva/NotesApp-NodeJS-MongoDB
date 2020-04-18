const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

//initializations
const app = express()
require('./database')
require('./config/passport')

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session())
app.use(flash())

//global variables
app.use((req, res, next) => {
    app.locals.success_msg = req.flash('success_msg')
    app.locals.error_msg = req.flash('error_msg')
    app.locals.error = req.flash('error')
    next()
})
//routes
app.use(require('./routes/index'))
app.use(require('./routes/users'))
app.use(require('./routes/notes'))

app.get('*',(req, res) => {
    res.status(404).send('the route not exists')
})
// static files
app.use(express.static(path.join(__dirname, 'public')))



app.listen(app.get('port'), () => {
    console.log('server is running on port', app.get('port'));
    
})