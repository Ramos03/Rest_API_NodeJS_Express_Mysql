const conexao = require('../config/database/conexao');
const uploadArquivo = require('../config/arquivos/uploadDeArquivos');

class Pet{
    adicionaPet(pet,res){
        const sql = 'INSERT INTO pets SET ? ';

        uploadArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {

            if(erro){
                res.status(400).json({ erro });
            } else {
            
                const novoPet = {
                    nome: pet.nome,
                    imagem: novoCaminho
                }; 

                conexao.query(sql, novoPet, erro => {
                    if(erro){
                        console.log(erro);
                        res.status(400).json(erro);
                    } else{
                        res.status(201).json(novoPet);
                    }
                });
            }
        });
    }
}

module.exports = new Pet(); 