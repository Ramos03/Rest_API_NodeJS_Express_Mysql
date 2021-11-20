const pets = require('../models/pets');

module.exports = app => {
    app.post('/pet', (req, res) => {
        const dados = req.body;

        pets.adicionaPet(dados, res);
    });
};