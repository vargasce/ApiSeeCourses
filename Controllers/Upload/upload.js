'use strict'

const _uploadServices = require('../../Services/UploadFile/upload.service');
const dt = require('../../Custom/dates/dates');
const log = require('../../Services/Log/log.service');
const con = require('../../DB-connect/connectDB');

const controller = {
  
  upload : async ( req, res ) =>{

    try{
      let resultAdd = await _uploadServices.upload( req );
      return res.status(200).send({ 'error': '', 'ResultSet' : resultAdd });
    }catch( err ){
      await log.addLog( { id : 0, descripcion : 'Error upload file image', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${err}` } );
      return res.status(500).send({ 'error': `Error al cargar la imagen : ${err}` });
    }

  },
  
  goDown : async ( req, res ) =>{

    try{
      let resultAdd = await _uploadServices.godown( req );
      return res.sendFile( resultAdd );
    }catch( err ){
      await log.addLog( { id : 0, descripcion : 'Error goDown file image', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${err}` } );
      return res.status(500).send({ 'error': `Error al ralizar la consulta : ${err}` });
    }

  },

  uploadFiles : async ( req, res ) =>{

    try{
      let resultAdd = await _uploadServices.uploadFiles( req );
      return res.status(200).send({ 'error': '', 'ResultSet' : resultAdd });
    }catch( err ){
      await log.addLog( { id : 0, descripcion : 'Error upload file image', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${err}` } );
      return res.status(500).send({ 'error': `Error al cargar la imagen : ${err}` });
    }

  },
  
  goDownFiles : async ( req, res ) =>{

    try{
      let resultAdd = await _uploadServices.godownFile( req );
      return res.sendFile( resultAdd );
    }catch( err ){
      await log.addLog( { id : 0, descripcion : 'Error goDown file image', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${err}` } );
      return res.status(500).send({ 'error': `Error al ralizar el insert : ${err}` });
    }

  },

  eliminarArchivo : async ( req, res ) =>{
    try{
      await con.QueryAwait('BEGIN');
      let result = await con.QueryAwait(`DELETE FROM files WHERE id = ${req.body.data.id} ;`);
      let ok = await con.QueryAwait('COMMIT');
      if( ok ){
        return res.status(200).send({ 'error' : '', 'ResultSet' : result });
      }
    }catch( _error ){
      await con.QueryAwait('ROLLBACK');
      return res.status(500).send({ 'error' : `Error al eliminar archivo : ${_error} .`, 'ResultSet' : ''});
    }

  }


}

module.exports = controller;
