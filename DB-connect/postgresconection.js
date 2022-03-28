'use strict'

const envProperties = require("../env.vars.json");
const node_env = process.env.NODE_ENV || 'developmen';
const props = envProperties[node_env];
const { Client } = require('pg');

/** CONF DATA BASE **/
const data_conf = {
	host: props.DB.HOST,
	user: props.DB.USER,
	password: props.DB.PASS,
	database: props.DB.DATA_BASE,
	port: props.DB.PORT
};

/** CLOUSTER **/
const conectionDB = ( function () {
	
	let _instanceDB;

	function init(){
	
		let _con;
		try{
			_con = new Client(data_conf);
			_con.connect();
		}catch( error ){
			throw "Parametros de conexion incorrectos !!!";
		}

		return {
			request : function (){
				return _con;
			},
			close : function (){
				_con.end();
			}
		}
	}

	return {
		getInstance : function(){

			if( !_instanceDB ){
				_instanceDB = init();
			}

			return _instanceDB;
		}
	}

})();

module.exports = {
	conectionDB : conectionDB
}
