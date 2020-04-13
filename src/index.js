const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
//initializations
const app = express()
require('./database')
//settings
app.set('port', process.env.PORT || 4000)
app.set('views',path.join(__dirname,'views'))
app.engine('.hbs', exphbs({
    defaultLayout: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//middlewares
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))
//global variables

//routes
app.use(require('./routes/index'))
app.use(require('./routes/users'))
app.use(require('./routes/notes'))

app.get('*',(req, res) => {
    res.status(404).send('the route not exists')
})
//static files
app.use(express.static(path.join(__dirname,'public')))


app.listen(app.get('port'), () => {
    console.log('server is running on port', app.get('port'));
    
})