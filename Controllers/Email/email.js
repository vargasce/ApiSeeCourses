'use strict'
//SEND EMAIL
const _emailService = require('../../Services/Email/email.service');
const dt = require('../../Custom/dates/dates');
const log = require('../../Services/Log/log.service');

const controller = {

  emailController : async ( req, res ) => {

    let action = req.body.action;

    switch( action ){

      case 'sendEmail' :
        
        try{
          let result = await _emailService.sendEmail( req.body.data );
          //let result = "";
          return res.status(200).send({ 'error' : '', 'Resultset' : result });
        }catch( err ){
          await log.addLog( { id : 0, descripcion : 'Error sendEmail.', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${ err }` } );
          return res.status(500).send({ 'error' : `Error : ${err}` });
        }

      break;

    }

  }

}

module.exports = controller;


