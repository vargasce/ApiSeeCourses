'use strict'

const con = require('../../DB-connect/connectDB');
const  date = require('../dates/dates');

const active = {

	add : ( data ) =>{
		
		if( data.active ){
			
			let sql = `UPDATE profail_name SET  
												browser = '${data.browser}',
												plataform = '${data.plataform}',
												os = '${data.os}',
												version = '${data.version}',
												hour_active = '${date.getHourMinuteCurrent()}',
												date_active = '${date.getDateCurrentStringCustom()}',
												active = ${true}
												WHERE id = ${data.id_profail_name} ;`;

			con.update( sql, ( error, result ) =>{
				if( error ){
					console.log(`Error in module active : ${error} : ${result}`);
				}
			});

		}

	},

	disconect : id_profile_name => {
		
		let sql = `UPDATE profile_name set active = ${false} WHERE id = ${id_profile_name};`;

		con.update( sql, ( error, result ) =>{
			if( error ){
				console.log(`Error in disconect profile name : ${error} : ${result}`);
				return false;
			}

			return true;
		});

	}

}

module.exports = active;
