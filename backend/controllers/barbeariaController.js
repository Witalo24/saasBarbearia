const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.registrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const [existe] = await db.query("SELECT * FROM barbearias WHERE email = ?", [email]);

        if (existe.length > 0) {
            return res.status(400).json({ mensagem: "E-mail já cadastrado!" });
        }


        const senhaHash = await bcrypt.hash(senha, 10);

       await db.query("INSERT INTO barberias (nome, email, senha", [nome, email, senhaHash]);

        res.json({ mensagem: "Barbearia registrada com sucesso!" });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao registrar barberia" });
    };
}

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const [rows] = await db.query("SELECT * FROM barberias WHERE email = ?", [email])
        if (rows.length === 0) return res.status(400).json({ erro: "E-mail não encontrado" });

        const barbearia = rows[0];

        const senhaCorreta = await bcrypt.compare(senha, barbearia.senha);
        if (!senhaCorreta) return res.status(401).json({ erro: "Senha incorreta" });

        const token = jwt.sign({ id: barbearia.id }, process.env.JWT_SECRET, { expiresIn: "8h" });
        res.json({ token, barbearia: { id: barbearia.id, nome: barbearia.nome, email: barbearia.email } });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro no login" });
    }
}

