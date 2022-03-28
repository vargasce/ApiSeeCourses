'use strict'

const session = require('../../Models/userSessionModel/userSessionModel');
const jwt = require('jsonwebtoken');
const JWT_secret = 'seecoursesentidad';

const sessionUser = {
	
	/** GET SESSION
	 * @Observations : Retorna una nueva session para el usuario.
	 * @param usuario : Object => objecto de datos del usuario.
	 * @returns Object : Objecto con datos de usuario mas token.
	 */ 
	getSession : ( usuario ) =>{

		const fecha = new Date();
		const millis = Date.parse(fecha)/1000;

		const payload = {
			check : true,
			obj : usuario,
			iat : millis
		};

		const token = jwt.sign( payload, JWT_secret, {
			expiresIn : 3600
		});

		return JSON.parse( JSON.stringify( new session.sessionModel(usuario, token) ) );

	},

	/** VALIDATE TOKEN
	 * @Observations : Decodifica el token con la llave maestra y retorna el callback
	 * para que se responsabilice quien invoco al metodo.
	 * @param token : String => code token
	 * @param res : callback return ( error, decode ).
	 */ 
	getUserValidete : ( token, response ) => {
		jwt.verify( token, JWT_secret, response );
	}

}

module.exports = sessionUser;
