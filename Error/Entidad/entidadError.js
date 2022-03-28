'use strict'

class EntidadError{
  constructor( nombre, message ){
    this.titulo = 'Error Entidad';
    this.nombre = nombre;
    this.message = message;
  }

  getMessage(){ return this.message; }
  getTitulo(){ return this.titulo; }
  getNomnre(){ return this.nombre; }
  getSerializable(){ return `${this.titulo} ${this.nombre} ${this.message}` }
  toString(){ return `${this.titulo} ${this.nombre} ${this.message}` }

}

module.exports = EntidadError;
