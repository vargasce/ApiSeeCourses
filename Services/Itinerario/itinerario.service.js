'use strict'

const con = require('../../DB-connect/connectDB');
const itinerarioModel = require('../../Models/itinerarioModel/itinerario.model');
const custon = require('../../Custom/function_custom/custom');
const itinerarioError = require('../../Error/Itinerario/itinerarioError');
const dt = require('../../Custom/dates/dates');
const custom = require('../../Custom/function_custom/custom');

const itinerarioService = {

  /** GET ITINERARIO SEARCH
   * @Observations : Obtener itineario por indice de busqueda, palabra clave ( Nombre del itinerario ).
   * @param   { Object } req => Request del controller.
   * @param   { string } index => palabra clave para buscar.
   * @returns { Promise } => new Promise.
   */
  getItinerarioSearch : ( req ) =>{
    return new Promise( async ( resolve, reject ) =>{

      let data = req.body.data ;
      
      try{
        custon.validateType( 'string', data );
      }catch( e ){
        reject( e.getMessage() );
      }
      
      let sql = `
        SELECT it.id, it.nombre, it.titulo, it.descripcion, it.observacion,to_char( it.fecha_itinerario, 'yyyy-MM-DD' ) AS fecha_itinerario, it.hora_itinerario, 
               to_char( it.fecha_alta, 'yyyy-MM-DD' ) AS fecha_alta, it.imagen, it.link, it.instructor, it.viewed, it.validado, it.finalizado,
               ent.id as id_entidad, ent.nombre as nombre_entidad,
	             ent.descripcion as descripcion_entidad, ent.telefono as telefono_entidad,
	             ent.director as director_entidad, ent.ciudad as ciudad_entidad
	      FROM public.itinerario as it 
	      INNER JOIN public.entidad as ent on it.id_entidad = ent.id
	      WHERE it.titulo iLIKE '%${data}%'
        AND it.validado = true
        AND it.finalizado = false
        AND it.rechazado = false
	      ORDER BY it.viewed desc ; `;

      con.select( sql, ( error, result ) =>{
        if( !error ){
          if( result.rowCount > 0 ){
            resolve( result.rows );
          }else{
            resolve('There is not data!!!');
          }
        }else{
          reject( `Error al realizar la consulta : ${error}` );
        }
      });

    });
  },

  /** GET LIST ITINERARIO
   * @Observations : Obtiene lista de los primero cursos mas visto.
   * @param   { Object } req => Request controller.
   * @returns { Promise } => new Promise.
   */
  getMostViewed : ( req ) => {
    return new Promise( ( resolve, reject ) =>{
      
      let limitCount = req.body.data;

      try{
        custon.validateType( 'string', limitCount );
      }catch( e ){
        reject( e.getMessage() );
      } 

      let sql = `
        SELECT it.id AS id, it.nombre, it.countviewed, it.titulo, it.descripcion, it.observacion, to_char( it.fecha_itinerario, 'yyyy-MM-DD' ) AS fecha_itinerario, it.hora_itinerario, it.hora_itinerario_fin, 
               to_char( it.fecha_alta, 'yyyy-MM-DD' ) AS fecha_alta, it.imagen, it.link, it.instructor, it.viewed, it.validado, it.finalizado,
               ent.id as id_entidad, ent.nombre as nombre_entidad,
	             ent.descripcion as descripcion_entidad, ent.telefono as telefono_entidad,
	             ent.director as director_entidad, ent.ciudad as ciudad_entidad,
               act.id AS id_actividad, act.descripcion AS descripcion_actividad
	      FROM public.itinerario as it 
	      INNER JOIN public.entidad as ent on it.id_entidad = ent.id
        INNER JOIN public.actividad AS act ON act.id = ent.id_actividad
	      WHERE it.validado = true
        AND it.finalizado = false
        AND ent.verificado = true
        AND it.rechazado = false
	      ORDER BY it.countviewed DESC
        LIMIT ${limitCount}; 
      `;

      con.select( sql, ( error, result ) =>{
        if( !error ){
          if( result.rows ){
            resolve( result.rows );
          }else{
            reject(`There is no data.`);
          }
        }else{
          reject( `Error al obtener datos : ${error}` );
        }
      });
    });
  },

  /** INCREMENT COUNT VIEWES.
   * @Observations : Incrementar contador de vistos.
   * @param { number } id => Identificador para realizar la actualizacion.
   * @returns { Promise } => new Promise.
   */
  incrementViewed : async ( id )=>{
    return new Promise( async ( resolve, reject ) =>{

      try{
        custom.validateType('number', id );
      }catch( err ){
        reject( err );
      }

      try{
        let result = await con.QueryAwait( `UPDATE itinerario SET countviewed = countviewed + 1 WHERE id = ${id} ;`);
        if( result ) resolve( result );
      }catch( err ){
          reject( new itinerarioError('Error in Itinerario',`Error get query itinerario by entidad : ${err}`) );
      }

    });
  },

  /** ADD NUEVO ITINERARIO.
   * @Observations : Agregar un nuevo itinerario.
   * @param   { Object } req => Request controller.
   * @returns { Promise } => new Promise.
   */
  addItinerario : async ( req ) =>{
    return new Promise( async ( resolve, reject ) =>{

      let data = req.body.data;

      try{
        custon.validateType( 'object', data );
      }catch( e ){
        reject( e.getMessage() );
      }

      let objItinerario = new itinerarioModel( data );
      let sql = objItinerario.getSqlString();
      try{

        await con.QueryAwait('BEGIN');
        let response = await con.QueryAwait( sql );
        let ok = await con.QueryAwait('COMMIT');
        if( ok ) resolve( response.rows[0] );

      }catch( err ){
        await con.QueryAwait('ROLLBACK');
        reject( err );
      }

    }).catch( error => { throw error; } );
  },

  /** UPDATE NUEVO ITINERARIO.
   * @Observations : Updete itinerario.
   * @param   { Object } req => Request controller.
   * @returns { Promise } => new Promise.
   */
  updateItinerario : ( req ) =>{
    return new Promise( ( resolve, reject ) =>{

      let data = req.body.data.data;

      try{
        custon.validateType( 'object', data );
      }catch( e ){
        reject( e.getMessage() );
      }

      let objItinerario = new itinerarioModel( data );
      let sql = objItinerario.getSqlStringUpdate();

      con.insert( sql, ( error, insert ) =>{
        if( !error ){
          resolve( insert );
        }else{
          reject( error );
        }
      });

    });
  },

  /** UPDATE VALIDATE.
   * @Observations : Actualizar validacion del itinerario.
   * @param   { Object } req => Request controller.
   * @returns { Promise } => new Promise.
   */
  updateValidate : ( req ) =>{
    return new Promise( ( resolve, reject ) =>{

      let data = req.body.data;

      try{
        custon.validateType( 'string', data );
      }catch( e ){
        reject( e.getMessage() );
      }

      let objItinerario = new itinerarioModel();
      objItinerario.setId( data );
      let sql = objItinerario.updateValidate();

      con.insert( sql, ( error, insert ) =>{
        if( !error ){
          resolve( insert );
        }else{
          reject( error );
        }
      });

    });
  },

  /** UPDATE VALIDATE.
   * @Observations : Actualizar validacion del itinerario, por rechazo o validado.
   * @param   { string } id =>  identificador del itinerario.
   * @param   { boolean } rechazado =>  Indicamos si es por rechazo o no.
   * @returns { Promise } => new Promise.
   */
  updateValidateId : ( id, rechazado ) =>{
    return new Promise( ( resolve, reject ) =>{

      try{
        custon.validateType( 'number', id );
      }catch( e ){
        reject( e.getMessage() );
      }

      let objItinerario = new itinerarioModel();
      objItinerario.setValidado(true);
      objItinerario.setViewed(true);
      objItinerario.setRechazado(rechazado);
      objItinerario.setId( id );
      let sql = objItinerario.getSqlStringValidate();

      con.insert( sql, ( error, insert ) =>{
        if( !error ){
          resolve( insert );
        }else{
          reject( error );
        }
      });

    });
  },

  /** GET ITINERARIO BY ID
   * @Observations : Obtener itineario por id .
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  getItinerarioById : ( req ) =>{
    return new Promise( async ( resolve, reject ) =>{

      let id = req.body.data ;
      
      try{
        custon.validateType( 'number', id );
      }catch( e ){
        reject( e.getMessage() );
      }
      

      let sql = `
        SELECT it.id, it.nombre, it.titulo, it.descripcion, it.observacion, to_char( it.fecha_itinerario, 'yyyy-MM-DD' ) AS fecha_itinerario, it.hora_itinerario, 
              to_char( it.fecha_alta, 'yyyy-MM-DD' ) AS fecha_alta, it.imagen, it.link, it.instructor, it.viewed, it.validado, it.finalizado, it.rechazado, it.hora_itinerario_fin,
              ent.id as id_entidad, ent.nombre as nombre_entidad,
              ent.descripcion as descripcion_entidad, ent.telefono as telefono_entidad,
              ent.director as director_entidad, ent.ciudad as ciudad_entidad,
              noti.observacion AS observacion_notificacion, noti.pendiente AS noti_pendiente,
              act.id AS id_actividad, act.descripcion AS descripcion_actividad,
              pa.id AS id_pais, pa.descripcion AS descripcion_pais,
              pro.id AS id_provincia, pro.descripcion AS descripcion_provincia,
              loca.id AS id_localidad, loca.descripcion AS descripcion_localidad,
              it.email_consulta, it.telefono_consulta
        FROM public.itinerario as it 
        INNER JOIN public.entidad as ent on it.id_entidad = ent.id
        INNER JOIN public.notificacion AS noti ON noti.id_curso = it.id
        INNER JOIN public.actividad AS act ON act.id = it.id_actividad
        INNER JOIN public.pais AS pa ON pa.id = it.id_pais
        INNER JOIN public.provincia AS pro ON pro.id = it.id_provincia
        INNER JOIN public.localidad AS loca ON loca.id = it.id_localidad
        WHERE it.id = ${id}
	    ;`;


 /*       SELECT it.id, it.nombre, it.titulo, it.descripcion, it.observacion, to_char( it.fecha_itinerario, 'yyyy-MM-DD' ) AS fecha_itinerario, it.hora_itinerario, it.hora_itinerario_fin, 
	             to_char( it.fecha_alta, 'yyyy-MM-DD' ), it.imagen, it.link, it.instructor, it.viewed, ent.id as id_entidad, ent.nombre as nombre_entidad,
	             ent.descripcion as descripcion_entidad, ent.telefono as telefono_entidad,
	             ent.director as director_entidad, ent.ciudad as ciudad_entidad
	      FROM public.itinerario as it 
	      INNER JOIN public.entidad as ent on it.id_entidad = ent.id
	      WHERE it.id = ${id}
        */
      con.select( sql, ( error, result ) =>{
        if( !error ){
          if( result.rowCount > 0 ){
            resolve( result.rows[0] );
          }else{
            resolve('There is not data!!!');
          }
        }else{
          reject( `Error al realizar la consulta : ${error}` );
        }
      });

    });
  },

  /** GET ITINERARIOS BY ENTIDAD
   * @Observations : Obtener itinearios por id de la entidad .
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  getItinerarioByEntidadId : ( req ) =>{
    return new Promise( async ( resolve, reject ) =>{

      let id = req.body.data ;
      
      try{
        custon.validateType( 'number', id );
      }catch( e ){
        reject( e.getMessage() );
      }
      
      let Itinerario = new itinerarioModel( null );
      let sql = Itinerario.getSqlStringItinerarioByEntidad( id );

      try{

        await con.QueryAwait('BEGIN');
        let resultByEntidad = await con.QueryAwait( sql );
        let ok = await con.QueryAwait('COMMIT');
        if ( ok ) resolve( resultByEntidad.rows );

      }catch( err ){
        await con.QueryAwait('ROLLBACK');
        throw new itinerarioError('Error in Itinerario',`Error get query itinerario by entidad : ${err}`);
      }

    });
  },

  /** CONSULTAR DISPONIBILIADA DE FECHAS.
   * @Observations : Query para realizar consulta sobre la disponibilida de fechas y horas.
   * @param { Object } data => Objecto con los filtros a realizar.
   * @returns { Promise } => new Promise<Object> 
   */
  getAvailabilityDate : ( data ) => {
    return new Promise( async ( resolve, reject ) =>{
      
      try{
        custon.validateType( 'object', data );
      }catch( err ){
        reject( new itinerarioError( 'Error itinerarioService', `${err}` ) );
      }

      let objItinerario = new itinerarioModel();
			let sqlString = objItinerario.getSqlAvailabilityDate( data );

			try{

				let result = await con.QueryAwait( sqlString );
        let dataArray = new Array();
        dataArray.push(  ... result.rows );

        let resultSend = dataArray.reduce( ( previus, current ) => {

          if( !dt.belongsRangeTime( data.fecha_itinerario, current.hora_itinerario, current.hora_itinerario_fin, data.hora_itinerario, data.hora_itinerario_fin )){
            previus.push( current );
            return previus;
          }else{
            return previus;
          }

        }, []);

				resolve( resultSend );

			}catch( err ){
        reject( err );
				//reject( new itinerarioError( 'Error in Itinerario', `Error get query getAvailabilityDate() : ${err} `) );
			}

    });

  },

  /** OBTENER LOS ITINERARIOS POR FECHA.
   * @Observations => Retorna todos los itineraios de una fecha determinada.
   * @param { string } fecha => Fecha a consultar.
   * @returns { Promise } => new Promise<Object> 
   */
  getItinerarioForDate : ( fecha ) => {
    return new Promise( async ( resolve, reject ) =>{

      try{
        custom.validateType( 'string', fecha );
      }catch( err ){
        reject( new itinerarioError('Error itinerario service', `${err}`));
      }

      try{
        let resultDate = await con.QueryAwait(`SELECT * FROM itinerario WHERE fecha_itinerario = '${fecha}' ;`);
        resolve( resultDate );
      }catch( err ){
 				reject( new intinerarioError( 'Error in Itinerario', `Error get query get fecha for date : ${err} `) );
      }

    });

  },

  /** OBTENER LOS ITINERARIOS POR FILTRO.
   * @Observations => Retorna todos los itineraios por filtro.
   * @param { object } filtro => Fecha a consultar.
   * @returns { Promise } => new Promise<Object> 
   */
  getItinerarioByFilter : ( filter ) =>{
    return new Promise( async ( resolve, reject ) =>{

      try{
        custom.validateType('object',filter);
      }catch( err ){
        reject( err );
      }

      let itiModel = new itinerarioModel();
      let sql = itiModel.getSqlStringFilter( filter );

      try{

        await con.QueryAwait('BEGIN');
        let result = con.QueryAwait( sql );
        let ok = con.QueryAwait('COMMIT');
        if( ok ) resolve( result );

      }catch( err ){
        await con.QueryAwait('ROLLBACK');
        reject( new itinerarioError('Error Itinerario', `Error al obtener la consulta : ${err}` ) );
      }

    });
  },

  /** FINALIZAR ITINERARIO FORZADO
   * @Observations => Forzar finalizacion de curso para que se muestre en el home.
   * @param { numbre } id => identificador del itinerario.
   * @returns { Promise } => new Promise<string> 
   */
  finalizarItinerario : ( id ) =>{
    return new Promise( async ( resolve, reject ) =>{

      try{
        custom.validateType('number', id);
      }catch( err ){
        reject( err );
      }

      let itiModel = new itinerarioModel();
      let sql = itiModel.finalizarItinerarioSqlStrin( id );

      try{

        await con.QueryAwait('BEGIN');
        let result = con.QueryAwait( sql );
        let ok = con.QueryAwait('COMMIT');
        if( ok ) resolve( result );

      }catch( err ){
        await con.QueryAwait('ROLLBACK');
        reject( new itinerarioError('Error Itinerario', `Error al finalizar itinerario: ${err}` ) );
      }

    });
  },

   /** GET LIST ITINERARIO TOTAL
   * @Observations : Obtiene todos las actividades.
   * @param   { Object } req => Request controller.
   * @returns { Promise } => new Promise.
   */
  getTotalList : ( ) => {
    return new Promise( ( resolve, reject ) =>{

      let sql = `
        SELECT it.id AS id, it.nombre, it.countviewed, it.titulo, it.descripcion, it.observacion, to_char( it.fecha_itinerario, 'yyyy-MM-DD' ) AS fecha_itinerario, it.hora_itinerario, it.hora_itinerario_fin, 
               to_char( it.fecha_alta, 'yyyy-MM-DD' ) AS fecha_alta, it.imagen, it.link, it.instructor, it.viewed, it.validado, it.finalizado,
               ent.id as id_entidad, ent.nombre as nombre_entidad,
	             ent.descripcion as descripcion_entidad, ent.telefono as telefono_entidad,
	             ent.director as director_entidad, ent.ciudad as ciudad_entidad,
               act.id AS id_actividad, act.descripcion AS descripcion_actividad
	      FROM public.itinerario as it 
	      INNER JOIN public.entidad as ent on it.id_entidad = ent.id
        INNER JOIN public.actividad AS act ON act.id = ent.id_actividad
	      WHERE it.validado = true
        AND it.finalizado = false
        AND ent.verificado = true
        AND it.rechazado = false
	      ORDER BY it.countviewed DESC
      `;

      con.select( sql, ( error, result ) =>{
        if( !error ){
          if( result.rows ){
            resolve( result.rows );
          }else{
            reject(`There is no data.`);
          }
        }else{
          reject( `Error al obtener datos : ${error}` );
        }
      });
    });

  },


};

module.exports = itinerarioService;

