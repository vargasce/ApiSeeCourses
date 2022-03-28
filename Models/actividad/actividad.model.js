'use strict'

class actividadModel {

    constructor( data = null ){
        if( data ){
            this.id = data.id;
            this.descripcion = data.descripcion;
        }
    }

    //GETTERS
    getId(){ return this.id; }
    getDescripcion(){ return this.descripcion; }

    //SETTERS
    setDescripcion( desc ){ this.descripcion = desc; }
    setId( id ){ this.id = id; }

    //CUSTOM
    
    getSqlAddActividad(){
        let sql = `INSERT INTO actividad 
        (
            descripcion
        )
        VALUES 
        (
            '${this.getDescripcion()}'
        );`
        
        return sql;
    }

    getSqlUpdateActividad(){        
        let sql = `UPDATE actividad SET descripcion = '${this.getDescripcion()}' WHERE id = ${this.getId()}; `;
        return sql;
    }

    getSqlListActividad( ){
        let sql = `SELECT * FROM actividad ORDER BY descripcion ASC ;`;
        return sql;
    }

    getSqlByIdActividad( id ){
        let sql = `SELECT * FROM actividad WHERE id = ${id} ;`;
        return sql;
    }

    getSqlDeleteActividad( id ){
        let sql = `DELETE FROM actividad WHERE id= ${id} ;`;
        return sql;
    }

}

module.exports = actividadModel ;