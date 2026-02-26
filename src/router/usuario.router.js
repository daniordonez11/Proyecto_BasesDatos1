const router = require('express').Router();
const {faker} = require('@faker-js/faker');

const Usuario = require('../models/usuario.model');

// Select ALL
router.get('/usuario', async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Usuarios obtenidos exitosamente',
        data: usuarios
    });
});

// Seleccionar por ID
router.get('/usuario/:id', async (req, res) => {
    const id=req.params.id;
    const usuario = await Usuario.findOne({
        where: {id}
    })
    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Usuario obtenido exitosamente',
        body: usuario
    });
});

// Agregar
router.post('/usuario', async (req, res) => {
    const dataUsuario = req.body;
    await Usuario.sync();
    // const createUsuario = await Usuario.create({ email: faker.internet.email(), password: faker.internet.password() });

    const createUsuario = await Usuario.create({ 
        email: dataUsuario.email || faker.internet.email(), 
        password: dataUsuario.password || faker.internet.password() 
    });
    res.status(201).json({
        ok: true,
        status: 201,
        message: 'Usuario creado exitosamente',
        data: createUsuario
    });
    console.log("Usuario creado con ID:", createUsuario.id);
});

// Actualizar
router.put('/usuario/:id', async (req, res) => {
    const idUsuario = req.params.id;
    const dataUsuario = req.body;
    const usuario = await Usuario.findOne({
        where: {id: idUsuario}
    });
    const updateUsuario = await Usuario.update({
        email: dataUsuario.email || faker.internet.email(), 
        password: dataUsuario.password || faker.internet.password() 
    }, {
        where: {id: idUsuario}
    });
    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Usuario actualizado exitosamente',
        data: usuario
    });
});

// Desactivar Usuario (Soft Delete)
router.put('/usuario/out/:id', async (req, res) => {
    const idUsuario = req.params.id;
    const dataUsuario = req.body;
    const usuario = await Usuario.findOne({
        where: {id: idUsuario}
    });
    const updateUsuario = await Usuario.update({
        estado: req.body.estado || false
    }, {
        where: {id: idUsuario}
    });
    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Usuario desactivado exitosamente',
        data: usuario
    });
});

// Full Delete
// router.delete('/usuario/:id', async (req, res) => {
//     const id = req.params.id;
//     const usuario = await Usuario.findOne({
//         where: {id}
//     });
//     await Usuario.destroy({
//         where: {id}
//     });
//     res.status(200).json({
//         ok: true,
//         status: 200,
//         message: 'Usuario eliminado exitosamente',
//         body: usuario
//     });
// });

module.exports = router;