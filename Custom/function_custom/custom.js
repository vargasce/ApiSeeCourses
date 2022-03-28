'use strict'

const errorType = require('../../Error/typeError');

const custom = {

	/** COMPLETE ZERO
	 * @Observations : Completa cero se utilza para generar codigos en las que se 
	 * requiere que se integren cero antes del codigo finla. PJ : ( '00012' ).
	 *
	 * @param number : integer => numero de codigo final.
	 * @param count : integer => tamaño de codigo.
	 */
	complete_zero : ( number, count ) => {

		let result_number = '';
		if( typeof number === 'number' && typeof count === 'number' ) {

			let numberStrig = number.toString();
			let numberSplit = numberStrig.split("");
			let cantDig = numberSplit.lenght;
			let diferencia = count - cantDig;

			if( diferencia > 0 ){

				let i = 0;
				for( i; i < diferencia; i++ ){
					result_number += "0";
				}

				result_number += numberStrig;
			}else{
				result_number = numberStrig;
			}
		
			result_number = numberStrig.padStart(count,'0');

		}

		return result_number;
	},

	/** VALIDATE TYPE
	 * @Observations : Valida el tipo de dato recibido por parametro,
	 * en caso de no ser del tipo a validar retorna un exception.
	 * valida ( string, number, object )
	 * @param { string } tipo => Tipo a validar ( number, string, boolean, object ).
	 * @param { viod } valor => variable a validar.
	 * @return { Exception } => new Exception Type TypeError.
	 */
	validateType : ( tipo, valor ) => {
	
		if( valor ){

			switch( tipo ){
				case 'string':
					if( typeof valor !== tipo ){
						throw new errorType('Error', 'Error, value is not String!!!');
					}
					//if( !isNaN( valor ) ){
						//throw new errorType('Error', 'Error, value is not String!!!');
					//}
				break;

				case 'number' :
					if( typeof valor !== tipo || isNaN( valor.toString() ) ){
						throw new errorType('Error', 'Error, value is not Number!!!');
					}
				break;

				case 'object' :
					if( typeof valor !== tipo ){
						throw new errorType('Error', 'Error, value is not Object!!!');
					}
				break;

				case 'boolean' :
					if( typeof valor !== tipo ){
						throw new errorType('Error', 'Error, value is not Boolean!!!');
					}
				break;

				default :
					throw new errorType('No definido', 'Error, value is not definido');
			};

		}else{
			throw new errorType('No definido', 'Error, value is void, null or undefined !!!');
		}

	}

};

module.exports = custom;
