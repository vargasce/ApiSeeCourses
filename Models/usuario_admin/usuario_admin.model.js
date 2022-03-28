'use strict'

const md5 = require('md5');

class UsuarioModel{

    constructor( data = null ){
        if( data ){
            this.id = data.id;
            this.id_administrador = data.id_administrador;
            this.id_rol = data.id_rol;
            this.usuario = data.usuario;
            this.contrasenia = data.contrasenia;
            this.pass_actualizado = data.pass_actualizado;
            this.activo = data.activo;
        }
    }

    // GETTERS
    getId(){ return this.id; }
    getIdAdministrador(){ return this.id_administrador; }
    getIdRol(){ return this.id_rol; }
    getUsuario(){ return this.usuario; }
    getContrasenia(){ return this.contrasenia; }
    getPassActualizado(){ return this.pass_actualizado; }
    getActivo(){ return this.activo; }

    // SETTERS
    setId( id ){ this.id = id; }
    setIdAdministrador( id_administrador ){ this.id_administrador = id_administrador; }
    setIdRol( id_rol ){ this.id_rol = id_rol; }
    setUsuario( usuario ){ this.usuario = usuario; }
    setContrasenia( contrasenia ){ this.contrasenia = contrasenia; }
    setPassActualizado( pass_actualizado ){ this.pass_actualizado = pass_actualizado; }
    setActivo( activo ){ this.activo = activo; }
    
    // CUCTOM METHOD

    /** GET SQL STRING ADD USUARIO ADMIN
     * @Observations => Retorna format string sql add.
     * @returns { string } => sql string.
     */
    getSqlStringAddAdmin(){
        let sql = `
            INSERT INTO usuario_admin (
                id_administrador,
                id_rol,
                usuario,
                contrasenia,
                pass_extremo,
                pass_actualizado,
                activo
            )
            VALUES (
                ${this.getIdAdministrador()},
                ${this.getIdRol()},
                '${this.getUsuario()}',
                '${md5(this.getContrasenia())}',
                'd5e456e55e2c89c0973fcb5a5c0ee375',
                ${this.getPassActualizado()},
                ${this.getActivo()}
            );
        `;

        return sql;
    }

    /** GET SQL STRING UPDATE CHANGUE PASSWORD 
     * @Observations => Realiza update de cambio contraseña de usuario.
     * @param { object } data => Datos actualizar
     * @return { string } => sql string.
     */
    getSlqStringUpdateChanguePass( data ){
        let sql = `
            UPDATE usuario_admin SET pass_actualizado = ${data.value} WHERE id_administrador = ${data.id} ;
        `;

        return sql;
    }
    
    /** UPDATE NUEVAS CREDENCIALES.
     * @Observations => Realizar nuevas actualizacion de contraseñas,
     * @param { object } data => Objecto con las nuevas credenciales.
     * @returns { string } => sql string.
     */
    getSqlStringUpdataCredenciales( data ){
        let sql = `
            UPDATE usuario_admin SET contrasenia = '${md5(data.contrasenia)}'
            WHERE id_administrador = ${data.id} ;
        `;

        return sql;
    }

    /** UPDATE NUEVAS CREDENCIALES PARA PASS OLVIDADO.
     * @Observations => Realizar nuevas actualizacion de contraseñas,
     * @param { object } data => Objecto con las nuevas credenciales.
     * @returns { string } => sql string.
     */
    getSqlStringUpdataCredencialesOlvidado( data ){
        let sql = `
            UPDATE usuario_admin SET contrasenia = '${md5(data.contrasenia)}' , pass_actualizado = false 
            WHERE id_administrador = ${data.id} ;
        `;

        return sql;
    }

    /** UPDATE EMAIL .
     * @Observations => Sql actualizar email de user admin.
     * @param { object } data => Objecto.
     * @returns { string } => sql string.
     */
    getSqlStringUpdataEmail( data ){
        let sql = `
            UPDATE administrador SET email = '${data.email}' 
            WHERE id = ${data.id} ;
        `;

        return sql;
    }


}

module.exports = UsuarioModel;