const query = require('../config/database/queries');

class Atendimento {
    
    /**
     * Função para adicionar atendimento
     * @param {*} atendimento 
     * @returns array 
     */
    adiciona(atendimento){
        let sql = 'INSERT INTO atendimentos SET ?';

        return query(sql, atendimento);
    }

    /**
     * Função para retornar todos os dados cadastrados
     * @returns array sql
     */
    lista(){
        const sql = 'SELECT * FROM atendimentos';

        return query(sql);
    }

    /**
     * Função para retornar dados especificos
     * @param {*} id 
     * @returns 
     */
    listaById(id){
        const sql = `SELECT * FROM atendimentos WHERE id = ?`;
        return query(sql, id);
    }

    /**
     * Função para alterar os dados do atendimento especificado
     * @param {*} id 
     * @param {*} valores 
     * @returns 
     */
    altera(id, valores ){
        const sql = `UPDATE atendimentos SET ? WHERE id = ?`;

        return query(sql, [valores, id]);
    }

    /**
     * Função para deletar o atendimento especificado
     * @param {*} id 
     * @returns 
     */
    deleta(id){
        const sql = `DELETE FROM atendimentos WHERE id = ?`;

        return query(sql, id);
    }
}
module.exports = new Atendimento();