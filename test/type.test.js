
'use strict'

/** TEST VERIFICAR TIPO
 * @Observation : Verifica el correcto comportamiento de funcion validar tipos de datos.
 */ 

const fn = require('../Custom/function_custom/custom');

describe("Testing Type Values.", () =>{
	test("test string", ()=>{
		let valuesSuccess = 'string';
		let valuesError = 2;
		let expected = true;
		
		//For Success
		try{
			fn.validateType( 'string', valuesSuccess );
			expect(expected).toBe(true);
		}catch( err ){
			expect(expected).toBe(false);
		}

		//For Error
		try{
			fn.validateType( 'string', valuesError );
			expect(expected).toEqual(false);
		}catch( err ){
			expect(expected).toEqual(true);
		}

	});

	test("test number", ()=>{

		let valuesError = 'string';
		let valuesSuccess = 2;
		let expected = true;
		
		//For Success
		try{
			fn.validateType( 'number', valuesSuccess );
			expect(expected).toBe(true);
		}catch( err ){
			expect(expected).toBe(false);
		}

		//For Error
		try{
			fn.validateType( 'number', valuesError );
			expect(expected).toEqual(false);
		}catch( err ){
			expect(expected).toEqual(true);
		}

	});

	test("test boolean", ()=>{

		let valuesError = 'string';
		let valuesSuccess = true;
		let expected = true;
		
		//For Success
		try{
			fn.validateType( 'boolean', valuesSuccess );
			expect(expected).toBe(true);
		}catch( err ){
			expect(expected).toBe(false);
		}

		//For Error
		try{
			fn.validateType( 'boolean', valuesError );
			expect(expected).toEqual(false);
		}catch( err ){
			expect(expected).toEqual(true);
		}

	});


	test("test object", ()=>{

		let valuesError = 'string';
		let valuesSuccess = { success : true };
		let expected = true;
		
		//For Success
		try{
			fn.validateType( 'object', valuesSuccess );
			expect(expected).toBe(true);
		}catch( err ){
			expect(expected).toBe(false);
		}

		//For Error
		try{
			fn.validateType( 'object', valuesError );
			expect(expected).toEqual(false);
		}catch( err ){
			expect(expected).toEqual(true);
		}

	});

});
