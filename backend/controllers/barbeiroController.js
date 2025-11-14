const db = require("../config/db");

exports.criarBarbeiro = async (req, res) => {
    try {
        const { nome, email, barbearia_id, telefone } = req.body;

        if (!barbearia_id || !nome || !email) {
            return res.status(400).json({ erro: "Campos obrigatorios não informados" });
        }

        const [existe] = await db.query("SELECT * FROM barbeiros WHERE email = ?", [email]);

        if (existe.length > 0) return res.status(400).json({ erro: "E-mail já cadastrado" });

        await db.query("INSERT INTO barbeiros (nome, email, telefone, barbearia_id", [nome, email, telefone, barbearia_id]);

        res.json({ mensagem: "Barbeiro cadastrado com sucesso!" })

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao cadastrar barbeiro" })
    }
};

exports.listarBarbeiros = async (req, res) => {
    try {
        const { barbearia_id } = req.params;

        if(!barbearia_id) return res.status(400).json({erro: "ID da barbearia é obrigatorio"});

        const [rows] = await db.query("SELECT * FROM barbeiros WHERE barbearia_id = ?", [barbearia_id]);
        res.json({rows})
    } catch (erro) {}
   

}
