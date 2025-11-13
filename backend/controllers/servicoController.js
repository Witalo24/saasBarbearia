const db = require("../config/db");

exports.listar = async (req, res) => {
    try{
        const [rows] = await db.query("SELECT * FROM servicos WHERE barbearia_id = ?", [req.barbeariaId]);
        res.json(rows)
    } catch (erro) {
        res.status(500).json({erro: "Erro ao listar serviços"});
    }
};

exports.criar = async (req, res) => {
    try{
        const {nome, preco, duracao} = req.body;

        await db.query("INSERT INTO servicos (nome, preco, duracao, barbearia_id) VALUES (?, ?, ?, ?)", [nome, preco, duracao, req.barbeariaId]);
        res.json({mensagem: "SErviço cadastrado com sucesso"});
    } catch (erro) {
        res.status(500).json({erro: "Erro ao cadastrar serviço"});
    }
};

exports.excluir = async (req, res) =>{
    try{
        const {id} = req.params;
        await db.query("DELETE FROM servicos WHERE id = ? AND babearia_id = ?",[id, req.barbeariaId])
    } catch (erro) {
        res.status(500).json({
            erro: "Erro ao excluir servico"
        });
    }
};