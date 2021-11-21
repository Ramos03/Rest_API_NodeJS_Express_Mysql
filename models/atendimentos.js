const conexao = require('../config/database/conexao');
const moment = require('moment');
const axios = require('axios');
const repositorio = require('../repositorios/atendimento');
class Atendimentos {

    constructor() {
        this.dataEhValida = ({ data, dataCriacao }) =>
            moment(data).isSameOrAfter(dataCriacao);

        this.clienteEhValido = ({ tamanho }) => tamanho >= 5;

        this.valida = parametros =>
            this.validacoes.filter(campo => {
                const { nome } = campo;
                const parametro = parametros[nome];

                return !campo.valido(parametro)
            });

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];
    }
    /**
     * Função para adicionar um atendimento
     * @param array atendimento 
     * @param array res 
     */
    adicionaAtendimnento(atendimento, res) {

        let dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');

        const data = moment(atendimento.data).format('YYYY-MM-DD HH:MM:SS');

        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        }

        const erros = this.valida(parametros);

        const existemErros = erros.length;

        if (existemErros) {
            return new Promise((resolve, reject) => {
                reject(erros);
            });
        }
        else {
            const atendimentoDatado = { ...atendimento, 'data_criacao': dataCriacao, 'data': data };

            return repositorio.adiciona(atendimentoDatado)
                .then((resultados) => {
                    const id = resultados.insertId;

                    return { ...atendimentoDatado, id }
                });
        }
    }

    /**
     * Função para listar os atendimentos
     * @param array res
     * 
     * @return object resultados 
     */
    listaAtendimentos() {
        return repositorio.lista();
    }

    /**
     * Função para listar atendimentos por id
     * @param array res 
     * @param int id
     * 
     * @return array atendimento
     */
    listaAtendimentoId(id) {

        return repositorio.listaById(id)
            .then(async (resultados) => {
                const atendimento = resultados[0];
                const cpf = atendimento.cliente;

                const { data } = await axios.get(`http://localhost:8082/${cpf}`);

                atendimento.cliente = data;

                return atendimento;
            });
    }

    /**
     * Função para alteração de atendimento
     * @param array res 
     * @param int id 
     * @param array valores 
     * 
     * @return json valores, id
     */
    alteraAtendimento(id, valores) {

        return repositorio.altera(id, valores)
            .then(async(resultados) =>{

                return { ...valores, id };
            });
    }

    /**
     * Função para deletar atendimento
     * @param array res 
     * @param int id
     * 
     * @return json id
     */
    deletaAtendimento(id) {
        return repositorio.deleta(id)
            .then(async(resultados) => {
                return { id };
            });
    }
}

module.exports = new Atendimentos;