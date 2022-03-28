'use strict'

const fn = require('../../Custom/function_custom/custom');
const _actividadService = require('../../Services/Actividad/actividad.service');

const controller = {

    actividad : async ( req, res) =>{

        let action = req.body.action;

        switch( action ){

            case 'list-actividad' :

                try{
                    let resultAdd = await _actividadService.getListActividad();
                    return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
                }catch( err ){
                    return res.status(500).send({ 'error' : `${err}`});
                }
               
            break;

            case 'get-actividad' :
                let id = req.body.data.id;
                try{
                    let resultAdd = await _actividadService.getActividadById(id);
                    return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd.rows});
                }catch( err ){
                    return res.status(500).send({ 'error' : `${err}`});
                }
               
            break;

            case 'add-actividad' :

                let data = req.body.data;

                try{
                    fn.validateType( 'object', data );
                }catch( err ){
                    throw err;
                }

                try{
                    let resultAdd = await _actividadService.addActividad( data );
                    return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
                }catch( err ){
                    return res.status(500).send({ 'error' : `${err}`});
                }

            break;

            case 'update-actividad' :

                try{
                    fn.validateType('object', req.body.data );
                }catch( err ){
                    reject( err );
                }

                try{
                    let resultAdd = await _actividadService.updateActividad( req.body.data );
                    return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
                }catch( err ){
                    return res.status(500).send({ 'error' : `${err}`});
                }

            break;

            case 'delete-actividad':

                try{
                    fn.validateType('number', req.body.data.id)
                }catch( err ){
                    reject( err );
                }

                try{
                    let resultAdd = await _actividadService.delteActividad( req.body.data.id );
                    return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
                }catch( err ){
                    return res.status(500).send({ 'error' : `${err}`});
                }

            break;

            default:
                return res.status(200).send({ 'error' : `Error, action no definida. `});
        }
    }

}

module.exports = controller;

class ActividadController{

    constructor(){

    }

    actividad( req, res){

        let action = req.body.action;

        try{
            fn.validateType( 'string', action );
        }catch( err ){
            throw err;
        }

        switch ( action ){

            case 'addActividad' :
                return addActividad( req , res);
            break;

            case 'list-actividad' :
                this.listActividad( );
            break;

            case 'getActividad' :
                return getActividad( req, res );
            break;

            default :
                return res.status(200).send({ 'error' : `Error, action no definida.`});
            break;
        }
    }


    /** NUEVA ACTIVIDAD
     * @Observations => Añadir nueva actividad
     * @param { object } data => Objecto a dar de alta.
     * @returns { Promise } => Retorna nueca promesa.
     */
    async addActividad( req, res ){
        
        let data = req.body.data;

        try{
            fn.validateType( 'object', data );
        }catch( err ){
            throw err;
        }

        try{
            let resultAdd = await _actividadService.addActividad( data );
            return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
            return res.status(500).send({ 'error' : `${err}`});
        }

    }


    /** LIST ACTIVIDAD
     * @Observations => List actividad
     * @returns { Promise } => Retorna nueca promesa.
     */
    async listActividad( req, res ){
        
        try{
            let resultAdd = await _actividadService.getListActividad( );
            return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
            return res.status(500).send({ 'error' : `${err}`});
        }

    }


    /** UPDATE ACTIVIDAD
     * @Observations => Update actividad
     * @param { object } data => datos actualizar.
     * @returns { Promise } => Retorna nueca promesa.
     */
    async updateActividad( req, res ){
        
        try{
            fn.validateType('object', req.body.data );
        }catch( err ){
            reject( err );
        }

        try{
            let resultAdd = await _actividadService.updateActividad( req.body.data );
            return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
            return res.status(500).send({ 'error' : `${err}`});
        }

    }

}
