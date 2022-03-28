'use strict'

const con = require('../../DB-connect/connectDB');
const actividadModel = require('../../Models/actividad/actividad.model');
const actividadError = require('../../Error/Actividad/actividad.error');

class ActividadService{

    constructor(){}

    /** ADD NEW PROMISE
     * @Observations => Insertar nueva actividad.
     * @param { Object } data => Datos a insertar.
     * @returns { Promise } => new promise.
     */
    async addActividad( data ){
        return new Promise( async ( resolve, reject) =>{

            try{

                let actModel = new actividadModel( data );                        
                let sqlAddActividad = actModel.getSqlAddActividad();

                await con.QueryAwait('BEGIN');
                let resultAdd = con.QueryAwait( sqlAddActividad );
                let ok = await con.QueryAwait('COMMIT');
                if( ok ) resolve( resultAdd );

            }catch( err ){
                await con.QueryAwait('ROLLBACK');
                reject( new actividadError( 'Error Actividad', `Error : ${err}`));
            }
        });
    }

    /** UPDATE ACTIVIDAD
     * @Observations => Update actividad.
     * @param { Object } data => Datos a insertar.
     * @returns { Promise } => new promise.
     */
    async updateActividad( data ){
        return new Promise( async ( resolve, reject) =>{

            let actModel = new actividadModel( data );            
            let sqlUpdateActividad = actModel.getSqlUpdateActividad();

            try{

                await con.QueryAwait('BEGIN');
                let resultAdd = con.QueryAwait( sqlUpdateActividad );
                let ok = await con.QueryAwait('COMMIT');
                if( ok ) resolve( resultAdd );

            }catch( err ){
                await con.QueryAwait('ROLLBACK');
                reject( new actividadError( 'Error Actividad', `Error : ${err}`));
            }
        });
    }

    /** GET ACTIVIDAD ID
     * @Observations => Get actividad.
     * @param { number } id => Identificador
     * @returns { Promise } => new promise.
     */
    async getActividadById( id ){
        return new Promise( async ( resolve, reject) =>{

            let actModel = new actividadModel( id );            
            let sqlGetById = actModel.getSqlByIdActividad(id);

            try{

                await con.QueryAwait('BEGIN');
                let resultAdd = con.QueryAwait( sqlGetById );
                let ok = await con.QueryAwait('COMMIT');
                if( ok ) resolve( resultAdd );

            }catch( err ){
                await con.QueryAwait('ROLLBACK');
                reject( new actividadError( 'Error Actividad', `Error : ${err}`));
            }
        });
    }

    /** GET ACTIVIDAD
     * @Observations => Get actividad.
     * @returns { Promise } => new promise.
     */
    async getListActividad(){
        return new Promise( async ( resolve, reject) =>{

            try{

                let actModel = new actividadModel();            
                let sqlGetList = actModel.getSqlListActividad();

                await con.QueryAwait('BEGIN');
                let resultAdd = con.QueryAwait( sqlGetList );
                let ok = await con.QueryAwait('COMMIT');
                if( ok ) resolve( resultAdd );

            }catch( err ){
                await con.QueryAwait('ROLLBACK');
                reject( new actividadError( 'Error Actividad', `Error : ${err}`));
            }
        });
    }

    /** DELETE ACTIVIDAD
     * @Observations => Delete actividad.
     * @param { number } id => Identificado de tupla a eliminar.
     * @returns { Promise } => new promise.
     */
    async delteActividad( id ){
        return new Promise( async ( resolve, reject ) =>{

            try{

                let actModel = new actividadModel();            
                let sqlDelete = actModel.getSqlDeleteActividad( id );

                await con.QueryAwait('BEGIN');
                let resultAdd = con.QueryAwait( sqlDelete );
                let ok = await con.QueryAwait('COMMIT');
                console.table( resultAdd );
                if( ok ) resolve( resultAdd );
               
            }catch( err ){
                await con.QueryAwait('ROLLBACK');
                reject( new actividadError( 'Error Actividad', `Error : ${err}`));
            }
        });
    }

}

module.exports = new ActividadService();