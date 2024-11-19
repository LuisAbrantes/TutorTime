const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const chalk = require('chalk');
const say = console.log;
const tutortime = require('./models/dados');
const { Sequelize } = require('sequelize');
const Monitorias = tutortime.Monitoria;
const Professor = tutortime.Professor;
const Monitor = tutortime.Monitor;
const Materia = tutortime.Materia;
const Existente = tutortime.Existente;
const { createServer } = require('vite');
const path = require('path');

let c = 1;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/home", async function (req, res) {
    say(chalk.bgCyan("Entrou em Home"));
    say(chalk.black("---------------"));
    let primeiro = await Existente.findOne({ order: [['id', 'ASC']] });
    if (!primeiro) {
        primeiro = {
            nome: "Sem Monitorias",
            imagemUrl: 'https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&w=600'
        };
    }
    const existente = await Existente.findAll({ order: [['id', 'ASC']], offset: 1 });
    res.json({ Existente: existente, primeiro: primeiro });
});

app.get("/about", function (req, res) {
    say(chalk.bgCyan("Entrou em About"));
    say(chalk.black("---------------"));
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/manage", async function (req, res) {
    say(chalk.bgCyan("Entrou em Senha"));
    say(chalk.black("---------------"));
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/manage/:senha", async function (req, res) {
    say(chalk.bgCyan("Entrou em Manage"));
    say(chalk.black("---------------"));
    const materias = await Materia.findAll();
    const monitorias = await Monitorias.findAll({
        include: [
            { model: Materia, as: 'Materia' },
            { model: Professor, as: 'Professor' },
            { model: Monitor, as: 'Monitor' }
        ],
        raw: false
    });
    if (req.params.senha == 'True') {
        res.json({ Monitorias: monitorias, Materia: materias });
    } else {
        res.redirect("/home");
    }
});

app.get("/home/:materia", async function (req, res) {
    say(chalk.bgCyan("Entrou em Materia"));
    say(chalk.black("---------------"));
    const id_materia = await Materia.findOne({ where: { nome: req.params.materia } });
    if (id_materia) {
        const monitorias = await Monitorias.findAll({
            where: { materiaId: id_materia.id },
            include: [
                { model: Monitor, as: 'Monitor' },
                { model: Professor, as: 'Professor' }
            ],
            raw: false
        });
        res.json({ monitorias: monitorias, REQ: req.params.materia });
    }
});

app.get("/inscrito/:id", async function (req, res) {
    const valorantigo = await Monitorias.findOne({ where: { id: req.params.id } });
    const valor = valorantigo.inscricoes;
    say(chalk.bgCyan("Se inscreveu em " + valorantigo.nome));
    say(chalk.black("---------------"));
    await Monitorias.update({ inscricoes: valor + 1 }, { where: { id: req.params.id } });
    res.redirect("/home");
});

app.get("/adicionar", async function (req, res) {
    say(chalk.bgCyan("Adicionando Materia"));
    say(chalk.black("---------------"));
    const materia = await Materia.findAll();
    res.json({ Materia: materia });
});

app.post("/addmat", async function (req, res) {
    try {
        const novaMateria = await Materia.create({
            nome: req.body.materiaREQ,
            imagemUrl: req.body.imagemREQ
        });
        say(chalk.bgCyan("Adicionou " + req.body.materiaREQ));
        say(chalk.black("---------------"));
        res.redirect("/manage/True");
    } catch (erro) {
        console.error("ERRO EM ADICIONAR MATERIA :" + erro);
        res.send(erro);
    }
});

app.post("/add", async function (req, res) {
    try {
        const id_materia = await Materia.findOne({ where: { id: req.body.materiaREQ }, attributes: ['id', 'nome', 'imagemUrl'] });
        const monitor = await Monitor.create({
            nome: req.body.monitorREQ,
            email: "TESTE",
            materia: id_materia.nome
        });
        const professor = await Professor.create({
            nome: req.body.professorREQ,
            email: "TESTE"
        });
        const id_moni = monitor.id;
        const id_prof = professor.id;

        async function verificarEAdicionarMateria(id_materia) {
            try {
                const verify = await Existente.findAll({ where: { nome: id_materia.nome } });
                if (verify.length === 0) {
                    const imagem = await Materia.findOne({ where: { id: req.body.materiaREQ }, attributes: ['id', 'nome', 'imagemUrl'] });
                    await Existente.create({ nome: id_materia.nome, imagemUrl: imagem.imagemUrl });
                }
            } catch (error) {
                console.error('Erro ao verificar e adicionar matéria:', error);
            }
        }
        verificarEAdicionarMateria({ nome: id_materia.nome });

        await Monitorias.create({
            horario: req.body.horarioREQ,
            dia: req.body.diaREQ,
            local: req.body.localREQ,
            imagemUrl: id_materia.imagemUrl,
            descricao: req.body.descricaoREQ,
            professorId: id_prof,
            monitorId: id_moni,
            materiaId: id_materia.id
        });
        say(chalk.bgCyan("Adicionou Monitoria de " + id_materia.nome));
        say(chalk.black("---------------"));
        res.redirect('/manage/True');
    } catch (erro) {
        res.send("ERRO EM CRIAR MONITORIA" + erro);
    }
});

app.get('/deletar/:id', async function (req, res) {
    async function verificar() {
        const monitoriadele = await Monitorias.findOne({ where: { id: req.params.id } });
        say(chalk.bgCyan("Deletou Monitoria"));
        say(chalk.black("---------------"));
        if (monitoriadele) {
            const id_mat_monitoria = monitoriadele.materiaId;
            const materia = await Materia.findOne({ where: { id: id_mat_monitoria } });
            const id_materia = materia.id;
            const monitorias = await Monitorias.findAll({ where: { materiaId: id_materia } });
            if (monitorias.length === 1) {
                await Existente.destroy({ where: { nome: materia.nome } });
            }
        }
    }
    await Monitorias.destroy({ where: { 'id': req.params.id } });
    verificar();
    res.redirect('/manage/True');
});

app.get('/deletarmat/:id', async function (req, res) {
    try {
        const materiaId = req.params.id;
        await Monitorias.destroy({ where: { materiaId: materiaId } });
        const nomemat = await Materia.findOne({ where: { id: materiaId } });
        await Materia.destroy({ where: { id: materiaId } });
        await Existente.destroy({ where: { nome: nomemat.nome } });
        say(chalk.bgCyan("Deletou Materia : " + nomemat.nome));
        say(chalk.black("---------------"));
        res.redirect('/adicionar');
    } catch (error) {
        console.error('Erro ao excluir matéria:', error);
        res.status(500).send('Erro ao excluir matéria.');
    }
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

async function startViteServer() {
    const vite = await createServer({
        server: { middlewareMode: 'html' }
    });
    app.use(vite.middlewares);
}

startViteServer();

app.listen(3000, () => {
    say(chalk.blue("Server Rodando na porta 3000!"));
});
