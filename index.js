'user strict'

const app = require('./app');
const envProperties = require("./env.vars.json");
const node_env = process.env.NODE_ENV || 'developmen';
const props = envProperties[node_env];
const port = props.PORT;
const host = props.URL;
const http = require('http');

process.env.DB = props.DB;
process.env.timeHora = props.updateFinalizadosTime.hora;
process.env.timeMinutos = props.updateFinalizadosTime.minutos;
const _processService = require('./Services/Process/process');


function createServer (){
	http.Server = app.listen(port,host, ()=>{
		console.log( `[+] Config hour Process => ${process.env.timeHora } : ${process.env.timeMinutos}`);
		console.log(`[+] Service "Billing" run, enter next address => Url : http://${host}:${port}/api`);
		_processService.start();
	});
	return http.Server;
}

createServer();

