'use strict'

const fn  = require('../../Custom/function_custom/custom');
const dt = require('../../Custom/dates/dates');
const AdministradorError = require('../../Error/Administrador/administradorError');
const AdministradorModel = require('../../Models/administradorModel/administrador.model');
const { QueryAwaitById, QueryAwait, QueryAwaitPag } = require('../../DB-connect/connectDB');
const usuarioAdminModel = require('../../Models/usuario_admin/usuario_admin.model');
const _logService = require('../Log/log.service');

class AdministradorService{
    
    constructor ( ){}

    /** ADD ADMINISTRADOR
     * @Observations => Agregar nuevo administrador
     * @param { Object } data => Objecto con los datos agregar.
     * @returns { Promise } => new Promise.
     */
    async addAdministrador ( data = null ){
        return new Promise( async ( resolve, reject ) => {
            
            let dataUsuario = data.usuario;
            let dataAdmin = data.administrador;

            try{
                fn.validateType( 'object', dataAdmin );
                fn.validateType( 'object', dataUsuario );
            }catch( err ){
                reject( err.getMessage() );
            }

            try{

                let admin = new AdministradorModel( dataAdmin );
                let sqlAddAdministrador = admin.getSqlStringAddAdministrador();
                let userAdmin = new usuarioAdminModel( dataUsuario );

                await QueryAwait( 'BEGIN' );

                let resultAdmin = await QueryAwait( sqlAddAdministrador );
                userAdmin.setIdAdministrador( resultAdmin.rows[0].id );
                let sqlAddUserAdmin = userAdmin.getSqlStringAddAdmin(); 
                let resultUsuario = await QueryAwait( sqlAddUserAdmin );
                let ok =  await QueryAwait( 'COMMIT' );
                if( ok ) return resolve( resultAdmin, resultUsuario );

            }catch( err ){
                await QueryAwait( 'ROLLBACK' );
                reject( new AdministradorError( 'Error Administradir', `Error creando Admin ${ err }`));
            }

        });
    }

    /** GET ADMIN BY ID
     * @Observations => Obtener administrador por identificador
     * @param { string } id => Identificador a buscar.
     * @returns { Promise } => new Promise.
     */
    async getAdministradorById ( id ){
        return new Promise( async ( resolve, reject ) =>{

            try{
                fn.validateType( 'number', id );
            }catch( err ){
                reject( err );
            }

            try{

                await con.QueryAwait( 'BEGIN');
                let result = await QueryAwaitById( id, 'administrador', 'id' );
                let ok = await QueryAwait('COMMIT');
                if( ok ) resolve( result );

            }catch( err ){
                await con.queryAwait('ROLLBACK');
                reject( new AdministradorError( 'Error Administrador', `Error Get By ID : ${ err }`));
            }

        });
    }

    /** GET LIST ADMINISTRADOR
     * @Observations =>  Obtener lista de administrador
     * @param { object } filter => filtro para paginador.
     * @example 
     *      {
     *          filter : {
     *              table : 'administrador',
     *              skip : 0,
     *              take : 10,
     *              sortBy : 'id',
     *              sendtido : 'ASC'           
     *          }
     *      }
     * @return { Promise } => new promise.
     */
    async getListAdministrador( filter ){
        return new Promise( async ( resolve, reject ) =>{
            
            try{
                fn.validateType( 'object', filter );
            }catch( err ){
                reject( err )
            }

            try{
                let result = await QueryAwaitPag( filter.table, filter.skip, filter.take, filter.sortBy, filter.sentido );
                resolve( result );
            }catch( err ){
                reject( new AdministradorError('Error Administrador', `Error list Administrador : ${err}`) );
            }

        });
    }

    /** GET LIST EMAIL ADMINISTRADOR
     * @Observations => Retorna lista de email asociados a todos los admin.
     * @return { Promise } => new Promise.
     */
    async getListEmailAdministrador(){
        return new Promise( async ( resolve, reject ) => {

            try{
                let resultEmailList = await QueryAwait( `SELECT email FROM administrador ;`);
                let emailList = resultEmailList.rows.map( ( value, index ) =>{ return value.email });
                if( resultEmailList ) resolve( emailList );
            }catch( err ){
                throw err;
                //reject( new AdministradorError('Error Administrador', `Error list email Administrador : ${err}`) );
            }
            
        });
    }

}

module.exports = new AdministradorService() ;