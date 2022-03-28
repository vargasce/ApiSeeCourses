'use strict'

const dt = require('../../Custom/dates/dates');

class ItinerarioModel{
	
  constructor( data ){
    if( data ){
      this.id = data.id;
      this.id_entidad = data.id_entidad;
      this.nombre = data.nombre;
      this.titulo = data.titulo;
      this.descripcion = data.descripcion;
      this.observacion = data.observacion;
      this.fecha_itinerario = data.fecha_itinerario;
      this.hora_itinerario = data.hora_itinerario;
      this.fecha_alta = data.fecha_alta;
      this.imagen = data.imagen;
      this.link = data.link;
      this.instructor = data.instructor;
      this.viewed = data.viewed;
      this.validado = data.validado;
      this.finalizado = data.finalizado;
      this.rechazado = data.rechazado;
      this.hora_itinerario_fin = data.hora_itinerario_fin;
      this.id_actividad = data.id_actividad;
      this.id_pais = data.id_pais,
      this.id_provincia = data.id_provincia,
      this.id_localidad = data.id_localidad;
      this.email_consulta = data.email_consulta,
      this.telefono_consulta = data.telefono_consulta
    }
  }

  getId (){ return this.id; }
  getIdEntidad (){ return this.id_entidad; }
  getNombre (){ return this.nombre; }
  getTitulo (){ return this.titulo; }
  getDescripcion (){ return this.descripcion; }
  getObservacion (){ return this.observacion; }
  getFechaItinerario (){ return this.fecha_itinerario; }
  getHoraItinerario (){ return this.hora_itinerario; }
  getHoraItinerarioFin(){ return this.hora_itinerario_fin; }
  getFechaAlta (){ return this.fecha_alta; }
  getImagen (){ return this.imagen; }
  getLink (){ return this.link; }
  getInstructor (){ return this.instructor; }
  getViewed (){ return this.viewed; }
  getValidado(){ return this.validado; }
  getFinalizado(){ return this.finalizado; }
  getRechazado(){ return this.rechazado; }
  getId_Actividad(){ return this.id_actividad; }
  getId_Pais(){ return this.id_pais; }
  getId_Provincia(){ return this.id_provincia; }
  getId_Localidad(){ return this.id_localidad; }
  getEmail_Consulto(){ return this.email_consulta; }
  getTelefono_Consulta(){ return this.telefono_consulta; }


  setId ( id ){ this.id = id; }
  setIdEntidad ( id_entidad ){ this.id_entidad = id_entidad; }
  setNombre ( nombre ){ this.nombre = nombre; }
  setTitulo ( titulo ){ this.titulo = titulo; }
  setDescripcion ( descripcion ){ this.descripcion = descripcion; }
  setObservacion ( observacion ){ this.observacion = observacion; }
  setFechaItinerario ( fecha_itinerario ){ this.fecha_itinerario = fecha_itinerario; }
  setHoraItinerario ( hora_itinerario ){ this.hora_itinerario = hora_itinerario; }
  setHoraItinerarioFin( hora_itinerario_fin ){ this.hora_itinerario_fin = hora_itinerario_fin; }
  setFechaAlta ( fecha_alta ){ this.fecha_alta = fecha_alta; }
  setImagen ( imagen ){ this.imagen = imagen; }
  setLink ( link ){ this.link = link; }
  setInstructor ( instructor ){ this.instructor = instructor; }
  setViewed ( viewed ){ this.viewed = viewed; }
  setValidado( validado ){ this.validado = validado; }
  setRechazado( rechazado ){ this.rechazado = rechazado; }

  setId_Actividad( id_actividad ){ this.id_actividad = id_actividad; }
  setId_Pais( id_pais ){ this.id_pais = id_pais; }
  setId_Provincia( id_provincia ){ this.id_provincia = id_provincia; }
  setId_Localidad( id_localidad ){ this.id_localidad = id_localidad; }
  setEmail_Consulto( email_consulta ){ this.email_consulta = email_consulta; }
  setTelefono_Consulta( telefono_consulta ){ this.telefono_consulta = telefono_consulta; }



  /** GET STRING INSERT
   * @Observations : Construye string para insert a base de datos.
   * @returns { string } => Sql string;
   */
  getSqlString(){
    let sql = `
      INSERT INTO itinerario(
        id_entidad,
        nombre,
        titulo,
        descripcion,
        observacion,
        fecha_itinerario,
        hora_itinerario,
        fecha_alta,
        imagen,
        link,
        instructor,
        viewed,
        validado,
        finalizado,
        rechazado,
        hora_itinerario_fin,
        id_actividad,
        id_localidad,
        id_pais,
        id_provincia,
        telefono_consulta,
        email_consulta
    )
    VALUES(
        ${this.getIdEntidad()},
        '${this.getNombre()}',
        '${this.getTitulo()}',
        '${this.getDescripcion()}',
        '${this.getObservacion()}',
        '${this.getFechaItinerario()}',
        '${this.getHoraItinerario()}',
        '${this.getFechaAlta()}',
        '${this.getImagen()}',
        '${this.getLink()}',
        '${this.getInstructor()}',
        ${this.getViewed()},
        ${this.getValidado()},
        ${this.getFinalizado()},
        ${this.getRechazado()},
        '${this.getHoraItinerarioFin()}',
        ${this.getId_Actividad()},
        ${this.getId_Localidad()},
        ${this.getId_Pais()},
        ${this.getId_Provincia()},
        '${this.getTelefono_Consulta()}',
        '${this.getEmail_Consulto()}'

    ) RETURNING id ;
    `;

    return sql;
  }


  /** GET STRING UPDATE
   * @Observations : Construye string para update a base de datos.
   * @returns { string } => Sql string;
   */
  getSqlStringUpdate(){
    let sql = `
      UPDATE itinerario SET
        id_entidad = ${this.getIdEntidad()},
        nombre = '${this.getNombre()}',
        titulo = '${this.getTitulo()}',
        descripcion = '${this.getDescripcion()}',
        observacion = '${this.getObservacion()}',
        fecha_itinerario = '${this.getFechaItinerario()}',
        hora_itinerario = '${this.getHoraItinerario()}',
        fecha_alta = '${this.getFechaAlta()}',
        imagen = '${this.getImagen()}',
        link = '${this.getLink()}',
        instructor = '${this.getInstructor()}',
        viewed = false,
        validado = false,
        finalizado = false,
        rechazado = false,
        hora_itinerario_fin = '${this.getHoraItinerarioFin()}',
        id_actividad = ${this.getId_Actividad()},
        id_localidad = ${this.getId_Localidad()},
        id_pais = ${this.getId_Pais()},
        id_provincia = ${this.getId_Provincia()},
        telefono_consulta = '${this.getTelefono_Consulta()}',
        email_consulta = '${this.getEmail_Consulto()}'
      WHERE id = ${this.getId()} ;`;

    return sql;
  }

  /** UPDATE VALIDATE
   * @Observations : Actualiza la validacion del itinerario.
   * @param { string } id => Id del itinerario a actualizar.
   * @returns { string } => Sql string.
   */
  getSqlStringValidate(){
    let sql = `
      UPDATE itinerario SET
        validado = ${this.getValidado()},
        viewed = ${this.getViewed()},
        rechazado = ${this.getRechazado()}
      WHERE id = ${this.getId()}
      ;`;
    return sql;
  }

  /** GET SQL STRING VIEW COUNT 
   * @Observations : Retorna sql string consulta.
   * @param { string } count => cantidad de datos a mostrar.
   * @returns { string } => Sql string.
   */
  getSqlStringViewCount( data ){

    let sql = `
      SELECT it.id AS id, it.nombre, it.titulo, it.descripcion, it.observacion, to_char( it.fecha_itinerario, 'yyyy-MM-DD' ) AS fecha_itinerario, it.hora_itinerario, 
             to_char( it.fecha_alta, 'yyyy-MM-DD' ) AS fecha_alta, it.imagen, it.link, it.instructor, it.viewed, it.validado, it.finalizado,
             ent.id as id_entidad, ent.nombre as nombre_entidad,
             ent.descripcion as descripcion_entidad, ent.telefono as telefono_entidad,
             ent.director as director_entidad, ent.ciudad as ciudad_entidad,
             act.id AS id_actividad, act.descripcion AS descripcion_actividad
      FROM public.itinerario as it 
      INNER JOIN public.entidad as ent on it.id_entidad = ent.id
      INNER JOIN public.actividad AS act ON act.id = it.id_actividad
      WHERE it.validado = true
      AND it.finalizado = false
      ORDER BY it.viewed DESC
      LIMIT ${data}; 
    `;

    return sql;
  }


  /** GET SQL STRING ITINERARIOS BY ENTIDAD 
   * @Observations : Retorna sql string consulta.
   * @param { string } id => id de la entidad para la consulta.
   * @returns { string } => Sql string.
   */
  getSqlStringItinerarioByEntidad( id ){
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
      WHERE ent.id = ${id}
      ;`;
    return sql;
  }


  /** GET SQL STRING ITINERARIOS BY ENTIDAD 
   * @Observations : Retorna sql string consulta.
   * @param { string } id => id de la entidad para la consulta.
   * @returns { string } => Sql string.
   */
  getSqlAvailabilityDate( data = null  ){
    
    let sql = "";

    if( data ){

      sql = `
        SELECT id, id_entidad, nombre, titulo, descripcion, observacion, to_char( fecha_itinerario, 'yyyy-MM-DD' ) AS fecha_itinerario, hora_itinerario, to_char( fecha_alta, 'yyyy-MM-DD' ) AS fecha_alta, imagen, link, instructor, validado, finalizado, rechazado, viewed, hora_itinerario_fin
          FROM public.itinerario	
          WHERE fecha_itinerario = '${data.fecha_itinerario}'
		  ;`;

    }

    return sql;
  }

  /** GET SQL STRING ITINERARIOS BY ENTIDAD 
   * @Observations : Retorna sql string consulta.
   * @param { string } id => id de la entidad para la consulta.
   * @returns { string } => Sql string.
   */
  getSqlStringFilter( data ){

    let colums = new Array();
    let values = new Array();
    let fechas = new Array();
    let id_ent_send = null;

    let sql = `
      SELECT it.id AS id, it.nombre, it.titulo, it.descripcion, it.observacion, to_char( it.fecha_itinerario, 'yyyy-MM-DD' ) AS fecha_itinerario, it.hora_itinerario, 
        to_char( it.fecha_alta, 'yyyy-MM-DD' ) AS fecha_alta, it.imagen, it.link, it.instructor, it.viewed, it.validado, it.finalizado,
        ent.id as id_entidad, ent.nombre as nombre_entidad,
        ent.descripcion as descripcion_entidad, ent.telefono as telefono_entidad,
        ent.director as director_entidad, ent.ciudad as ciudad_entidad,
        act.id AS id_actividad, act.descripcion AS descripcion_actividad 
      FROM public.itinerario as it 
      INNER JOIN public.entidad as ent on it.id_entidad = ent.id 
      INNER JOIN public.actividad AS act ON act.id = it.id_actividad
      WHERE validado = true AND finalizado = false
    `;

    for( const [ key, value ] of Object.entries( data ) ){
      if( key != "fecha_itinerario" && key != "id_entidad" ){
        colums.push( key );
        values.push( value )
      }
      if( key == 'fecha_itinerario'){
        fechas.push( value );
      }

      if( key == 'id_entidad'){
        id_ent_send = value;
      }
    }

    for( let i = 0; i < colums.length; i++ ){
      sql += ` AND it.${colums[i]} LIKE '%${values[i]}%' `;
    }

    if( fechas.length > 0 ){
      sql +=  ` AND fecha_itinerario = '${ dt.getDateFormatyyyyMMDD( fechas[0] ) }' `;
    }

    if( id_ent_send ){
      sql +=  ` AND it.id_entidad = ${id_ent_send} `;
    }

    sql += 'ORDER BY it.id ASC';
    sql += ' ;';

    return sql;
  }

  /** GET SQL STRING FINALIZAR ITINERARIO
   * @Observations : Retorna sql string consulta.
   * @param { string } id => id de la entidad para la consulta.
   * @returns { string } => Sql string.
   */
  finalizarItinerarioSqlStrin( id ){
    let sql = `UPDATE itinerario SET finalizado = true WHERE id = ${id} ;`;
    return sql;
  }

};

module.exports = ItinerarioModel;


