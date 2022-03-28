'use strict'

const con = require('../../DB-connect/connectDB');
const usr = require('../userSession/session');
const date = require('../dates/dates');

/** LOG SYSTEM
 * @Observations : Funcion log realiza la carga de log del sistema para el manejo 
 * de modulos delicado de la aplicacion.
 *
 * @param message : String => Mensage custom por el cual se realiza el log.
 * @param functionUrl : String => funcion donde se realiza la accion.
 * @param token : String => token del usuario que realiza la accionm
 */ 
const addLog = ( message, functionUrl, token  ) =>{

	usr.getUserValidete( token, ( error, decode ) =>{

		if( decode ){
			let sql = `INSERT INTO log ( id_profile_name, function_action, loading_date, loading_hour, observations ) VALUES (
																	 ${decode.obj.id},
																	 '${functionUrl}',
																	 '${date.getDateCurrentStringCustom()}',
																	 '${date.getHourMinuteCurrent()}',
																	 '${message}'
																	);`;

			con.insert( sql, ( error, result ) =>{
				if( error ){
					console.log(`Error insert log : ${error} : ${result}`);
				}
			});

		}else{
			console.log(`Error in Session function log : ${error}`);
		}

	});
}

module.exports = addLog;
