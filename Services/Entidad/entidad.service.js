'use strict'

const con = require('../../DB-connect/connectDB');
const { QueryAwait } = require('../../DB-connect/connectDB');
const fn = require('../../Custom/function_custom/custom');
const Entidad = require('../../Models/Entidad/entidad.model');
const EntidadError = require('../../Error/Entidad/entidadError');

const entidadService = {

  /** ADD ENTIDAD 
   * @Observations : Agregar nueva entidad.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  AddEntidad : async ( req ) =>{
    return new Promise( async ( resolve, reject ) =>{
      
      let data = req.body.data;

      try{
        fn.validateType( 'object', data );
      }catch( err ){
        throw err;
      }

      let entidad = new Entidad( data );
      let sqlAdd = entidad.getSqlString();

      try{

        con.select( sqlAdd, ( error, result ) =>{
          if( !error ){
            resolve( result.rows[0] );
          }else{
            reject( new EntidadError( 'Error Entidad', `Error in add Entidad : ${err}` ) );
          }
        });
/*
        await con.QueryAwait('BEGIN');
        let resultAdd = await con.QueryAwait( sqlAdd ).catch( err => { throw err } );
        let ok = await con.QueryAwait('COMMIT');
        if ( ok ) resolve( resultAdd.rows[0] );
        //await con.QueryAwait('ROLLBACK');
*/
      }catch( err ){
        throw new EntidadError( 'Error Entidad', `Error in add Entidad : ${err}` );
      }

    });
  },

  /** UPDATE VERIFICADO
   * @Observations : Update es verificado.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  UpdateVerificadoEntidad : ( req ) =>{
    return new Promise( ( resolve, reject ) =>{
      
      let data = req.body.data;
      try{
        fn.validateType( 'object', data );
      }catch( err ){
        reject( err.getMessage() );
      }

      let entidad = new Entidad( );
      entidad.setVerificado( data.verificado );
      entidad.setId( data.id );
      let sql = entidad.getSqlStringUpdateVerificado();

      con.update( sql, ( error, result ) =>{
        if( !error ){
          resolve( result.rows );
        }else{
          reject( error );
        }
      });

    });
  },

  /** UPDATE VERIFICADO ID
   * @Observations : Actualizar entidad , validar o rechazar.
   * @param   { string } id => identificador de entidad.
   * @param   { boolean } verificado => Es verificado.
   * @returns { Promise } => new Promise.
   */
  UpdateVerificadoEntidadID : async ( id_entidad, verificado ) =>{
    return new Promise( async ( resolve, reject ) =>{
      
      try{
        //fn.validateType( 'number', id_entidad );
        //fn.validateType( 'boolean', verificado );
      }catch( err ){
        reject( err );
      }

      let sql = getSqlUpdateValidadoEntidad( id_entidad, verificado );
      try{

        await con.QueryAwait('BEGIN');
        let resultUpdate = await con.QueryAwait( sql );
        let ok = await con.QueryAwait('COMMIT');
        if( ok ) resolve( resultUpdate );

      }catch( err ){
        await con.QueryAwait('ROLLBACK');
        reject( new EntidadError('Error Entidad', `Error actualizar verificado : ${err}`) );
      }

    }).catch( error => { throw error } );
  },

  /** UPDATE ENTIDAD
   * @Observations : Update Entidad.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  UpdateEntidad : ( req ) =>{
    return new Promise( ( resolve, reject ) =>{
      
      let data = req.body.data;

      try{
        fn.validateType( 'object', data );
      }catch( err ){
        reject( err.getMessage() );
      }

      let entidad = new Entidad( data );
      let sql = entidad.getSqlStringUpdate();

      con.update( sql, ( error, result ) =>{
        if( !error ){
          resolve( result.rows );
        }else{
          reject( error );
        }
      });

    });
  },


  /** LIST ENTIDAD
   * @Observations : List entidad.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  ListEntidad : ( req ) => {
    return new Promise( ( resolve, reject ) =>{
      
      let data = req.body.data;
      try{
        fn.validateType( 'object', data );
      }catch( err ){
        reject( err.getMessage() );
      }

      let entidad = new Entidad();
      let sql;

      try{
        sql = entidad.getSqlStringList( data );
      }catch( err ){
        reject( err.getMessage() );
      }

      con.select( sql, ( error, result ) =>{
        if( !error ){
          resolve( result.rows );
        }else{
          resolve( error );
        }
      });

    });
  },

  /** GET ENTIDAD
   * @Observations : Obtener entidad
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  GetEntidad : ( req ) => {
    return new Promise( ( resolve, reject ) =>{
      
      let id = req.body.data;
      try{
        fn.validateType( 'string', id );
      }catch( err ){
        reject( err.getMessage() );
      }

      let entidad = new Entidad();
      entidad.setId( id );
      let sql = entidad.getSqlStringById();

      con.select( sql, ( error, result ) =>{
        if( !error ){
          resolve( result.rows );
        }else{
          resolve( error );
        }
      });

    });
  },

  /** GET LIST EMAIL ENTIDAD
   * @Observations => Retorna lista de email asociados a la entidad.
   * @return { Promise } => new Promise.
   */
  getListEmailEntidad : ( id ) => {
    return new Promise( async ( resolve, reject ) => {

      try{
        fn.validateType('number', id );
      }catch( err ){
        reject( new EntidadError('Error Entidad', `${err}`) );
      }

      let sql = '';
      if( id ){
        sql = `SELECT email FROM entidad WHERE id = ${id} ;`;
      }else{
        sql = `SELECT email FROM entidad ;`;
      }

      try{

        let resultListEmail = await QueryAwait( sql );
        if( resultListEmail ) resolve( resultListEmail.rows );

      }catch( err ){
        reject( new EntidadError('Error Entidad', `Error al listar email entidad : ${err}`) );
      }

    }).catch( error => { throw error; } );
  },

  /**  VERIFY CUI
   * @Observations => Verifica que el numero de cuit no se repita.
   * @param { string } cuit => Numero de cuit a verificar.
   * @return { Promise } => new Promise.
   */
  verifyCuit : ( cuit ) => {
    return new Promise( async ( resolve, reject ) =>{

      try{
        fn.validateType('string', cuit );
      }catch( err ){
        reject( err );
      }

      let entidad = new Entidad();
      let sql = entidad.getSqlStringValidateCuit( cuit );

      try{

        let resultVerify = await QueryAwait( sql );
        if( resultVerify ) resolve( resultVerify.rows.length );

      }catch( err ){
        reject( new EntidadError('Error Entidad', `Error al intentar validar Cuit : ${err}`));
      }

    });
  },

  /**  GET SELECT ENTIDAD
   * @Observations => Obtener id y nombre de entidad para completar dinamicamente los select.
   * @return { Promise } => new Promise.
   */
  getSelectEntidad(){
    return new Promise( async ( resolve, reject ) =>{

      try{
        let resultEntidad = await QueryAwait( `SELECT id, nombre FROM entidad ORDER BY nombre ASC ;` );
        if( resultEntidad ) resolve( resultEntidad.rows );
      }catch( err ){
        reject( new EntidadError('Error Entidad', `Error al intentar obtener entidad : ${err}`));
      }
   
    });
  },

  /** LIST ENTIDAD PAGINADO
   * @Observations : List entidad paginado.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  ListEntidadPaginado : ( req ) => {
    return new Promise( ( resolve, reject ) =>{
      
      let pag = req.body.data;

      try{
        fn.validateType( 'object', pag );
      }catch( err ){
        reject( err.getMessage() );
      }

      let entidad = new Entidad();
      let sql;

      try{
        sql = entidad.getSqlStringListPaginado( pag );
      }catch( err ){
        reject( err.getMessage() );
      }

      con.select( sql, ( error, resultRows ) =>{

        if( !error ){

          con.select(`SELECT Count(*) FROM entidad WHERE verificado = true ;`, ( error, resultCount )=>{

            if( !error ){
              resolve({ 'count': resultCount.rows[0].count , 'rows': resultRows.rows});
            }else{
              reject([]);
            }

          });

        }else{
          resolve( error );
        }

      });

    });

  }

};

module.exports = entidadService;


/** GET STRING UPDATE VALIDADO
 * @Observations : Update Entidad.
 * @param   { string } id_entidad => id de la entidad.
 * @param   { boolean } req => Es verificado.
 * @returns { Promise } => new Promise.
 */
const getSqlUpdateValidadoEntidad = ( id_entidad, verificado ) =>{
  let entidad = new Entidad( );
  entidad.setVerificado( verificado );
  entidad.setId( id_entidad );
  let sql = entidad.getSqlStringUpdateVerificado();
  return sql;
}
