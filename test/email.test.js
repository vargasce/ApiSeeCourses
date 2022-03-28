'use strict'

/** TEST EMAIL
 * @Observation : Prueba para validar correcto funcionamiento de envio de email automaticos
 */ 

const email = require('../Services/Email/email.service');


describe("test-init", () =>{
	test("test", async ()=>{

		let data = {
			dataEmail : {
				TO : ["cristian.ema_91@hotmail.com"],
				FROM : "TEST",
				EMAIL : "cristian@gmail.com",
				SUBJECT : "Test",
				TITULO : "TEST",
				MESSAGE : "Aqui debe de ir el contenido del email, lo que sea necesario notificar al cliente, u obesavacoines."
			}
		};

		let expected = true;
		let result;

		try{
			result = await email.sendEmail( data.dataEmail );
			if( result ){
				expect(expected).toBe(true);
			}
		}catch( err ){
			console.log(err)
			expect(expected).toBe(false);
		}

	});
});

