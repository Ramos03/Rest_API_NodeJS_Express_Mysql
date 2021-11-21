const atendimento = require('../models/atendimentos');

module.exports = app => {

    /**
     * Rota para cadastro de um novo atendimento
     */
    app.post('/atendimentos', (req, res) => {
        const dados = req.body;

        atendimento.adicionaAtendimnento(dados)
            .then(atendimentoCadastrado => {
                res.status(201).json(atendimentoCadastrado);
            })
            .catch(erro => {
                res.status(400).json(erro);
            });
    });

    /**
     * Rota para listar todos atendimentos
     */
    app.get('/atendimentos', (req, res) => {
        atendimento.listaAtendimentos()
            .then(resultados => res.json(resultados))
            .catch(erros => res.status(400).json(erros));
    });

    /**
     * Rota para buscar atendimento especifico
     */
    app.get('/atendimentos/:id', (req, res) => {

        const id = parseInt(req.params.id);

        atendimento.listaAtendimentoId(id)
            .then(resultados => res.json(resultados))
            .catch(erros => res.status(400).json(erros));
    });

    /**
     * Rota para atualização de atendimento
     */
    app.patch('/atendimentos/:id', (req, res) => {

        const id = parseInt(req.params.id);
        const valores = req.body;

        atendimento.alteraAtendimento(id, valores)
            .then(resultados => res.json(resultados))
            .catch(erros => res.status(400).json(erros));
    });

    /**
     * Rota para apagar um atendimento
     */
    app.delete('/atendimentos/:id', (req, res) => {

        const id = parseInt(req.params.id);

        atendimento.deletaAtendimento(id)
            .then(resultados => res.json(resultados))
            .catch(erros => res.status(400).json(erros));;
    });
};