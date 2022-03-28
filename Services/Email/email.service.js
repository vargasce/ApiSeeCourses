'use strict'

const EmailError = require('../../Error/Email/emailError');
const envProperties = require("../../env.vars.json");
const fn = require('../../Custom/function_custom/custom');
const fs = require('fs');
const node_env = process.env.NODE_ENV || 'developmen';
const props = envProperties[node_env];
const nodeEmail = require('nodemailer');

class Email {
  
  constructor(){

  }

  /** SEND EMAIL
   * @module { Email.service.js }
   * @Observations : Envio de email.
   * @example dataSend :
   *{
   *  data = {
   *	  dataEmail : {
   *	  	TO      : ["cristian.ema_91@hotmail.com"],
   *		  FROM    : "TEST",
   *		  EMAIL   : "cristian@gmail.com",
   *		  SUBJECT : "Test",
   *		  TITULO  : "Test envio de email",
   *		  MESSAGE : "",
   *		  OBS     : ""
   *  	}
   *  };
   *}
   * @param { object } dataSend => Objecto con los datos descritos mas arriba.
   * @return { Promise } new Promise => returna nueva promesa con los resultados del envio email.
   */
   static sendEmail ( dataEmail ){
    return new Promise( async ( resolve, reject ) =>{
      
      try{
        fn.validateType( 'object', dataEmail );
      }catch( err ){
        throw err;
      }

      let dataSend = this.newObjectOption( dataEmail );

      try{

        let transporter = nodeEmail.createTransport( dataSend.service );
        let ok = await transporter.sendMail( dataSend.options );
        if ( ok ) resolve( ok );

      }catch( err ){
        throw err;
        //reject( new EmailError( 'Error Send Email', `Error intentando enviar email : ${err}` ) )
      }

    });
  }

  /** NEW TRANSPORTER
   * @Observations : Retorna nuevo transporter con la cabecera para envia de email.
   * @param { object } dataEmail => Obejecto con datos de usuario y servicio del usuario.
   * @returns { object } transporter => nuevo objecto.
   */
  static newObjectOption( dataEmail ){


    try{

      let html = this.getHtmlString( dataEmail );
      
      let obj = {
        service : {
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: props.Info.USER, 
            pass: props.Info.PASS
          }
        },
        options : {
          from : `"${dataEmail.FROM}" <${dataEmail.EMAIL}>`,
          to : `${dataEmail.TO.join(';')}`,
          subject : `${dataEmail.SUBJECT}`,
          html : `${html}`
        }
      };

      return obj;
    }catch( err ){
      throw new EmailError( 'Error Email', `Error create Object in newObjectOption email.service.js : ${err}` );
    }

  }

  /** GET HTML
   * @Observations : Retorna string con el html para enviar por email
   * @param { object } dataEmail => Objeto con los datos a completar.
   * @returns { object } transporter => nuevo objecto.
   */
  static getHtmlString ( dataEmail ){
    
    try{

      let gethtml = fs.readFileSync('./Services/Email/modelEmail.html');      
      gethtml = gethtml.toString().replace('TituloAdd', dataEmail.TITULO);
      gethtml = gethtml.toString().replace('MensajeAdd', dataEmail.MESSAGE);
      gethtml = gethtml.toString().replace('Observacion', dataEmail.OBS);
     return gethtml;

    }catch( err ){
      throw new EmailError( 'Error Email', `Error leyendo archivo html : ${err}` );
    }

  }
}

module.exports = Email;
