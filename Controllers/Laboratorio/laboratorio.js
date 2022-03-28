'use strict'

const con = require('../../DB-connect/connectDB');
const usr = require('../../Custom/userSession/session');
const funciones = require('../../Custom/function_custom/custom');
const envProperties = require("../../env.vars.json");
const node_env = process.env.NODE_ENV || 'developmen';
const props = envProperties[node_env];
const schema = props.DB.SCHEMA;

const controller = {

  laboratorio : ( req, res ) => {
    
    let action = req.body.action;

    switch( action ){
      case 'add-laboratorio':
        
        let data_add = req.body.data;
        let sql_add = createSQL_add(data_add);
        
        con.insert( sql_add, ( error_add, response_add ) =>{
          if( !error_add ){
            return res.status(200).send({ 'error': '', 'Resultset': response_add.rows });
          }else{
            return res.status(400).send({ 'error': `Error al realizar la carga add laboratorio : ${error_add}` });
          }

        });

      break;
      case 'get-laboratorio':
         
        let columnSet = `id, codigo_pec, nombre, domicilio, telefono, id_procedencia, mail, sitio_web, nro_habilitacion, to_char(fecha_habilitacion,'dd/MM/yyyy') as fecha_habilitacion,
                         es_acreditado, to_char(fecha_vto_acreditacion,'dd/MM/yyyy') as fecha_vto_acreditacion, atiende_pami, atiende_capitados, es_de_clinica, to_char(fecha_baja,'dd/MM/yyyy') as fecha_baja,
                         id_motivo_baja, ugl`;

        funciones.getSqlForID( req.body.id, 'laboratorios', schema, 'id', columnSet ).then( ( laboratorio ) =>{
          return res.status(200).send({ 'error': '', 'Resultset': laboratorio.Resultset });
        }).catch( error => {
          return res.status(500).send({ 'error' : `Error al obtener laboratorio : ${error}` });
        });

      break;
      case 'list-laboratorio':
        
        let sql_list = createSQL_list( 1 );
        //let sql_list = createSQL_list( req.body.paginador );
        
        con.select( sql_list, ( error_list, response_list ) =>{
          if( !error_list ){
            return res.status(200).send({ 'error' : '', 'Resultset' : response_list.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al obtener lista laboratorios : ${error_list}` });
          }

        });

      break;
      case 'update-laboratorio':
        
        let data_update = req.body.data;
        let sql_update = createSQL_update( data_update );

        con.update( sql_update, ( error_update, response_update ) =>{
          if( !error_update ){
            return res.status(200).send({ 'error' : '', 'Resultset' : response_update.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al realizar update de laboratorio : ${error_update}` });
          }
        });

      break;
    }

  }
};


module.exports = controller;


/** ADD LABORATORIO
 * @Observations : Fundion para armar sql para agregar laboratorios.
 * @param data : Object => Objecto con los datos de laboratorio para agreagr
 * @returns sql : String => retorna string con la consulta sql para enviar.
 */
const createSQL_add = ( data )=>{
  let sql = `INSERT INTO ${schema}.laboratorios (
    codigo_pec,
    nombre,
    domicilio,
    telefono,
    id_procedencia,
    mail,
    sitio_web,
    nro_habilitacion,
    fecha_habilitacion,
    es_acreditado,
    ugl,
    fecha_vto_acreditacion,
    atiende_pami,
    atiende_capitados,
    es_de_clinica,
    fecha_baja,
    id_motivo_baja
    )
    VALUES(
    '${data.codigo_pec}',
    '${data.nombre}',
    '${data.domicilio}',
    '${data.telefono}',
    ${data.id_procedencia},
    '${data.mail}',
    '${data.sitio_web}',
    '${data.nro_habilitacion}',
    '${data.fecha_habilitacion}',
    ${data.es_acreditado},
    '${data.ugl}',
    '${data.fecha_vto_acreditacion}',
    ${data.atiende_pami},
    ${data.atiende_capitados},
    ${data.es_de_clinica},
    '${data.fecha_baja}',
    ${data.id_motivo_baja}
    );
  `;

  return sql;
}

/** LIST LABORATORIO
 * @Observations : Fundion para armar sql de lista de laboratorios con paginador.
 * @param paginador : Object => Objecto con datos de la paginacion actual de la pagina.
 * @returns sql : String => retorna string con la consulta sql para enviar.
 */
const createSQL_list = ( paginador ) =>{
  let sql = `SELECT id, codigo_pec, nombre, domicilio, telefono, id_procedencia, mail, sitio_web, nro_habilitacion, to_char(fecha_habilitacion,'dd/MM/yyyy') as fecha_habilitacion,
                             es_acreditado, to_char(fecha_vto_acreditacion,'dd/MM/yyyy') as fecha_vto_acreditacion, atiende_pami, atiende_capitados, es_de_clinica, to_char(fecha_baja,'dd/MM/yyyy') fecha_baja,
                             id_motivo_baja, ugl
            FROM ${schema}.laboratorios`;
  return sql;
}


/** UPDATE LABORATORIO
 * @Observations : Fundion para armar sql para update de laboratorio.
 * @param data : Object => Objecto con la data para crear sql update
 * @returns sql : String => retorna string con la consulta sql para enviar.
 */
const createSQL_update = ( data ) =>{
  let sql = `UPDATE ${schema}.laboratorios SET
    codigo_pec='${data.codigo_pec}',
    nombre='${data.nombre}',
    domicilio='${data.domicilio}',
    telefono='${data.telefono}',
    id_procedencia=${data.id_procedencia},
    mail='${data.mail}',
    sitio_web='${data.sitio_web}',
    nro_habilitacion='${data.nro_habilitacion}',
    fecha_habilitacion='01/01/2021',
    es_acreditado=${data.es_acreditado},
    ugl=${data.ugl},
    fecha_vto_acreditacion='01/01/2021',
    atiende_pami=${data.atiende_pami},
    atiende_capitados=${data.atiende_capitados},
    es_de_clinica=${data.es_de_clinica},
    fecha_baja='01/01/2021',
    id_motivo_baja=${data.id_motivo_baja}
    WHERE id = ${data.id}
  ;`;

  return sql;
}
