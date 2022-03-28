'use strict'

const NotificacionError = require('../../Error/Notificacion/notificacionError');
const Paginador = require('../../Custom/paginador/paginador');
const dt = require('../../Custom/dates/dates');

class Notificacion {

  constructor( data = null ){
    if( data ){
      this.id = data.id;
      this.id_entidad = data.id_entidad;
      this.id_estado = data.id_estado;
      this.id_curso = data.id_curso;
      this.visto = data.visto;
      this.es_admin = data.es_admin;
      this.pendiente = data.pendiente;
      this.descripcion = data.descripcion;
      this.observacion = data.observacion;
      this.fecha  = data.fecha;
      this.es_curso = data.es_curso;
    }
  }

  getId (){ return this.id; }
  getIdEntidad (){ return this.id_entidad; }
  getIdEstado (){ return this.id_estado; }
  getVisto (){ return this.visto; }
  getEsAdmin (){ return this.es_admin; }
  getPendiente (){ return this.pendiente; }
  getDescripcion (){ return this.descripcion; }
  getObservacion (){ return this.observacion; }
  getFecha (){ return this.fecha; }
  getEsCurso(){ return this.es_curso; }
  getIdCurso(){ return this.id_curso; }

  setId ( id ){ this.id = id; }
  setIdEntidad ( id_entidad ){ this.id_entidad = id_entidad; }
  setIdEstado ( id_estado ){ this.id_estado = id_estado; }
  setVisto ( visto ){ this.visto = visto; }
  setEsAdmin ( es_admin ){ this.es_admin = es_admin; }
  setPendiente ( pendiente ){ this.pendiente = pendiente; }
  setDescripcion ( descripcion ){ this.descripcion = descripcion; }
  setObservacion ( observacion ){ this.observacion = observacion; }
  setEsCurso( es_curso ){ this.es_curso = es_curso; }
  setIdCurso( id_curso ){ this.id_curso = id_curso; }

  /** GET STRING INSERT
   * @Observations : Construye string para insert a base de datos.
   * @returns { string } => Sql string;
   */
  getSqlString(){
    let sql = `
      INSERT INTO notificacion(
        id_entidad,
        id_estado,
        id_curso,
        visto,
        es_admin,
        pendiente,
        descripcion,
        observacion,
        fecha,
        es_curso
    )
    VALUES(
        ${this.getIdEntidad()},
        ${this.getIdEstado()},
        ${this.getIdCurso()},
        ${this.getVisto()},
        ${this.getEsAdmin()},
        ${this.getPendiente()},
        '${this.getDescripcion()}',
        '${this.getObservacion()}',
        '${dt.getDateCurrentStringCustom()}',
        ${this.getEsCurso()}
    );
    `;

    return sql;
  }


  /** GET STRING UPDATE
   * @Observations : Construye string para update a base de datos.
   * @returns { string } => Sql string;
   */
  getSqlStringUpdate(){
    let sql = `
      UPDATE notificacion SET
        id_entidad = ${this.getIdEntidad()},
        id_estado = ${this.getIdEstado()},
        id_curso = ${this.getIdCurso()},
        visto = ${this.getVisto()},
        es_admin = ${this.getEsAdmin()},
        pendiente = ${this.getPendiente()},
        descripcion = '${this.getDescripcion()}',
        observacion = '${this.getObservacion()}',
        fecha = '${this.getFecha()}',
        es_curso = ${this.getEsCurso()}
      WHERE id = ${this.getId()} ;`;

    return sql;
  }

  /** UPDATE VALIDATE
   * @Observations : Actualiza la validacion del notificacion.
   * @returns { string } => Sql string.
   */
  getSqlStringPending(){

    let sql = `
      UPDATE notificacion SET
        pendiente = ${ this.getPendiente() },
        visto = ${ this.getVisto() }
      WHERE id = ${ this.getId() }
      ;`;
    return sql;
  }


  /** UPDATE REACHAZADO
   * @Observations : Actualiza la validacion del notificacion.
   * @returns { string } => Sql string.
   */
  getSqlStringRechazado(){
    let sql = `
      UPDATE notificacion SET
        pendiente = ${this.getPendiente()},
        visto = ${this.getVisto()}
      WHERE id = ${this.getId()}
      ;`;
    return sql;
  }

  /** GET STRING BY ID
   * @Observations : Obtener notificacion por id.
   * @param { Object } filtro => filtro para aplicar en la consulta de notificacion por id.
   * @returns { string } => Sql string;
   */
  getSqlStringById( filtro = null ){
    let sql;

    if( filtro.es_entidad == false ){ // POR ENTIDAD
      sql = `
      SELECT noti.id,
      noti.id_entidad,
      noti.id_estado,
      noti.visto,
      noti.es_admin,
      noti.pendiente,
      noti.descripcion,
      noti.observacion,
      to_char( noti.fecha, 'yyyy-MM-DD' ) AS fecha,
      noti.es_curso,
      noti.id_curso,
      it.id AS id_itinerario,
      it.id_entidad AS id_entidad_itinerario,
      it.nombre AS nombre_itinerario,
      it.titulo AS titulo_itinerario,
      it.descripcion AS descripcion_itinerario,
      it.observacion AS observacion_itinerario,
      to_char( it.fecha_itinerario, 'yyyy-MM-DD' ) AS fecha_itinerario,
      it.hora_itinerario,
      to_char( it.fecha_alta, 'yyyy-MM-DD' ) AS fecha_alta_itinerario,
      it.imagen AS imagen_itinerario,
      it.link AS link_itinerario,
      it.instructor AS instructor_itinerario, 
      it.viewed AS viewed_itinerario,
      it.validado AS validado_itinerario,
      it.finalizado AS finalizado_itinerario,
      enti.id AS id_entidad_table,
      enti.verificado AS verificado_entidad_table,
      enti.nombre AS nombre_entidad_table,
      enti.nombre AS nombre_entidad,
      enti.email AS email_entidad,
      enti.id AS id_entidad_table,
      enti.id_provincia AS provincia_entidad,
      enti.id_pais AS pais_entidad,
      enti.descripcion AS descripcion_entidad,
      enti.web AS web_entidad,
      enti.direccion AS direccion_entidad,
      enti.telefono AS telefono_entidad,
      enti.imagen AS imagen_entidad,
      enti.cuit AS cuit_entidad,
      enti.ciudad AS ciudad_entidad,
      enti.director AS director_entidad,
      pas.descripcion AS pais_entidad,
      prov.descripcion as provincia_entidad,
      act.descripcion AS actividad_entidad,
      loca.id AS id_localidad,
      loca.descripcion AS descripcion_localidad,
      it.email_consulta,
      it.telefono_consulta
FROM notificacion AS noti
FULL OUTER JOIN itinerario AS it ON noti.id_curso = it.id
INNER JOIN entidad AS enti ON enti.id = noti.id_entidad
INNER JOIN pais AS pas ON pas.id = it.id_pais
INNER JOIN provincia AS prov ON prov.id = it.id_provincia
INNER JOIN localidad AS loca ON loca.id = it.id_localidad
INNER JOIN actividad AS act ON act.id = it.id_actividad
WHERE enti.verificado = true AND noti.pendiente = true and noti.es_admin = true
AND noti.es_curso = true
ORDER BY noti.id DESC
      `;
    }else{
      sql = `
       
      SELECT
      noti.id,
      noti.descripcion,
      to_char( noti.fecha, 'yyyy-MM-DD' ) AS fecha,
    enti.id AS id_entidad_table,
        enti.verificado AS verificado_entidad_table,
        enti.nombre AS nombre_entidad_table,
        enti.nombre AS nombre_entidad,
        enti.email AS email_entidad,
        enti.id AS id_entidad_table,
        enti.id_provincia AS provincia_entidad,
        enti.id_pais AS pais_entidad,
        enti.descripcion AS descripcion_entidad,
        enti.web AS web_entidad,
        enti.direccion AS direccion_entidad,
        enti.telefono AS telefono_entidad,
        enti.imagen AS imagen_entidad,
        enti.cuit AS cuit_entidad,
        enti.ciudad AS ciudad_entidad,
        enti.director AS director_entidad,
      pas.id AS id_pais,
      pas.descripcion AS descripcion_pais,
      prov.id AS id_provincia,
      prov.descripcion AS descripcion_provincia
          FROM notificacion AS noti
          INNER JOIN entidad AS enti ON enti.id = noti.id_entidad
      INNER JOIN pais AS pas ON pas.id = enti.id_pais
          INNER JOIN provincia AS prov ON prov.id = enti.id_provincia
      WHERE enti.verificado = false AND noti.pendiente = true AND noti.es_admin = true AND noti.es_curso = false
          ORDER BY noti.id DESC;`;
    }


    return sql;
  }


   /** LIST STRING
   * @Observations : Obtener list notificacion.
   * @param { Object } filtro => filtro para aplicar en la consulta de notificacion por id.
   * @returns { string } => Sql string;
   */
  getSqlStringList( filtro = null, data ){
    let sql;
    let pag;

    if( data.next == true ){
      pag = Paginador.nextPage( data )
    }else{
      pag = Paginador.backPage( data )
    }

    if( filtro ){
      sql = `
        SELECT * FROM notificacion
        WHERE id = ${this.getId()} ORDER BY DESC LIMIT ${pag.countPage} OFFSET ${pag.finalPage} ;`;
    }else{
      sql = `
        SELECT * FROM notificacion
        WHERE id = ${this.getId()} ORDER BY DESC LIMIT ${pag.countPage} OFFSET ${pag.finalPage} ;`;
    }

    return sql;
  }

   /** GET SQL STRING UPDATE VIEW
   * @Observations : Obtener list notificacion.
   * @returns { string } => Sql string;
   */
  getSqlStringVisto( ){
    let sql = `
      UPDATE notificacion SET
        visto = ${this.getVisto()}
      WHERE id = ${this.getId()}
    ;`;
    return sql;
  }

  /** OBTENER LISTA DE NOTIFICACIONES PARA Administrado
   * @Observations => Lista de notificaciones
   * @returns { string }
   */
  getSqlStringListNotiAmin(){

    let sql = `
      SELECT id, id_entidad, id_estado, visto, es_admin, pendiente, descripcion, observacion, to_char( fecha, 'yyyy-MM-DD' ) AS fecha, es_curso, id_curso
	    FROM public.notificacion
	    WHERE visto = false AND pendiente = true AND es_admin = true
      ORDER BY id ASC;
    `;

    return sql;
  }

/** OBTENER LISTA DE NOTIFICACIONES PARA ENTIDAD
   * @Observations => Lista de notificaciones
   * @returns { string }
   */
  getSqlStringListNotiEntidad( id ){

    let sql = `
      SELECT id, id_entidad, id_estado, visto, es_admin, pendiente, descripcion, observacion, to_char( fecha, 'yyyy-MM-DD' ) AS fecha, es_curso, id_curso
	    FROM public.notificacion
	    WHERE visto = false AND pendiente = true AND es_admin = false AND id_entidad = ${id}
      ORDER BY id ASC;
    `;

    return sql;
  }

}


module.exports = Notificacion;

