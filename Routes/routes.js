'use strict'

const express = require('express');
const Login = require('../Controllers/Login/login');
const Itinerario = require('../Controllers/Itinerario/itinenario');
const Usuario = require('../Controllers/Usuario/usuario');
const Entidad = require('../Controllers/Entidad/entidad');
const Notificacion = require('../Controllers/Notificacion/notificacion');
const Provincia = require('../Controllers/Provincias/provincias');
const Pais = require('../Controllers/Paises/paises');
const Upload = require('../Controllers/Upload/upload');
const Email = require('../Controllers/Email/email');
const Administrador = require('../Controllers/Administrador/administrador');
const UsuarioAdmin = require('../Controllers/Usuario_Admin/usuario_admin.controller');
const Actividad = require('../Controllers/Actividad/actividad');
const Imagen = require('../Controllers/Imagen/imagen');
const Localidad = require('../Controllers/Localidad/localidades');
const Parametrizacion = require('../Controllers/Parametrizacion/parametrizacion');

const router = express.Router();

const multiparty = require('connect-multiparty');
//const multipartMiddeleware = multiparty({ uploadDir : '../File_up' });

router.post('/login', Login.login ); 								  // CONTROLLER LOGIN
router.post('/itinerario', Itinerario.itinerario );                   // CONTROLLER ITINERARIO
router.post('/usuario', Usuario.usuario );                            // CONTROLLER USUARIO
router.post('/entidad', Entidad.entidad );                            // CONTROLLER ENTIDAD
router.post('/notificacion', Notificacion.notificacion );             // CONTROLLER NOTIFICACION
router.post('/pais', Pais.paises );                                   // CONTROLLER PAISES
router.post('/provincia', Provincia.provincias );                     // CONTROLLER PROVINCIAS
router.post('/upload', Upload.upload );                               // CONTROLLER UPLOAD IMG
router.post('/uploadFiles', Upload.uploadFiles );                     // CONTROLLER UPLOAD IMG
router.get('/godownImg/:image', Upload.goDown );                      // CONTROLLER GODOWS IMG
router.post('/email', Email.emailController );                        // CONTROLLER EMAIL
router.post('/administrador', Administrador.administradorController ) // CONTROLLER ADMINISTRADOR
router.post('/usuario_admin', UsuarioAdmin.usuario_admin );           // CONTROLLER USUARIO ADMIN
router.post('/actividad', Actividad.actividad );                      // CONTROLLER ACTIVIDAD
router.post('/imagen', Imagen.imagen );                               // CONTROLER IMAGEN
router.post('/archivos', Upload.uploadFiles )                         // CONTROLLER FILES 
router.get('/getArchivo/:file', Upload.goDownFiles );                 // CONTROLLER GODOWS Files
router.post('/localidad', Localidad.localidad );                      // CONTROLLER LOCALIDADES
router.post('/list', Parametrizacion.parametrizacion );               // CONTROLLER PARAMETRIZACION
router.post('/deleteFile', Upload.eliminarArchivo );                  // METHOD DELET

module.exports = router;

