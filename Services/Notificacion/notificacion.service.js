'use strict'

const con = require('../../DB-connect/connectDB');
const fn = require('../../Custom/function_custom/custom');
const Notificacion = require('../../Models/notificacionModel/notificacion.model');
const _entidadService = require('../Entidad/entidad.service');
const _itinerarioService = require('../Itinerario/itinerario.service');
const NotificacionError = require('../../Error/Notificacion/notificacionError');

const ItinerarioService = {


  /** ADD NOTIFICACION 
   * @Observations : Agregar nueva notificaion.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  addNotificacion : ( req ) =>{
    return new Promise( async ( resolve, reject ) =>{

      let data = req.body.data;

      try{
        fn.validateType( 'object', data );
      }catch( err ){
        reject( err.getMessage() );
      }
      
      let notificacion = new Notificacion( data );
      let sql = notificacion.getSqlString();

      try{

        await con.QueryAwait('BEGIN');
        let resultAdd = con.QueryAwait( sql );
        let ok = await con.QueryAwait('COMMIT');
        if ( ok ) resolve( resultAdd.rows ) ;
          
      }catch( err ){
        await con.QueryAwait('ROLLBACK');
        reject( new NotificacionError('Error Notificacion Services', `Error al insertar  nueva notificacion : ${err}`) );
      }

    });

  },

  /** GET NOTIFICACION 
   * @Observations : Obtener notificaion.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  getNotificacion : ( req ) =>{
    return new Promise( ( resolve, reject ) =>{
      
      let filtro = req.body.filtro;

      let notificaion = new Notificacion();

      let sql = notificaion.getSqlStringById( filtro );

      con.select( sql, ( error, result ) =>{
        if( !error ){
          resolve( result.rows );
        }else{
          reject( error );
        }
      });

    });

  },

  /** UPDATE NOTIFICACION 
   * @Observations : Update notificaion.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  updateNotificacion : ( req ) =>{
    return new Promise( ( resolve, reject ) =>{
      
      let data = req.body.data;

      try{
        fn.validateType( 'object', data );
      }catch( err ){
        reject( err.getMessage() );
      }

      let notificaion = new Notificacion( data );
      let sql = notificaion.getSqlStringUpdate();

      con.select( sql, ( error, result ) =>{
        if( !error ){
          resolve( result.rows );
        }else{
          reject( error );
        }
      });

    });

  },

  /** LIST NOTIFICACION 
   * @Observations : List notificaion.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  listNotificacion : ( req ) =>{
    return new Promise( ( resolve, reject ) =>{
      
      let filtro = req.body.filtro;
      let data = req.body.data;

      try{
        fn.validateType( 'object', filtro );
        fn.validateType( 'object', data );
      }catch( err ){
        reject( err.getMessage() );
      }

      let notificaion = new Notificacion( data );
      let sql = notificaion.getSqlStringList( filtro, data );

      con.select( sql, ( error, result ) =>{
        if( !error ){
          resolve( result.rows );
        }else{
          reject( error );
        }
      });

    });

  },

  /** UPDATE NOTIFICACION RECHAZADO
   * @Observations : Update notificaion.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  updateRejected : ( req ) =>{
    return new Promise( async ( resolve, reject ) =>{
      
      let data = req.body.data;
      let es_curso = req.body.data.es_curso;

      try{
        fn.validateType('object', data);
      }catch( err ){
        reject( err.getMessage() );
      }

      let sql = getSqlRechazado(  data.id );
      let sqlGetNotificacion = `SELECT * FROM notificacion WHERE id = ${data.id} ;`;

      try{

        await con.QueryAwait('BEGIN');
        await con.QueryAwait( sql );
        const response = await con.QueryAwait( sqlGetNotificacion );
        if( es_curso ){
          await _itinerarioService.updateValidateId( response.rows[0].id_curso, true );
        }else{
          await _entidadService.UpdateVerificadoEntidadID( response.rows[0].id_entidad, false );
        }

        let ok = await con.QueryAwait('COMMIT');
        if( ok ) resolve( ok );

      }catch( err ){
        await con.QueryAwait('ROLLBACK');
        reject( new NotificacionError( 'Error Notificacion', `Error al actualizar notificacion updateRejected : ${err}` ) );
      }

    });
  },

  /** UPDATE NOTIFICACION VIEW
   * @Observations : Actualiza la notificacion del visto.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  updateVisto : ( req ) =>{
    return new Promise( async ( resolve, reject ) =>{
      
      let id = req.body.data;

      try{
        fn.validateType('number', id);
      }catch( err ){
        reject( err.getMessage() );
      }

      let notificaion = new Notificacion();
      notificaion.setId( id );
      notificaion.setVisto( true );
      let sql = notificaion.getSqlStringVisto();

      try{

        await con.QueryAwait('BEGIN');
        let result = con.QueryAwait( sql );
        let ok = await con.QueryAwait('COMMIT');
        if ( ok ) resolve( result );

      }catch( err ){
        await con.QueryAwait('ROLLBACK');
        reject( new NotificacionError( 'Error Notificacion', `Error al actualizar notificacion : ${err}` ) );
      }

    });
  },

  /** UPDATE NOTIFICACION VERIFICADO AWAIT
   * @Observations : Update notificaion.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  updatePendingAwait : ( req ) =>{
    return new Promise( async ( resolve, reject ) =>{
      
      let id = req.body.data.id;
      let es_curso = req.body.data.es_curso;

      try{
        fn.validateType('number', id);
      }catch( err ){
        reject( err.getMessage() );
      }

      let sql = getSql( id );
      let sqlGetNotificacion = `SELECT * FROM notificacion WHERE id = ${id} ;`;

      try{

        await con.QueryAwait('BEGIN');
        await con.QueryAwait( sql );
        const response = await con.QueryAwait( sqlGetNotificacion );

        if( es_curso ){
          await _itinerarioService.updateValidateId( response.rows[0].id_curso, false );
        }else{
          await _entidadService.UpdateVerificadoEntidadID( response.rows[0].id_entidad, true );
        }

        let ok = await con.QueryAwait('COMMIT');
        if( ok ) resolve( ok );

      }catch( err ){
        await con.QueryAwait('ROLLBACK');
        reject( new NotificacionError( 'Error', `Error en la transaccion de notificacion, ${err}` ) );
      }

    });
  },

  /** OBTENER LISTA DE NOTIFICAIONES PENDIENTES.
   * @Observations : Obtiene lista de notificaciones pendientes.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  getListNotificacionAdmin : ( req ) =>{
    return new Promise( async ( resolve, reject ) =>{
      
      let noti = new Notificacion();
      let sql = noti.getSqlStringListNotiAmin();

      try{

        await con.QueryAwait('BEGIN');
        const result = await con.QueryAwait( sql );
        let ok = await con.QueryAwait('COMMIT');
        if( ok ) resolve( result.rows );

      }catch( err ){
        await con.QueryAwait('ROLLBACK');
        reject( new NotificacionError( 'Error', `Error en la transaccion de list notificacion admin., ${err}` ) );
      }

    });
  },

  /** OBTENER LISTA DE NOTIFICAIONES PENDIENTES ENTIDAD.
   * @Observations : Obtiene lista de notificaciones pendientes entidad.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  getListNotificacionEntidad : ( req ) =>{
    return new Promise( async ( resolve, reject ) =>{
      
      let noti = new Notificacion();
      let sql = noti.getSqlStringListNotiEntidad( req.body.data.id );

      try{

        await con.QueryAwait('BEGIN');
        const result = await con.QueryAwait( sql );
        let ok = await con.QueryAwait('COMMIT');
        if( ok ) resolve( result.rows );

      }catch( err ){
        await con.QueryAwait('ROLLBACK');
        reject( new NotificacionError( 'Error', `Error en la transaccion de list notificacion entidad., ${err}` ) );
      }

    });
  }

}

module.exports = ItinerarioService;

/** RETURN STRING SQL NOTIFICACION
 * @Observations : Arma sql string para realizar la consulta.
 * @param { string } id => identificador
 * @return { string } => retorna sql string.
 */
const getSql = ( id ) =>{
  let notificacion = new Notificacion();
  notificacion.setId( id );
  notificacion.setPendiente( false );
  notificacion.setVisto( true );
  return notificacion.getSqlStringPending();
}

/** RETURN STRING SQL NOTIFICACION REJECTED
 * @Observations : Arma sql string para rechazar solicitud
 * @param { string } id => identificador
 * @return { string } => retorna sql string.
 */
const getSqlRechazado = ( id ) =>{
  let notificacion = new Notificacion();
  notificacion .setId( id );
  notificacion .setPendiente( false );
  notificacion .setVisto( true );
  return notificacion.getSqlStringRechazado();
}
