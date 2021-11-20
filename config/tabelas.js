
class Tabelas{
    init(conexao){
        this.conexao = conexao;

        this.criarAtendimentos();
    }
 
    criarAtendimentos(){
        let sql = 'CREATE TABLE IF NOT EXISTS atendimentos (      ';
        sql = sql + ' id int not null auto_increment,';
        sql = sql + ' cliente varchar(50) not null,';
        sql = sql + ' pet varchar(20),';
        sql = sql + ' servico varchar(20) not null,';
        sql = sql + ' data datetime not null,';
        sql = sql + ' data_criacao datetime not null,';
        sql = sql + ' status varchar(20) not null,';
        sql = sql + ' obervacoes text,';
        sql = sql + ' primary key(id)';
        sql = sql + ' )';

        this.conexao.query(sql, (erro) => {
            if(erro){
                console.log(erro);
            }
            else{
                console.log('Tabela atendimentos criado com sucesso');
            }
        })
    } 
}

module.exports = new Tabelas;