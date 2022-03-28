'use strict'

const usr = require('../../Custom/userSession/session');

class MiddleWare{

    constructor(){}

    /** MIDDLEWARE CONTROL DE TOKEN
     * @Observations => Realiza control sobre las rutas indicadas para validar correcto token.
     * @param { obeject } req => Request api 
     * @param { object } res => Response api
     * @param { object } next => Next api
     * @returns {*} => Resonse response error or next.
     */
    controlAccessRoutes( req, res, next ){

        let urlCurrent = req.originalUrl;
        let token = req.body.token ? req.body.token : null;

        if( urlCurrent == '/api/administrador' ){
            if( token ){
                usr.getUserValidete( token, ( error, decode ) => {
                    if( !decode ){
                       return res.status(403).send({ 'error' : `Error validando token => token no valido` });
                    }
                });
            }
        }

       /* 
        if( urlCurrent == '/api/notificacion' ){
            let action = req.body.action;
            if( action == 'addNotificacion' ){
                usr.getUserValidete( token, ( error, decode ) => {
                    if( !decode ){
                       return res.status(403).send({ 'error' : `Error validando token => token no valido` });
                    }
                });
            }
        }
        */
        if( urlCurrent == '/api/itinerario'){
            let action = req.body.action;
            if( action == 'addItinerario' || action == 'updateItinerario' ){
                usr.getUserValidete( token, ( error, decode ) => {
                    if( !decode ){
                        return res.status(403).send({ 'error' : `Error validando token => token no valido` });
                    }
                });
            }
        }

        next();
    }

}

module.exports = new MiddleWare() ;