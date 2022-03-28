'use strict'

const _usuarioService = require('../../Services/Usuario/usuario.service');
const fn = require('../../Custom/function_custom/custom');

const controller = {

  usuario : async ( req, res ) => {
    
    let action = req.body.action;
    try{
      fn.validateType( 'string', action );
    }catch( e ){
      return res.status(200).send({ 'error': `Error : ${e.getMessage()}` });
    }

    switch( action ){

      case 'addUsuario':
        
        try{
          let resultAdd = await _usuarioService.addUsuario( req );
          return res.status(200).send({ 'error': '', 'ResultSet' : resultAdd });
        }catch( err ){
          return res.status(500).send({ 'error': `Error al ralizar el insert : ${e}` });
        }

      break;

      case 'listUsuario':
        
        try{
          let resultList = await _usuarioService.listUsuario();
          return res.status(200).send({ 'error': '', 'Resultset': resultList });
        }catch( err ){
          return res.status(500).send({ 'error': `Error al consultar la lista : ${err}` });
        }

      break;

      case 'updateValidateUser':

        try{
          let resultUpdateA = await _usuarioService.updateActiveUsuario( req );
          return res.status(200).send({ 'error': '', 'Resultset': resultUpdateA });
        }catch( err ){
          return res.status(500).send({ 'error': `Error al actualiza el activo : ${err}` });
        }

      break;
      
      case 'verifyUser' :

        try{

          let resultVerificacion = await _usuarioService.verifyUser( req.body.name );
          if( resultVerificacion == 0 ) return res.status(200).send({ 'error' : '', 'ResultSet' : resultVerificacion });
          return res.status(500).send({ 'error' : 'El usuario que se intenta ingresar ya existe.' });

        }catch( err ){
          return res.status(500).send({ 'error' : `${err}`});
        }

      break;

      case 'verifyUserToken' :

          try{
              let result = await _usuarioService.verificaUsuarioEntidad( req.body.token );
              if( result ) res.status( 200 ).send({ 'error' : '', 'ResultSet' : result });
              return res.status( 200 ).send({ 'error' : 'No se pudo Autenticar el usuario.', 'ResultSet' : result });

          }catch( error ){
              return res.status( 500 ).send({ 'error' : error });
          }
          
      break;

      default :
        return res.status(500).send({ 'error': `Accion no definida.` });
    };

  }
};

module.exports = controller;
