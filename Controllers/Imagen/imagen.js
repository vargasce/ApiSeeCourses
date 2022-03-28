'use strict'

const fn = require('../../Custom/function_custom/custom');
const _imagenService = require('../../Services/Imagen/imagen.service');

const controller = {

    imagen : async ( req, res) =>{

        let action = req.body.action;

        switch( action ){

            case 'list-imagen' :

                try{
                    let resultList = await _imagenService.listImagen();
                    return res.status(200).send({ 'error' : '', 'ResultSet' : resultList });
                }catch( err ){
                    return res.status(500).send({ 'error' : `${err}`});
                }
               
            break;

            case 'add-imagen' :

                try{
                    let resultAdd = await _imagenService.addImagen( req.body.data);
                    return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
                }catch( err ){
                    return res.status(500).send({ 'error' : `${err}`});
                }
               
            break;

            case 'update-imagen' :

                try{
                    let resultUpdate = await _imagenService.updateImagen( req.body.data );
                    return res.status(200).send({ 'error' : '', 'ResultSet' : resultUpdate });
                }catch( err ){
                    return res.status(500).send({ 'error' : `${err}`});
                }

            break;

            case 'delete-imagen' :
            
                try{
                    let resultDelete = await _imagenService.deleteImagen( req.body.data.id );
                    return res.status(200).send({ 'error' : '', 'ResultSet' : resultDelete });
                }catch( err ){
                    return res.status(500).send({ 'error' : `${err}`});
                }

            break;

            case 'get-imagen' :
            
                try{
                    let resultDelete = await _imagenService.getImagen( req.body.data.id );
                    return res.status(200).send({ 'error' : '', 'ResultSet' : resultDelete });
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
