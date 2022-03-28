'use strict'

const con = require('../../DB-connect/connectDB');

const controller = {
  parametrizacion : async ( req, res ) =>{

    let action = req.body.action;

    switch( action ){

      case 'getListFiles' :

        try{
          await con.QueryAwait('BEGIN');
          let result = await con.QueryAwait(`SELECT * FROM files WHERE id_itinerario = ${req.body.data.id_itinerario}`);
          let ok = await con.QueryAwait('COMMIT');
          if( ok ){
            return res.status(200).send({ 'error' : '', 'ResultSet' : result.rows });
          }
        }catch( _error ){
          await con.QueryAwait('ROLLBACK');
          return res.status(500).send({ 'error' : `Error al obtener lista de archivos : ${_error} .`, 'ResultSet' : ''});
        }

      break;

      case 'listRoles' :

        try{
          await con.QueryAwait('BEGIN');
          let result = await con.QueryAwait(`SELECT * FROM rol ;`);
          let ok = await con.QueryAwait('COMMIT');
          if( ok ){
            return res.status(200).send({ 'error' : '', 'ResultSet' : result.rows });
          }
        }catch( _error ){
          await con.QueryAwait('ROLLBACK');
          return res.status(500).send({ 'error' : `Error al obtener lista de roles : ${_error} .`, 'ResultSet' : `${action}`});
        }

      break;

      default:
        return res.status(500).send({ 'error' : `Error action no definido .`, 'ResultSet' : ''});
    }

  }
}


module.exports = controller;
