'use strict'

class Log{

    constructor( data ){
        if( data ){
            this.id = data.id;
            this.descripcion = data.descripcion;
            this.fecha = data.fecha;
            this.hora = data.hora;
            this.observacion = data.observacion;
        }
    }

    getId(){ return this.id }
    getDescripcion(){ return this.descripcion; }
    getFecha(){ return this.fecha; }
    getHora(){ return this.hora; }
    getObservacion(){ return this.observacion; }

    setId( id ){ this.id = id; }
    setDescripcion( descripcion ){ this.descripcion = descripcion; }
    setFecha( fecha ){ this.fecha = fecha; }
    setHora( hora ){ this.hora = hora; }
    setObservacion( observacion ){ this.observacion = observacion; }

    // CUSTOM 

    /** INSERTAR NUEVO LOG */
    insertSqlString(){
        let sql = `
            INSERT INTO log ( descripcion, fecha, hora, observacion )
            VALUES (
                '${this.getDescripcion()}',
                '${this.getFecha()}',
                '${this.getHora()}',
                '${this.getObservacion()}'
            );
        `;

        return sql;
    }

    getSqlStringFilter( filter ){
        let sql = `
            SELECT * FROM log ORDER BY id ASC LIMIT ${filter.count} OFFSET ${filter.init} ;
        `;
        return sql;
    }
}

module.exports = Log;