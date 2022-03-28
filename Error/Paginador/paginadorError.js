'use strict'

class PaginadorError{
  constructor( nombre, message ){
    this.titulo = 'Error Type';
    this.nombre = nombre;
    this.message = message;
  }

  getMessage(){ return this.message; }
  getTitulo(){ return this.titulo; }
  getNomnre(){ return this.nombre; }
  getSerializable(){ return `${this.titulo} ${this.nombre} ${this.message}` }
  toString(){ return `${this.titulo} ${this.nombre} ${this.message}` }

}

module.exports = PaginadorError;
