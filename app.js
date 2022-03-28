'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const multiparty = require('connect-multiparty');
const middlewareAccess = require('./Middleware/Access/middleware.access');

console.log(`[+] Cargando rutas del sistema`);
const routes = require('./Routes/routes');

/** MIDDLEWARES JSON CONFIG
 * @Observations : Este middleware se utliza para toda la data ingresada al mismo
 * lo parsee a un objeto json.
 */ 
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use( multiparty() );
app.use( require('express-useragent').express() );

/** CONFIGURACION DE CORS **/
console.log('[+] Config CORS.');
app.use( ( req, res, next ) =>{
	res.header('Access-Control-Allow-Origin', '*'); //En una app real en lugar del * se deberia ingresar el url permitidas
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//VALIDO USUARIO
console.log('[+] Excecute middleware.');
app.use( middlewareAccess.controlAccessRoutes );

app.use('/api', routes);

module.exports = app;
