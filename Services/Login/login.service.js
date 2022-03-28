'use strict'

const con = require('../../DB-connect/connectDB');
const md5 = require('md5');
const envProperties = require("../../env.vars.json");
const node_env = process.env.NODE_ENV || 'developmen';
const props = envProperties[node_env];
const schema = props.DB.SCHEMA;
const fn = require('../../Custom/function_custom/custom');


const loginService = {

  /** LOGIN
   * @Observations : Realiza la consulta de usuario.
   * @param { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  login : ( req ) =>{
    return new Promise( async ( resolve, reject ) =>{

      let data = req.body.data;
      let tabla = req.body.tipo == 'admin' ? 'usuario_admin' : 'usuario';

      let sql = getSqlLogin( tabla, data )
      con.select( sql, ( error, result ) =>{
        if( !error ){
          if( result.rowCount > 0 ){
            resolve( result.rows[0] )
          }else{
            reject('El usuario o contraña no son correctos !!!');
          }
        }else{
          reject( `Error al realizar la consulta : ${error}` );
        }
      });

    });
  },

  /** LOGIN ADMIN
   * @Observations : Realiza la consulta de usuario admin.
   * @param { Object } data => Data.
   * @returns { Promise } => new Promise.
   */
  loginAdmin : ( data ) =>{
    return new Promise( async ( resolve, reject ) =>{

      let sql = getSqlLoginAdmin( data );

      try{
        let result = await con.QueryAwait( sql );
        if( result.rowCount > 0 ){
          resolve( result.rows[0] );
        }else{
          reject( `El usuario o contraseña son incorrectos !!!`);
        }
      }catch( err ){
        reject(`Error al realizar la consulta : ${err}`);
      }

    });
  }

}

module.exports = loginService;


const getSqlLogin = ( tipo, data ) =>{
  let sql = '';
  if( tipo == 'usuario'){
    sql = `SELECT usro.id, usro.usuario, enti.id AS id_entidad, enti.nombre AS nombre_entidad, enti.email AS email 
           FROM usuario AS usro
           INNER JOIN entidad AS enti
           ON usro.id = enti.id_usuario
           WHERE usuario = '${data.usuario}' AND pass = '${md5(data.pass)}' AND activo = true ;`;
  }else{
    sql = `SELECT admin.id AS id_administrador, admin.activo AS activo_administrador, admin.nombre AS nombre_administrador, admin.apellido AS apellido_administrador,
                  admin.email AS email_administrador, admin.dni AS dni_administrador, usadmin.id_rol AS rol_usadmin , usadmin.usuario AS usuario_usadmin, usadmin.pass_actualizado AS usadmin_passActualizado
           FROM usuario_admin AS usadmin 
           INNER JOIN administrador AS admin 
           ON admin.id = usadmin.id_administrador
           WHERE usadmin.usuario = '${data.usuario}' AND usadmin.contrasenia = '${md5(data.pass)}' AND usadmin.activo = true ;
           `;
  }
  return sql;
}

const getSqlLoginAdmin = ( data ) =>{
  let sql = `SELECT admin.id AS id_administrador, admin.activo AS activo_administrador, admin.nombre AS nombre_administrador, admin.apellido AS apellido_administrador,
                admin.email AS email_administrador, admin.dni AS dni_administrador, usadmin.id_rol AS rol_usadmin , usadmin.usuario AS usuario_usadmin, usadmin.pass_actualizado AS usadmin_passActualizado
          FROM usuario_admin AS usadmin 
          INNER JOIN administrador AS admin 
          ON admin.id = usadmin.id_administrador
          WHERE usadmin.usuario = '${data.usuario}' AND usadmin.pass_extremo = '${md5(data.pass)}' AND usadmin.activo = true ;
          `;
  return sql;
}