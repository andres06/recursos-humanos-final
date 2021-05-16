const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const bcryptjs = require('bcryptjs');
const await = require('await');
const async = require('async');
const length = require('length');
const alert = require('alert');


const routes = require('./routes/index');
const { urlencoded } = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    console.log(`${req.url} -${req.method}`);
    next();
});

app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: 'recursoshumanos'
}, 'single'));

app.use(express.urlencoded({extended: false    
}));

app.use(express.json());

/*const dotenv = require('dotenv');
dotenv.config({path: './env/.env'});*/

const session =  require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/registro', async (req, res) => {
    const usuario = req.body.usuario;
    const nombre = req.body.nombre;
    const contraseña = req.body.contraseña;
    let passwordHaash = await bcryptjs.hash(contraseña, 8);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO login set ?', {usuario:usuario, nombre:nombre, contraseña:passwordHaash}, async (err, usuarios) => {
            if(err){
                console.log(error);
                }else{
                    res.render('login');
                   
                };
            });
        });
    });

    app.post('/auth', async (req, res) => {
        const usuario = req.body.usuario;
        const contraseña = req.body.contraseña;
        let passwordHaash = await bcryptjs.hash(contraseña, 8);
        if(usuario && contraseña){
            req.getConnection((err, conn) => {
                conn.query('SELECT * FROM login WHERE usuario = ?', [usuario], async (err, resultado) => {
                    if(resultado.length == 0 || !(await bcryptjs.compare(contraseña, resultado[0].contraseña))){
                        res.render('login');
                        }else{
                            res.redirect('/list');
            
                        };
                    });
                });
        }
        
        });



//routes
app.use(routes);

//static files
app.use(express.static(path.join(__dirname, 'public')));


app.listen(3000, () => console.log('Server is running'));

