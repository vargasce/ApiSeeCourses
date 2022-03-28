'use strict'

//const moment = require('moment');

/** METODOS PARA MENEJO DE FECHAS.
 * @Observations : La idea es centralizar todos los datos de fechas,
 * asi mantaner instacias y usos generales de los mismos.
 */

/** OBTENER FECHA ACTUAL EN STRING
 * @Observations : Retorna fecha actual en formato de string.
 * tener encuanta que retorna string completo en español.
 * @returns fecha : string.
 */ 
const getDateCurrentString = () => {
	let date = new Date();
	let options = {
		//weekday: 'long',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	};

	return date.toLocaleDateString( `es-MX` , options );
}

/** OBTENER FECHA ACTUAL STRING CUSTOM
 * @Observations : Retorna fecha actual en formato  de string,
 * en este caso la fecha es armada a mano en forma de  (yyyy-MM-DD);
 * @Retorna fecha : string => custom striong (yyyy-MM-DD)
 */ 
const getDateCurrentStringCustom = () => {
	let date = new Date();
	return `${date.getFullYear().toString()}-${( date.getMonth()+1 ).toString()}-${date.getDate().toString()}`;
}

/** PARSEAR FECHA
 * @Observations : Retorna fecha parseada.
 * en este caso la fecha es armada a mano en forma de  (yyyy-MM-DD);
 * @param { string } fecha => Fecha para realizar el parse.
 * @Retorna fecha : string => custom striong (yyyy-MM-DD)
 */ 
const getDateFormatyyyyMMDD = ( fecha ) => {
	let date = new Date( fecha );
	return `${date.getFullYear().toString()}-${( date.getMonth()+1 ).toString()}-${ (date.getDate()+1).toString()}`;
}


/** OBTENER FECHA ACTUAL.  
 * @Observations : Retorna fecha actual, instancia Date.
 * @returns fecha : Date.
 */ 
const getDateCurrent = () => {
	return new Date();
}

/** OBTENER FECHA ACTUAL POR FECHA.  
 * @Observations : Retorna fecha actual, instancia Date.
 * @param { strin } => Fecha actual.
 * @returns fecha : Date.
 */ 
const getDateCurrentComplete = ( fecha ) => {
	return new Date( fecha );
}


/** OBTENER HORA Y MINUTOS ACTUAL.
 * @Observations : Retorna hora y minutos actual en formato
 * de string.
 * @returns time : string
 */ 
const getHourMinuteCurrent = () => {
	let date = new Date();
	let hour = ('0'+date.getHours() .toString()).slice(-2);
	let minute = ('0'+date.getMinutes().toString()).slice(-2);
	let seconds = ('0'+date.getSeconds().toString()).slice(-2);
	return `${hour}:${minute}:${seconds}`;
}

/** VALIDATE RANGE TIME
 * @Observations : Se retorna TRUE/FALSE si existe solapamiento de fecheas.
 * @param { string } hora 		  => Fecha de trabajo.
 * @param { string } hInitBase    => Hora inicio base.
 * @param { string } hEndBase 	  => Hora fin base.
 * @param { string } hInitCompare => Hora inicio comparar.
 * @param { string } hEndCompare  => Hora fin compare.
 * @returns { boolean } => TRUE or FALSE. 
 */
const belongsRangeTime = ( fecha, hInitBase, hEndBase, hInitCompare, hEndCompare ) =>{
	let fehcaBaseI    = getDateCurrentComplete( `${fecha} ${hInitBase}`);
	let fehcaBaseE 	  = getDateCurrentComplete( `${fecha} ${hEndBase}`);
	let fehcaCompareI = getDateCurrentComplete( `${fecha} ${hInitCompare}`);
	let fehcaCompareE = getDateCurrentComplete( `${fecha} ${hEndCompare}`);

	if( fehcaCompareI.getTime() > fehcaBaseI.getTime() && fehcaCompareI.getTime() < fehcaBaseE.getTime() ){
		return false;
	}

	if( fehcaCompareE.getTime() > fehcaBaseI.getTime() && fehcaCompareE.getTime() < fehcaBaseE.getTime() ){
		return false;
	}

	// 12:00:00 13:30:00     11:30:00 12:15:00
	if( fehcaBaseI.getTime() >= fehcaCompareI.getTime() && fehcaBaseI.getTime() <= fehcaCompareE.getTime() ){
		return false;
	}

	return true;
}

module.exports = {
	getDateCurrentString : getDateCurrentString,
	getDateCurrent : getDateCurrent,
	getHourMinuteCurrent : getHourMinuteCurrent,
	getDateCurrentStringCustom : getDateCurrentStringCustom,
	belongsRangeTime : belongsRangeTime,
	getDateFormatyyyyMMDD : getDateFormatyyyyMMDD
}

