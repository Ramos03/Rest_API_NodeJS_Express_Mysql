const conexao = require('../config/conexao');
const moment = require('moment');

class Atendimentos{

    /**
     * Função para adicionar um atendimento
     * @param array atendimento 
     * @param array res 
     */
    adicionaAtendimnento(atendimento, res) {

        let dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        
        const data = moment(atendimento.data).format('YYYY-MM-DD HH:MM:SS');
        const dataEHValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEHValido = atendimento.cliente.length >= 5;

        const validações = [
            {
                nome: 'data',
                valido: dataEHValida,
                mensagem: 'Data deve ser menor ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEHValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres'
            }
        ];

        const erros = validações.filter(campo => !campo.valido);

        const existemErros = erros.length;

        if(existemErros){
            res.status(400).json(erros);
        }
        else{
            const atendimentoDatado = {...atendimento, 'data_criacao': dataCriacao, 'data': data};
    
            let sql = 'INSERT INTO atendimentos SET ?';
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro);
                }
                else{
                    res.status(201).json(atendimentoDatado);
                }
            });
        }
    }

    /**
     * Função para listar os atendimentos
     * @param array res
     * 
     * @return object resultados 
     */
    listaAtendimentos(res){
        const sql = 'SELECT * FROM atendimentos';

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }
            else{
                res.status(200).json(resultados);
            }
        });
        
    }

    /**
     * Função para listar atendimentos por id
     * @param array res 
     * @param int id
     * 
     * @return array atendimento
     */
    listaAtendimentoId(res, id){
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`;

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }
            else{
                const atendimento = resultados[0];

                res.status(200).json(atendimento);
            }
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
    alteraAtendimento(res, id, valores){

        const sql = `UPDATE atendimentos SET ? WHERE id = ?`;

        conexao.query(sql, [valores, id], (erro) => {
            if(erro){
                res.status(400).json(erro);
            }
            else{
                res.status(200).json({...valores, id});
            }
        });
    }

    /**
     * Função para deletar atendimento
     * @param array res 
     * @param int id
     * 
     * @return json id
     */
    deletaAtendimento(res, id){
        const sql = `DELETE FROM atendimentos WHERE id = ?`;

        conexao.query(sql, id, (erro) => {
            if(erro){
                res.status(400).json(erro);
            }
            else{
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new Atendimentos;