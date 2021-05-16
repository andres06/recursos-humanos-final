const express = require ('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
//mostrar usuario
router.get('/list', customerController.list);
router.get('/', customerController.inicio);
//agregar usuario
router.post('/add', customerController.guardar);
//eliminar usuario
router.get('/eliminar/:id', customerController.eliminar);
//editar usuario
router.get('/editar/:id', customerController.editar);
router.post('/editar/:id', customerController.actualizar);
router.get('/registrar', customerController.registrar);
//router.post('/registro', customerController.registro);

 

module.exports = router;
