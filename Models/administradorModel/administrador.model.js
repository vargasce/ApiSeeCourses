'use strict'

const md5 = require('md5');

class Administrador{

    constructor( data = null ){
        if( data ){
            this.id = data.id;
            this.fecha_alta = data.fecha_alta;
            this.activo = data.activo;
            this.nombre = data.nombre;
            this.apellido = data.apellido;
            this.email = data.email;
            this.dni = data.dni;
        }
    }

    // GETTERS
    getId(){ return this.id; }
    getFecha_Alta(){ return this.fecha_alta; }
    getActivo(){ return this.activo; }
    getNombre(){ return this.nombre; }
    getApellido(){ return this.apellido; }
    getEmail(){ return this.email; }
    getDNI(){ return this.dni; }

    // SETTERS
    setId( id ){ this.id = id; }
    setFecha_Alta( fecha ){ this.fecha_alta = fecha; }
    setActivo( activo ){ this.activo = activo; }
    setNombre( nombre ){ this.nombre = nombre; }
    setApeliido( apellido ){ this.apellido = apellido; }
    setEmail( email ){ this.email = email; }

    /** GET SQL STRING ADD ADMINISTRADOR
     * @Observations => Crear sql para insertar administrador.
     * @returns { string } => string sql format.
     */
    getSqlStringAddAdministrador(){

        let sql = `
            INSERT INTO administrador 
            (
                fecha_alta,
                activo,
                nombre,
                apellido,
                email,
                dni
            )
            VALUES
            (
                '${this.getFecha_Alta()}',
                ${this.getActivo()},
                '${this.getNombre()}',
                '${this.getApellido()}',
                '${this.getEmail()}',
                '${this.getDNI()}'
            ) RETURNING *;
        `;
        return sql;
    }

    /** GET SQL STRING SEARCH BY ID ADMININISTRADOR
     * @Observations => Crear sql para buscar por id de administrador.
     * @returns { string } => string sql format.
     */
    getSqlStringByIdAdministrador(){
        
        let sql = `
            SELECT * FROM administrador WHERE id = ${this.getId()} ;
        `;
    }

}

module.exports = Administrador;