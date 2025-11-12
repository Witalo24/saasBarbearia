const db = require("../config/db");

exports.listar = async (req, res) => {
    try{
        const [rows] = await db.query("SELECT * FROM barbeiros WHERE barbearia_id = ?", [req.barbeariaId]);
        res.json(rows);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({erro: "Erro ao listar barbeiros"})
    }
};
exports.criar = async (req, res) => {
    try{
        const {nome, especialidade} = req.body;
        await db.query("INSERT INTO barbeiros (nome, especialidade, barbearia_id) VALUES (?, ?, ?)", [nome, especialidade, req.barbeariaId])
        res.json({mensagem: "Barbeiro cadastrado com sucesso"});
    } catch (erro) {
        console.error(erro);
        res.status(500).json({erro: "Erro ao cadastrar barbeiro"});
    }
};

exports.excluir = async (req, res) => {
    try{
        const {id} = req.params;
        await db.query("DELETE FROM barbeiros WHERE id = ? AND barbearia_id = ? ", [id, req.barbeariaId]);
        res.json({mensagem: "Barbeiro excluido"});
    } catch (erro) {
        console.error(erro)
        res.staus(500).json({erro: "Erro ao excluir barbeiro"});
    }
};