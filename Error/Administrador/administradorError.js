'use strict'

class AdministradorError{

    constructor( nombre, message ){
        this.titulo = 'Error Method Administrator';
        this.nombre = nombre;
        this.message = message;
    }

    getMessage(){ return this.message; }
    getTitulo(){ return this.titulo; }
    getNomnre(){ return this.nombre; }
    getSerializable(){ return `${this.titulo} ${this.nombre} ${this.message}` }
    toString(){ return `${this.titulo} ${this.nombre} ${this.message}` }

}

module.exports = AdministradorError;