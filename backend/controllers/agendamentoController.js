const db = require("../config/db");

exports.listar = async (req, res) => {
    try{
        const [rows] = await db.query("SELECT a.*, b.nome AS barbeiro_nome, s_nome AS servico_nome FROM agendamentos a JOIN  barbeiros b. ON a.barbeiro_id = b.id JOIN servicos s ON a.servico_id = s.id WHERE a.barbearia_id = ?", [req.barberiaId]);
    } catch (erro) {
        res.status(500).json({erro: "Erro ao listar agendamentos"});
    }
};

exports.criar = async (req, res) => {
    try{
        const {cliente_nome, barbeiro_id, servico_id, data_horario} = req.body;
        await db.query("INSERT INTO agendamentos (cliente_nome, barbeiro_id, servico_id, data_horario, barberia_id", [cliente_nome,barbeiro_id, servico_id, req.barberiaId]);

        res.json({
            mensagem: "Agendamento criado com sucesso"
        })
    } catch (erro) {
        console.erro(erro)
        res.status(500).json({erro: "Erro ao realizar agendamento"})
    }
};

exports.atualizarStatus = async (req, res) => {
    try{
        const {id} = req.params;
        const {status} = req.body;
        await db.query("UPDATE agendamentos SET status = ? WHERE id = ? AND barbearia_id = ?", [status,id, req.barberiaId]);
        res.json({mensagem:"Agendamento atualizado"});
    } catch (erro) {
        res.status(500).json({erro:"Erro ao atuaçizar status"})
    }
}