'use strict'

const con = require('../../DB-connect/connectDB');
//const envProperties = require("../../env.vars.json");
//const node_env = process.env.NODE_ENV || 'developmen';
//const props = envProperties[node_env];
//const schema = props.DB.SCHEMA;


const fn = require('../../Custom/function_custom/custom');

const controller = {

  provincias : async ( req, res ) => {

    let action = req.body.action;

    switch( action ){

      case 'list-provinciasById' :
        
        let id_pais = req.body.data.id_pais;
        
        try{
          fn.validateType( 'number', id_pais );
        }catch( err ){
          return res.status(500).send({ 'error' : `${err}` });
        }

        let sql_list_ById = listSqlstrById( id_pais );

        try{
          let result_listById = await con.QueryAwait( sql_list_ById );
          return res.status(200).send({ 'error' : '', 'Resultset' : result_listById.rows });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error al obtener lista de provincias por ID: ${err}` });
        }

      break;

      case 'list-provincias' :

        let sql_list = listSqlList();

        try{
          let result_list = await con.QueryAwait( sql_list );
          return res.status(200).send({ 'error' : '', 'Resultset' : result_list.rows });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error al obtener lista de provincias : ${err}` });
        }

      break;

      case 'add-provincias' :
        
        let data_add = req.body.data;
        let sql_add = addSqlStr( data_add );
    
        con.insert( sql_add, ( error_add, result_add ) => {
          if( !error_add ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_add.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al anadir provincias` });
          }
        });

      break;

      case 'update-provincias' :

        let data_update = req.body.data;
        let sql_update = updateSqlStr( data_update );

        con.update( sql_update, ( error_update, result_update ) => {
          if( !error_update ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_update.rows });
          }else{
            return res.status(200).sen({ 'error' : `Error al actualizar provincias : ${error_update}` });
          }
        });

      break;

      case 'delete-provincias' :

        let id_delete = req.body.data.id;
        let sql_delete = deleteSqlStr( id_delete );

        con.delete( sql_delete, ( error_delete, result_delete  ) => {
          if( !error_delete ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_delete.rows });
          }else{
            return res.statu(500).send({ 'error' : `Error al intentar eliminar provincias : ${error_delete}` });
          }
        });  

      break;

      case 'get-provinciaById' :
      
        let id_get = req.body.data.id;

        con.select(`SELECT * FROM provincia WHERE id = ${id_get} ;`, ( error, result ) =>{
          if( !error ){
            return res.status(200).send({ 'error' : '', 'ResultSet' : result.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al intentar obtener provincias : ${error}` });
          }
        });

      break;
    }

  }

}

module.exports = controller;



/**   LIST PROVINCIAS
 * @Observations : Armo string sql para enviar lista de provincias.
 * @param paginador : Object => Objecto con la paginacion actual.
 * @return sql : String => String con la consulta a enviar a la base de datos.
 */
const listSqlstrById = ( id_pais  ) =>{
  let sql = `SELECT prov.id AS id, prov.descripcion AS descr_provincia, pa.id AS id_pais, pa.descripcion AS descr_pais
             FROM provincia as prov 
             INNER JOIN pais as pa ON prov.id_pais = pa.id
             WHERE prov.id_pais = ${id_pais} ;`;

    return sql;
}


/**   ADD PROVINCIAS
 * @Observations : Armo string sql para enviar anadir provincias.
 * @param data : Object => Objecto con el nuevo registro.
 * @return sql : String => String con la consulta a enviar a la base de datos.
 */
const addSqlStr = ( data ) =>{

  let sql = `INSERT INTO provincia (
    descripcion,
    id_pais
    )
    VALUES(
    '${data.data.descripcion}',
    ${data.data.id_pais}
    );`;

  return sql;
}


/**   UPDATE PROVINCIAS
 * @Observations : Armo string sql para enviar actualizar provincias.
 * @param data : Object => Objecto con el nuevo registro.
 * @return sql : String => String con la consulta a enviar a la base de datos.
 */
const updateSqlStr = ( data ) =>{
  let sql = `UPDATE provincia SET id_pais = ${data.id_pais} , descripcion = '${data.descripcion}' WHERE id = ${data.id} ;`;
  return sql;
}


/**   DELETE PROVINCIAS
 * @Observations : Armo string sql para eliminar  provincias.
 * @param id : String => id del registro a eliminar
 * @return sql : String => String con la consulta a enviar a la base de datos.
 */
const deleteSqlStr = ( id ) =>{
  let sql = `DELETE FROM provincia WHERE id = ${id} ;`;
  return sql;
}

const listSqlList = () =>{
  let sql = `SELECT prov.id AS id, prov.descripcion AS descr_provincia, pa.id AS id_pais, pa.descripcion AS descr_pais
             FROM provincia as prov 
             INNER JOIN pais as pa 
             ON prov.id_pais = pa.id
             ORDER BY descr_pais ASC 
            ;`;
  return sql;
}