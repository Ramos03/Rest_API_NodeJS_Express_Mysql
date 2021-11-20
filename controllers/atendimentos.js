const atendimento = require('../models/atendimentos');

module.exports = app => {

    /**
     * Rota para cadastro de um novo atendimento
     */
    app.post('/atendimentos', (req, res) => {
        const dados = req.body;

        atendimento.adicionaAtendimnento(dados, res);
    });

    /**
     * Rota para listar todos atendimentos
     */
    app.get('/atendimentos', (req, res) => {
        atendimento.listaAtendimentos(res);
    });

    /**
     * Rota para buscar atendimento especifico
     */
    app.get('/atendimentos/:id', (req, res) => {

        const id = parseInt(req.params.id);

        atendimento.listaAtendimentoId(res, id);
    });

    /**
     * Rota para atualização de atendimento
     */
    app.patch('/atendimentos/:id', (req, res) => {

        const id = parseInt(req.params.id);
        const valores = req.body;

        atendimento.alteraAtendimento(res, id, valores);
    });

    /**
     * Rota para apagar um atendimento
     */
    app.delete('/atendimentos/:id', (req, res) => {

        const id = parseInt(req.params.id);

        atendimento.deletaAtendimento(res, id);
    });
};