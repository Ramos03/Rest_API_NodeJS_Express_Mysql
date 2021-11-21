
class Tabelas{
    init(conexao){
        this.conexao = conexao;

        this.criarAtendimentos();
        this.criarPets();
    }
 
    criarAtendimentos(){
        let sql = 'CREATE TABLE IF NOT EXISTS atendimentos (      ';
        sql = sql + ' id int not null auto_increment,';
        sql = sql + ' cliente varchar(11) not null,';
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
    
    criarPets(){
        let sql = 'CREATE TABLE IF NOT EXISTS pets( ';
        sql = sql + ' id int not null auto_increment, ';
        sql = sql + ' nome varchar(50), ';
        sql = sql + ' imagem varchar(200), ';
        sql = sql + ' primary key(id)';
        sql = sql + ' )';

        this.conexao.query(sql, (erro) => {
            if(erro){
                console.log(erro);
            }
            else{
                console.log('Tabela pets criado com sucesso');
            }
        });
    }
}

module.exports = new Tabelas;