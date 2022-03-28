'use strict'

const _notificacionService = require('../../Services/Notificacion/notificacion.service');
const dt = require('../../Custom/dates/dates');
const log = require('../../Services/Log/log.service');
const fn = require('../../Custom/function_custom/custom');

const controller = {
  
  notificacion : async ( req, res ) =>{

    let action = req.body.action;

    try{
      fn.validateType( 'string', action );
    }catch( err ){
      return res.status(500).send({ 'error': `Error : ${err.getMessage()}` });
    }

    switch( action ){

      case 'addNotificacion':
        
        try{
          let resultAdd = await _notificacionService.addNotificacion( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
  			  await log.addLog( { id : 0, descripcion : 'Error addNotificacion', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${err}` } );
          return res.status(500).send({ 'error' : `Error : ${ err }` });
        }

      break;

      case 'getNotificacion': 

        try{
          let resultAdd = await _notificacionService.getNotificacion( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error : ${ err }` });
        }

      break;

      case 'listNotificacion':

        try{
          let resultAdd = await _notificacionService.listNotificacion( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error : ${ err.getMessage() }` });
        }

      break;

      case 'updatePendingNotificacion':

        try{
          let resultUpdatePending = await _notificacionService.updatePendingAwait( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultUpdatePending });
        }catch( err ){
  			  await log.addLog( { id : 0, descripcion : 'Error updatePendingNotificacion', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${err}` } );
          return res.status(500).send({ 'error' : `Error : ${err}` });
        }
      break;

      case 'updateRejectedNotificacion':

        try{
          let resultUpdatePending = await _notificacionService.updateRejected( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultUpdatePending });
        }catch( err ){
  			  await log.addLog( { id : 0, descripcion : 'Error updateRejectedNotificacion', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${err}` } );
          return res.status(500).send({ 'error' : `Error : ${err}` });
        }

      break;

      case 'updateVistoNotificacion' :

        try{
          let resultUpdatePending = await _notificacionService.updateVisto( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultUpdatePending });
        }catch( err ){
  			  await log.addLog( { id : 0, descripcion : 'Error updateVistoNotificacion', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${err}` } );
          return res.status(500).send({ 'error' : `Error : ${err}` });
        }

      break;

      case 'getListPendingNotificacion' :

        try{
          let resultUpdatePending = await _notificacionService.getListNotificacionAdmin( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultUpdatePending });
        }catch( err ){
  			  await log.addLog( { id : 0, descripcion : 'Error getListPendingNotificacion', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${err}` } );
          return res.status(500).send({ 'error' : `Error : ${err}` });
        }

      break;

      case 'getListPendingNotificacionEntidad' :

        try{
          let resultUpdatePending = await _notificacionService.getListNotificacionEntidad( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultUpdatePending });
        }catch( err ){
  			  await log.addLog( { id : 0, descripcion : 'Error getListPendingNotificacion', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${err}` } );
          return res.status(500).send({ 'error' : `Error : ${err}` });
        }

      break;


      default :
        return res.status(500).send({ 'error' : `Controlador no encontrado!!!` });

    }

  }
};

module.exports = controller;


