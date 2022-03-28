'use strict'

const _entidadService = require('../../Services/Entidad/entidad.service');
const fn = require('../../Custom/function_custom/custom');
const dt = require('../../Custom/dates/dates');
const log = require('../../Services/Log/log.service');

process.on('unhandledRejection', (reason, p) => {
  console.log('Process Manualy Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

const controller = {
  
  entidad : async ( req, res ) =>{

    let action = req.body.action;

    try{
      fn.validateType( 'string', action );
    }catch( err ){
      return res.status(500).send({ 'error': `Error : ${err.getMessage()}` });
    }

    switch( action ){

      case 'addEntidad':
        
        try{
          let resultAdd = await _entidadService.AddEntidad( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
          await log.addLog( { id : 0, descripcion : 'Error addEndtidad.', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${ err }` } );
          return res.status(500).send({ 'error' : `${ err }` });
        }

      break;

      case 'getEntidad': 

        try{
          let resultAdd = await _entidadService.getEntidad( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error : ${ err.getMessage() }` });
        }

      break;

      case 'listEntidad':

        try{
          let resultAdd = await _entidadService.ListEntidad( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error : ${ err.getMessage() }` });
        }

      break;

      case 'updateEntidad' :

        try{
          let resultAdd = await _entidadService.UpdateEntidad( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
          await log.addLog( { id : 0, descripcion : 'Error updateEntidad.', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${ err }` } );
          return res.status(500).send({ 'error' : `Error : ${ err.getMessage() }` });
        }

      break;

      case 'verifyCuit' :

        try{

          let resultVerificacion = await _entidadService.verifyCuit( req.body.cuit );
          if( resultVerificacion == 0 ) return res.status(200).send({ 'error' : '', 'ResultSet' : resultVerificacion });
          return res.status(500).send({ 'error' : 'El cuit que se intenta ingresar ya existe.' });

        }catch( err ){
          await log.addLog( { id : 0, descripcion : 'Error verifyCuit entidad.', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${ err }` } );
          return res.status(500).send({ 'error' : `${err}`});
        }

      break;

      case 'getEntidadSelect' :

        try{
          let resultEnt = await _entidadService.getSelectEntidad();
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultEnt });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error : ${ err.getMessage() }` });
        }

      break;

      case 'listEntidadPaginado':

        try{
          let resultAdd = await _entidadService.ListEntidadPaginado( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error : ${ err }` });
        }

      break;


      default :
        return res.status(500).send({ 'error': `Accion no definida.` });
    }

  }
};

module.exports = controller;
