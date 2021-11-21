const customExpress = require('./config/customExpress');
const conexao = require('./config/database/conexao');
const tabelas = require('./config/tabelas');
/**
 * Função de inicialização do nosso servidor
 * 
 * Validação para só permitir iniciar se o banco de dados estiver funcionando
 */
conexao.connect(erro => {
    if (erro) {
        console.log(erro);
    }
    else {
        console.log('Conectado com sucesso');

        tabelas.init(conexao);
        const app = customExpress();
        app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
    }
});


