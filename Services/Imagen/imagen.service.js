'use stict'

const { QueryAwait } = require('../../DB-connect/connectDB');
const fn = require('../../Custom/function_custom/custom');
const ImagenError = require('../../Error/Imagen/imagen.error');

class Imagen{

    constructor(){

    }


    /** ADD NEW IMAGEN
     * @Observations => Insertar nuevo nombre de imagen.
     * @param { Obejct } data => Objecto datos a insertar.
     * @returns { Promise } => new Promise<String>
     */
    addImagen( data ){
        return new Promise( async ( resolve, reject ) =>{

            try {
                fn.validateType('object', data);               
            }catch( err ){
                reject( err );
            }

            try{

                await QueryAwait('BEGIN');
                let result = await QueryAwait( insertImagenSqlString( data ));
                let ok = await QueryAwait('COMMIT');
                if( ok ) resolve( result.rows );

            }catch( err ){
                await QueryAwait('CALLBACK');
                reject( new ImagenError('Error Imagen Add', `Error : ${err}`) );
            }
        });
    }

    /** DELETE IMAGEN 
     * @Observations => Eliminar una imgen.
     * @param { number } id => id del registro a eliminar.
     * @returns { Promise } => new Promise<string>
     */
    deleteImagen( id ){
        return new Promise( async ( resolve, reject ) =>{

            try{
                fn.validateType('number', id);
            }catch( err ){
                reject( err );
            }

            try{
                
                await QueryAwait('BEGIN');
                let result = await QueryAwait( deleteImagenSqlString( id ) );
                let ok = await QueryAwait('COMMIT');
                if( ok ) resolve( result.rows );

            }catch( err ){
                await QueryAwait('CALLBACK');
                reject( new ImagenError('Error imagen', `Error : ${err}`) );
            }

        });
    }

    /** GET IMAGEN
     * @Observations => Retorna lista de las imagen con sus nombres para cargar.
     * @return { Promise } => new Promise<Object>
     */
    listImagen(){
        return new Promise( async ( resolve, reject ) => {

            try{

                let result = await QueryAwait( 'SELECT * FROM imagen ;');
                if( result ) resolve( result.rows );

            }catch( err ){
                reject( new ImagenError('Error imagen', `Error : ${err}`) );
            }

        });
    }

    /** UPDATE IMAGEN
     * @Observation => Actualizar nombre de la imagen.
     * @param { Object } data => Objeto con a insertar.
     * @returns { Promise } => new Promise<string>
     */
    updateImagen( data ){
        return new Promise( async ( resolve, reject ) =>{

            try{
                fn.validateType('object', data );
            }catch( err ){
                reject( err );
            }

            try{

                let result = await QueryAwait( updateImagenSqlString(data) );
                if( result ) resolve( result.rows );

            }catch( err ){
                reject( new ImagenError('Error Imagen update', `Error : ${err}`) );
            }

        });
    }

    /** GET IMAGEN
     * @Observation => Obtener imagen por id .
     * @param { number } id => Objeto con a insertar.
     * @returns { Promise } => new Promise<string>
     */
    getImagen( id ){
        return new Promise( async ( resolve, reject ) =>{

            try{
                fn.validateType('number', id );
            }catch( err ){
                reject( err );
            }

            try{

                let result = await QueryAwait( getImagenSqlString(id) );
                if( result ) resolve( result.rows );

            }catch( err ){
                reject( new ImagenError('Error Imagen update', `Error : ${err}`) );
            }

        });
    }


}

module.exports = new Imagen();

const insertImagenSqlString = ( data ) =>{
    let sql = `INSERT INTO imagen ( imagen, descripcion ) VALUES ( '${data.imagen}', '${data.descripcion}') RETURNING *;`;
    return sql;
}

const deleteImagenSqlString = ( id ) =>{
    let sql = `DELETE FROM imagen WHERE id = ${id} ;`;
    return sql;
}

const updateImagenSqlString = ( data ) =>{
    let sql = `UPDATE imagen SET descripcion = '${data.descripcion}'  WHERE id = ${data.id};`;
    return sql;
}

const getImagenSqlString = ( id ) =>{
    let sql = `SELECT * FROM imagen WHERE id = ${id} ;`;
    return sql;
}