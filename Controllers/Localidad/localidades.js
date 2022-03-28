'use strict'

const con = require('../../DB-connect/connectDB');
//const envProperties = require("../../env.vars.json");
//const node_env = process.env.NODE_ENV || 'developmen';
//const props = envProperties[node_env];
//const schema = props.DB.SCHEMA;


const fn = require('../../Custom/function_custom/custom');

const controller = {

  localidad : async ( req, res ) => {

    let action = req.body.action;

    switch( action ){

      case 'list-localidadesById' :
        
        let id_provincia = req.body.data.id_provincia;
        
        try{
          fn.validateType( 'number', id_provincia );
        }catch( err ){
          return res.status(500).send({ 'error' : `${err}` });
        }

        let sql_list_ById = listSqlstrById( id_provincia );

        try{
          let result_listById = await con.QueryAwait( sql_list_ById );
          return res.status(200).send({ 'error' : '', 'Resultset' : result_listById.rows });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error al obtener lista de localidad por ID: ${err}` });
        }

      break;

      case 'searchLocalidadesByName' :
        
        let id_pro = req.body.data.id_provincia;
        
        try{
          fn.validateType( 'number', id_provincia );
        }catch( err ){
          return res.status(500).send({ 'error' : `${err}` });
        }

        let sql_l = listSqlstrById( id_provincia );

        try{
          let result_listById = await con.QueryAwait( sql_list_ById );
          return res.status(200).send({ 'error' : '', 'Resultset' : result_listById.rows });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error al obtener lista de localidad por ID: ${err}` });
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

      case 'get-localidadById' :
      
        let id_get = req.body.data.id;

        con.select(`SELECT * FROM localidad WHERE id = ${id_get} ;`, ( error, result ) =>{
          if( !error ){
            return res.status(200).send({ 'error' : '', 'ResultSet' : result.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al intentar obtener localidad : ${error}` });
          }
        });

      break;
    }

  }

}

module.exports = controller;



/**   LIST LOCALIDADES
 * @Observations : Armo string sql para enviar lista de localidad.
 * @param paginador : Object => Objecto con la paginacion actual.
 * @return sql : String => String con la consulta a enviar a la base de datos.
 */
const listSqlstrById = ( id_provincia  ) =>{
  let sql = `SELECT loca.id AS id, loca.descripcion AS descr_localidad, pro.id AS id_provincia, pro.descripcion AS descr_provincia
             FROM localidad as loca
             INNER JOIN provincia as pro ON pro.id = loca.id_provincia
             WHERE loca.id_provincia = ${id_provincia}
             ORDER BY descr_localidad ASC ;`;

    return sql;
}

/**   LIST LOCALIDADES
 * @Observations : Armo string sql para enviar lista de localidad.
 * @param paginador : Object => Objecto con la paginacion actual.
 * @return sql : String => String con la consulta a enviar a la base de datos.
 */
const searchSqlstrById = ( id_provincia  ) =>{
  let sql = `SELECT loca.id AS id, loca.descripcion AS descr_localidad, pro.id AS id_provincia, pro.descripcion AS descr_provincia
             FROM localidad as loca
             INNER JOIN provincia as pro ON pro.id = loca.id_provincia
             WHERE pro.id_provincia = ${id_provincia} ANS loca.descripcion ILIKE '%${data}%'
             ORDER BY descr_localidad ASC ;`;

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
  let sql = `SELECT loca.id AS id, loca.descripcion AS descr_localidad, pro.id AS id_provincia, pro.descripcion AS descr_provincia
             FROM localidad as loca 
             INNER JOIN provincia as pro 
             ON loca.id_provincia = pro.id
             ORDER BY descr_localidad ASC 
            ;`;
  return sql;
}