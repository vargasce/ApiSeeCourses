'use strict'

const { QueryAwait } = require('../../DB-connect/connectDB');
const logModel = require('../../Models/log/log.model');
const fn = require('../../Custom/function_custom/custom');
const logError = require('../../Error/Log/log.error');

class LogSistem{

    constructor(){}

    /** INSERT NEW LOG SYSTEM
     * @Observations => Insertar registro de sistema.
     * @param { object } data => Datos del registro.
     * @return { Promise } => return new promise.
     */
    async addLog( data ){
        return new Promise( async ( resolve, reject ) =>{

            try{
                fn.validateType('object', data);
            }catch( err ){
                reject( err );
            }
            
            let model = new logModel( data );
            let sql = model.insertSqlString();

            try{
                await QueryAwait('BEGIN');
                let result = await QueryAwait( sql );
                let ok = await QueryAwait('COMMIT');
                if( ok ) resolve( result.rows );
            }catch( err ){
                await QueryAwait('CALLBACK');
                throw err;
                //reject( new logError('Error log', `Error la insertar log del sistema : ${err}`));
            }

        });
    }

}

module.exports = new LogSistem();