'use strict'

const _itinerarioService = require('../../Services/Itinerario/itinerario.service');
const fn = require('../../Custom/function_custom/custom');
const log = require('../../Services/Log/log.service');
const dt = require('../../Custom/dates/dates');

const controller = {

  itinerario : async ( req, res ) =>{

    let action = req.body.action;
    
    try{
      fn.validateType('string', action );
    }catch( e ){
      return res.status(500).send({ 'error': `Error al intentar realizar la consulta : ${e.getMessage()}` });
    }

    switch( action ){

      case 'getItinerarioByTitle' :

        try{
          let resultItinerario = await _itinerarioService.getItinerarioSearch( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultItinerario });
        }catch( error ){
          return res.status(500).send({ 'error' : `Error en la consulta : ${error}` });
        }
      break;

      case 'getItinerarioById' :

        try{
          let resultItinerario = await _itinerarioService.getItinerarioById( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultItinerario });
        }catch( error ){
          return res.status(500).send({ 'error' : `Error en la consulta : ${error}` });
        }
      break;

      case 'getItinerarioList' :
        try{
          let resultList = await _itinerarioService.getMostViewed( req );
          return res.status(200).send({ 'error': '', 'ResultSet' : resultList });
        }catch( error ){
          return res.status(200).send({ 'error' : `Error en la consulta : ${error}` });
        }
      break;

      case 'addItinerario': 
        try{
          let resultAdd = await _itinerarioService.addItinerario( req );
          return res.status(200).send({ 'error': '', 'ResultSet': resultAdd });
        }catch( error ){
          await log.addLog( { id : 0, descripcion : 'Error add itinerario', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : error.getMessage() } );
          return res.status(500).send({ 'error' : `Error al realizar el insert : ${error}` });
        }
      break;

      case 'updateItinerario': 
        try{
          let resultAdd = await _itinerarioService.updateItinerario( req );
          return res.status(200).send({ 'error': '', 'ResultSet': resultAdd });
        }catch( error ){
          await log.addLog( { id : 0, descripcion : 'Error update itinerario', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : error.getMessage() } );
          return res.status(500).send({ 'error' : `Error al realizar el insert : ${error}` });
        }
      break;

      case 'validateItinerario': 
        try{
          let resultAdd = await _itinerarioService.updateValidate( req );
          return res.status(200).send({ 'error': '', 'ResultSet': resultAdd });
        }catch( error ){
          await log.addLog( { id : 0, descripcion : 'Error validando itinerario', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : error.getMessage() } );
          return res.status(500).send({ 'error' : `Error al realizar el insert : ${error}` });
        }
      break;

      case 'getItinerarioByIdEntidad': 
        try{
          let resultAdd = await _itinerarioService.getItinerarioByEntidadId( req );
          return res.status(200).send({ 'error': '', 'ResultSet': resultAdd });
        }catch( e ){
          return res.status(500).send({ 'error' : `${e}` });
        }
      break;

			case 'getAvailabilityDate' :
				try{
					let resultAvailableDate = await _itinerarioService.getAvailabilityDate( req.body.data );
					return res.status(200).send({ 'error': '', 'ResultSet' : resultAvailableDate });
				}catch( err ){
          await log.addLog( { id : 0, descripcion : 'Error getAvailabilityDate itinerario', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : err.getMessage() } );
					return res.status(500).send({ 'error' : `${err}`});
				}
			break;

      case 'getItinerarioFilter' :

				try{
					let resultFilter = await _itinerarioService.getItinerarioByFilter( req.body.data );
					return res.status(200).send({ 'error': '', 'ResultSet' : resultFilter });
				}catch( err ){
          await log.addLog( { id : 0, descripcion : 'Error get itinerario filter', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : err.getMessage() } );
					return res.status(500).send({ 'error' : `${err}`});
				}

      break;

      case 'incrementViewed' :

        try{
          let resultCounterViewed = await _itinerarioService.incrementViewed( req.body.data.id );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultCounterViewed });
        }catch( err ){
          await log.addLog( { id : 0, descripcion : 'Error IncrementViewed.', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${ err.getMessage() }` } );
          return res.status(500).send({ 'error' : `${err}`});
        }

      break;

      case 'finalizarItinerario' :

				try{
					let resultFinalizar = await _itinerarioService.finalizarItinerario( req.body.data.id );
					return res.status(200).send({ 'error': '', 'ResultSet' : resultFinalizar });
				}catch( err ){
          await log.addLog( { id : 0, descripcion : 'Error finalizar itinerario', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : err.getMessage() } );
					return res.status(500).send({ 'error' : `${err}`});
				}

      break;

      case 'getItinerarioListTotal' :
        try{
          let resultList = await _itinerarioService.getTotalList( );
          return res.status(200).send({ 'error': '', 'ResultSet' : resultList });
        }catch( error ){
          return res.status(200).send({ 'error' : `Error en la consulta : ${error}` });
        }
      break;

      default :
        return res.status(500).send({ 'error' : `Controlador no encontrado!!!` });

    };

  }

};

module.exports = controller;
