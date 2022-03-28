'use strict'

const con = require('../../DB-connect/connectDB');
const envProperties = require("../../env.vars.json");
const node_env = process.env.NODE_ENV || 'developmen';
const props = envProperties[node_env];
const schema = props.DB.SCHEMA;


const service = {

  getDataObj : ( tabla ) =>{
    return new Promise( ( resolve, reject ) =>{
      
      let sql = `SELECT * FROM ${schema}.${tabla} ;`;

      con.select( sql, ( error, result ) =>{
        if( !error ){
          resolve( result );
        }else{
          reject( error );
        }
      });

    });
  }

}


module.exports = service;
