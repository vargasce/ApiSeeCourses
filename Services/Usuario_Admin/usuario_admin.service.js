'use strict'

const { QueryAwait } = require('../../DB-connect/connectDB');
const UsuarioAdminModel = require('../../Models/usuario_admin/usuario_admin.model');
const UsuarioError = require('../../Error/UsuarioAdmin/usuario_admin.error');
const fn = require('../../Custom/function_custom/custom');
const usr = require('../../Custom/userSession/session');

class UsuarioAdmin{

    constructor(){}

    /** ADD NUEVO USUARIO ADMIN
     * @Observations => Insertar nuevo usuario admin.
     * @param { object } data => Datos a ingresar.
     * @returns { Promise } => new Promise.
     */
    async addUsuarioAdmin( data ){
        return new Promise( async ( resolve, reject ) =>{

            try{
                fn.validateType( 'object', data );
            }catch( err ){
                reject( err );
            }

            let usuarioAdmin = new UsuarioAdminModel( data );
            let sql = usuarioAdmin.getSqlStringAddAdmin();

            try{
                await QueryAwait('BEGIN');
                let result = await QueryAwait( sql );
                let ok = await QueryAwait('COMMIT');
                if ( ok ) resolve( result );

            }catch( err ){
                await QueryAwait('ROLLBACK');
                reject( new UsuarioError( 'Error Usuario Admin', `Error al insertar Usuario Admin : ${err}`));
            }

        }).catch( error => { throw error });
    }

    /** UPDATE PASS CHANGUE
     * @Observations => Actualizar cambio de pass del usuario.
     * @param { object } data => Datos a ingresar.
     * @returns { Promise } => new Promise.
     */
    async updateChanguePassword( data ){
        return new Promise( async ( resolve, reject ) =>{

            try{
                fn.validateType('object', data);
            }catch( err ){
                reject( err );
            }

            let usuarioAdmin = new UsuarioAdminModel();
            let sql = usuarioAdmin.getSlqStringUpdateChanguePass( data );

            try{

                await QueryAwait('BEGIN');
                let result = await QueryAwait( sql );
                let ok = await QueryAwait('COMMIT');
                if( ok ) resolve( result );

            }catch( err ){
                await QueryAwait('ROLLBACK');
                reject( new UsuarioError( 'Error Usuario Admin', `Error al actualizar cambio password : ${err} .`) );
            }

        }).catch( error => { throw error; });
    }

    /** UPDATE USUARIO ADMIN
     * @Observations => Actualizar contraseña
     * @param { object } data => Nuevos datos a actualizar.
     * @returns { Promise } => new Prmise.
     */
    async updateUsuarioAdmin ( data ){
        return new Promise( async ( resolve, reject ) =>{

            try{
                fn.validateType( 'object', data );
            }catch( err ){
                reject( err );
            }

            let usuarioAdmin = new UsuarioAdminModel();
            let sql = usuarioAdmin.getSqlStringUpdataCredenciales( data );

            try{

                await QueryAwait('BEGIN');
                let result = await QueryAwait( sql );
                let ok = await QueryAwait('COMMIT');
                if( ok ) resolve( result );

            }catch( err ){
                await QueryAwait('ROLLBACK');
                reject( new UsuarioError( 'Error Usuario Admin', `Erro al actualizar nuevas credenciales : ${err}` ) );
            }
            
        });
    }

    /** UPDATE USUARIO ADMIN OLVIDADO
     * @Observations => Actualizar contraseña
     * @param { object } data => Nuevos datos a actualizar.
     * @returns { Promise } => new Prmise.
     */
    async updateUsuarioAdminOlvidado ( data ){
        return new Promise( async ( resolve, reject ) =>{

            try{
                fn.validateType( 'object', data );
            }catch( err ){
                reject( err );
            }

            let usuarioAdmin = new UsuarioAdminModel();
            let sql = usuarioAdmin.getSqlStringUpdataCredencialesOlvidado( data );

            try{

                await QueryAwait('BEGIN');
                let result = await QueryAwait( sql );
                let ok = await QueryAwait('COMMIT');
                if( ok ) resolve("Contraseña actualizada con exito!!!");

            }catch( err ){
                await QueryAwait('ROLLBACK');
                reject( new UsuarioError( 'Error Usuario Admin', `Erro al actualizar nuevas credenciales : ${err}` ) );
            }
            
        });
    }

    /** VALIDAR USUARIO ADMIN
     * @Observations => Verifica auth access del usuario.
     * @param { string } token => Token control de usuario.
     * @returns { Promise } => new Prmise boolean.
     */
    async verificaUsuarioAdmin ( token ){
        return new Promise( async ( resolve, reject ) =>{

            try{

                usr.getUserValidete( token, ( error, decode ) =>{
                    if( !error ){
                        resolve( true );
                    }else{
                        resolve( false );
                    }
                });

            }catch( err ){
                reject( new UsuarioError( 'Error Usuario Admin', `Error usuario no valido : ${err}` ) );
            }
            
        });
    }

    /** UPDATE EMAIL USUARIO ADMIN
     * @Observations => Actualizar email del usuario.
     * @param { object } data => Objecto con datos a actualizar.
     * @returns { Promise } => new Prmise<string>.
     */
    async updateEmailUsuarioAdmin ( data ){
        return new Promise( async ( resolve, reject ) =>{

            let usuarioAdmin = new UsuarioAdminModel();
            let sql = usuarioAdmin.getSqlStringUpdataEmail( data );

            try{

                await QueryAwait('BEGIN');
                let result = await QueryAwait( sql );
                let ok = await QueryAwait('COMMIT');
                if( ok ) resolve("Email Actualizado con exito!!!");

            }catch( err ){
                await QueryAwait('ROLLBACK');
                reject( new UsuarioError( 'Error Usuario Admin', `Erro al actualizar nuevas credenciales : ${err}` ) );
            }

        });
    }

    async verifyUser ( name ){
        return new Promise( async ( resolve, reject ) =>{

            let sql = `SELECT * FROM usuario_admin WHERE usuario = '${name}' ;`;

            try{

                await QueryAwait('BEGIN');
                let result = await QueryAwait( sql );
                let ok = await QueryAwait('COMMIT');
                if( ok ) resolve( result.rows.length );

            }catch( err ){
                await QueryAwait('ROLLBACK');
                reject( new UsuarioError( 'Error Usuario Admin', `Erro al actualizar nuevas credenciales : ${err}` ) );
            }

        });
    }

    async verifyDny ( dni ){
        return new Promise( async ( resolve, reject ) =>{

            let sql = `SELECT * FROM administrador WHERE dni = '${dni}' ;`;
            console.log( sql );

            try{

                await QueryAwait('BEGIN');
                let result = await QueryAwait( sql );
                let ok = await QueryAwait('COMMIT');
                if( ok ) resolve( result.rows.length );

            }catch( err ){
                await QueryAwait('ROLLBACK');
                reject( new UsuarioError( 'Error Usuario Admin', `Erro al actualizar nuevas credenciales : ${err}` ) );
            }

        });
    }

}

module.exports = new UsuarioAdmin();