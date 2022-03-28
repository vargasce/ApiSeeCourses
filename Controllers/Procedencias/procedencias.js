'use strict'

const con = require('../../DB-connect/connectDB');
const envProperties = require("../../env.vars.json");
const node_env = process.env.NODE_ENV || 'developmen';
const props = envProperties[node_env];
const schema = props.DB.SCHEMA;
const funciones = require('../../Custom/function_custom/custom');

const controller = {

  procedencias : ( req, res ) => {

    let action = req.body.action;

    switch( action ){

      case 'list-procedencias' :
        
        //let paginador = req.body.paginador;
        let sql_list = listSqlstr( 1 );

        con.select( sql_list, ( error_list, result_list ) => {
          if( !error_list ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_list.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al obtener lista de procedencias : ${error_list}` });
          }
        });

      break;

      case 'add-procedencias' :
        
        let data_add = req.body.data;
        let sql_add = addSqlStr( data_add );
    
        con.insert( sql_add, ( error_add, result_add ) => {
          if( !error_add ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_add.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al anadir procedencias` });
          }
        });

      break;

      case 'update-procedencias' :

        let data_update = req.body.data;
        let sql_update = updateSqlStr( data_update );

        con.update( sql_update, ( error_update, result_update ) => {
          if( !error_update ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_update.rows });
          }else{
            return res.status(200).sen({ 'error' : `Error al actualizar procedencias : ${error_update}` });
          }
        });

      break;

      case 'delete-procedencias' :

        let id_delete = req.body.id;
        let sql_delete = deleteSqlStr( id_delete );

        con.delete( sql_delete, ( error_delete, result_delete  ) => {
          if( !error_delete ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_delete.rows });
          }else{
            return res.statu(500).send({ 'error' : `Error al intentar eliminar procedencias : ${error_delete}` });
          }
        });  

      break;

      case 'get-procedencias' :
      
        let id_get = req.body.id;

        funciones.getSqlForID( id_get, 'procedencias', schema, 'id' ).then( ( procedencias ) => {
          return res.status(200).send({ 'error' : '', 'Resultset' : procedencias.Resultset });
        }).catch( ( error_get ) =>{
          return res.status(500).send({ 'error' : `Error al intentar obtener procedencias : ${error_get}` });
        });

      break;
    }

  }

}

module.exports = controller;



/**   LIST PROCEDENCIAS
 * @Observations : Armo string sql para enviar lista de procedencias.
 * @param paginador : Object => Objecto con la paginacion actual.
 * @return sql : String => String con la consulta a enviar a la base de datos.
 */
const listSqlstr = ( paginador = null ) =>{
  let sql = '';
  if(paginador){
    //Aun no tengo este metodo desarrollado, lo que seria para armar la consulta paginada.
    sql = `SELECT proce.id, provincia.id AS id_provincia, provincia.descripcion AS desc_prov, proce.localidad, proce.cod_postal, pais.id AS id_pais, pais.descripcion AS desc_pais
           FROM ${schema}.procedencias AS proce
           INNER JOIN ${schema}.paises AS pais ON proce.id_pais = pais.id
           INNER JOIN ${schema}.provincias AS provincia ON proce.id_provincia = provincia.id;`;
  }else{
    sql = `SELECT proce.id, provincia.id AS id_provincia, provincia.descripcion AS desc_prov, proce.localidad, proce.cod_postal, pais.id AS id_pais, pais.descripcion AS desc_pais
           FROM ${schema}.procedencias AS proce
           INNER JOIN ${schema}.paises AS pais ON proce.id_pais = pais.id
           INNER JOIN ${schema}.provincias AS provincia ON proce.id_provincia = provincia.id;`;
  }
  return sql;
}


/**   ADD PROCEDENCIAS
 * @Observations : Armo string sql para enviar anadir procedencias.
 * @param data : Object => Objecto con el nuevo registro.
 * @return sql : String => String con la consulta a enviar a la base de datos.
 */
const addSqlStr = ( data ) =>{

  let sql = `INSERT INTO ${schema}.procedencias (
    id_provincia,
    localidad,
    cod_postal,
    id_pais
    )
    VALUES(
    '${data.id_provincia}',
    '${data.localidad}',
    '${data.cod_postal}',
    ${data.id_pais}
    );`;

  return sql;
}


/**   UPDATE PROCEDENCIAS
 * @Observations : Armo string sql para enviar actualizar procedencias.
 * @param data : Object => Objecto con el nuevo registro.
 * @return sql : String => String con la consulta a enviar a la base de datos.
 */
const updateSqlStr = ( data ) =>{
  let sql = `UPDATE ${schema}.procedencias SET id_provincia = '${data.id_provincia}', localidad = '${data.localidad}', cod_postal = '${data.cod_postal}', id_pais = ${data.id_pais} WHERE id = ${data.id} ;`;
  return sql;
}


/**   DELETE PROCEDENCIAS
 * @Observations : Armo string sql para eliminar  procedencias.
 * @param id : String => id del registro a eliminar
 * @return sql : String => String con la consulta a enviar a la base de datos.
 */
const deleteSqlStr = ( id ) =>{
  let sql = `DELETE FROM ${schema}.procedencias WHERE id = ${id} ;`;
  return sql;
}
