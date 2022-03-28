'use strict'

const usr = require('../../Custom/userSession/session');
const _loginService = require('../../Services/Login/login.service');
const log = require('../../Services/Log/log.service');
const dt = require('../../Custom/dates/dates');


const controller = {

	login : async ( req, res ) =>{
		
		switch( req.body.action ){ //ACCION
			
			case 'login' : 
				
				try{

					let resultLogin = await _loginService.login( req );
					let decode = usr.getSession( resultLogin );
					return res.status(200).send({ 'error' : '', 'Resultset' : decode });

				}catch( error ){
  			    	await log.addLog( { id : 0, descripcion : 'Error login', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : error } );
					return res.status(500).send({ 'error': `${error}` });
				}

			break;

			case 'loginAdmin' :

				try{

					let resultLoginAdmin = await _loginService.loginAdmin( req.body.data );
					let decode = usr.getSession( resultLoginAdmin );
					return res.status(200).send({ 'error' : '', 'Resultset' : decode });

				}catch( error ){
      			    await log.addLog( { id : 0, descripcion : 'Error loginAdmin', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : error } );
					return res.status(500).send({ 'error': `${error}` });
				}

			break;

			case 'close' : 

			break;

			default :
				return res.status(500).send({ 'error' : 'No se especifico ningun action para el controlador.' });
		}

	}

}

module.exports = controller;


/** ADD ACTIVE SESSION
 * @Observations : Añadimos estado activo al usuario que haya realizado el login satisfactorio.
 * @param req : Object => objecto request de la llamada.
 * @param decode : Object => objecto decodificado del usuario.
 */
const addDataSession = ( req, decode ) =>{
	
	let dataBrowser = {
		'browser' : req.useragent.browser,
		'plataform' : req.useragent.plataform,
		'os' : req.useragent.os,
		'version' : req.useragent.version,
		'id_profail_name' : decode.user.id,
		'active' : true
	}

	active.add( dataBrowser );

}
