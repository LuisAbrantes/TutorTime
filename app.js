//Frameworks etc...
    const express = require('express')
    const app = express()
    const bodyParser = require('body-parser')
    const handlebars = require('express-handlebars')
//Banco de dados
    const tutortime = require('./models/dados')
    //Tabelas    
        const Monitorias = tutortime.Monitoria
        const Professor= tutortime.Professor
        const Monitor= tutortime.Monitor
        const Inscricao= tutortime.Inscricao
        const Materia = tutortime.Materia

//TESTE
    /*const todasDisciplinas = [
        // Original
        'Algoritmos e Lógica de Programação',
        'Programação Orientada a Objetos',
        'Estruturas de Dados',
        'Banco de Dados',
        'Sistemas Operacionais',
        'Redes de Computadores',
        'Engenharia de Software',
        'Desenvolvimento Web',
        'Inteligência Artificial',
        'Análise e Projeto de Sistemas',
        'Teoria da Computação',
        'Matemática Discreta',
        'Cálculo',
        'Física',
        'Química',
        'Educação Física',
        'Inglês',
        'Empreendedorismo',
        'Ética e Cidadania',
        'Arquitetura',
        'Design de Interiores',
        
        // Maiúsculas
        'ALGORITMOS E LÓGICA DE PROGRAMAÇÃO',
        'PROGRAMAÇÃO ORIENTADA A OBJETOS',
        'ESTRUTURAS DE DADOS',
        'BANCO DE DADOS',
        'SISTEMAS OPERACIONAIS',
        'REDES DE COMPUTADORES',
        'ENGENHARIA DE SOFTWARE',
        'DESENVOLVIMENTO WEB',
        'INTELIGÊNCIA ARTIFICIAL',
        'ANÁLISE E PROJETO DE SISTEMAS',
        'TEORIA DA COMPUTAÇÃO',
        'MATEMÁTICA DISCRETA',
        'CÁLCULO',
        'FÍSICA',
        'QUÍMICA',
        'EDUCAÇÃO FÍSICA',
        'INGLÊS',
        'EMPREENDEDORISMO',
        'ÉTICA E CIDADANIA',
        'ARQUITETURA',
        'DESIGN DE INTERIORES',
        
        // Minúsculas
        'algoritmos e lógica de programação',
        'programação orientada a objetos',
        'estruturas de dados',
        'banco de dados',
        'sistemas operacionais',
        'redes de computadores',
        'engenharia de software',
        'desenvolvimento web',
        'inteligência artificial',
        'análise e projeto de sistemas',
        'teoria da computação',
        'matemática discreta',
        'cálculo',
        'física',
        'química',
        'educação física',
        'inglês',
        'empreendedorismo',
        'ética e cidadania',
        'arquitetura',
        'design de interiores',
        
        // Capitalizadas
        'Algoritmos E Lógica De Programação',
        'Programação Orientada A Objetos',
        'Estruturas De Dados',
        'Banco De Dados',
        'Sistemas Operacionais',
        'Redes De Computadores',
        'Engenharia De Software',
        'Desenvolvimento Web',
        'Inteligência Artificial',
        'Análise E Projeto De Sistemas',
        'Teoria Da Computação',
        'Matemática Discreta',
        'Cálculo',
        'Física',
        'Química',
        'Educação Física',
        'Inglês',
        'Empreendedorismo',
        'Ética E Cidadania',
        'Arquitetura',
        'Design De Interiores',
        
        // Primeira palavra
        'Algoritmos',
        'Programação',
        'Estruturas',
        'Banco',
        'Sistemas',
        'Redes',
        'Engenharia',
        'Desenvolvimento',
        'Inteligência',
        'Análise',
        'Teoria',
        'Matemática',
        'Cálculo',
        'Física',
        'Química',
        'Educação',
        'Inglês',
        'Empreendedorismo',
        'Ética',
        'Arquitetura',
        'Design',
        'Administração'
    ];*/

//-Config⚙️
    //Template Engine
        app.engine('handlebars',handlebars.engine({defaultLayout:'main',runtimeOptions:{
            allowedProtoProperties:true,
            allowProtoPropertiesByDefault:true
        }}))

        app.set('view engine','handlebars')

        app.use(express.static('css'))

    //BodyParser
        app.use(bodyParser.urlencoded({extended:false}))
        app.use(bodyParser.json())

//Rotas
    //          HOME
        app.get("/home",function(req,res){
            Monitorias.findAll().then(function(Monitorias){
                res.render('src/home/index',{Monitorias:Monitorias})
            })
        })
    
    //          ABOUT
        app.get("/about",function(req,res){
                res.render('src/about/about')
        })
        
    //          MANAGE
        app.get("/manage",function(req,res){
            Professor.findAll().then(function(Professor){
                    Monitorias.findAll().then(function(Monitorias){
                        res.render('src/manage/manage',{Monitorias:Monitorias,Materia:Professor})
                    })})})

    //          HOME >>> MATERIA
            app.get("/home/:materia",function(req,res){
                Monitorias.findAll({where:{'nome':req.params.materia}}).then(function(Monitorias){
                    res.render('oi',{Monitorias:Monitorias})
                })
            })

            app.get("/TESTE",function(req,res){
                res.render("oi")
                Materia.create({
                    nome:"Math"
                })
            })

            function Imagem(materia) {
                const imagens = {
                   'Math':"tal"
                }
                return imagens.materia

            }
//Database
    //Criando monitorias
        app.post("/add", async function(req, res) {
            try {
                // Criação dos registros de Monitor e Professor
                const monitor = await Monitor.create({
                    nome: req.body.monitorREQ,
                    email: "TESTE"
                });
                
                const professor = await Professor.create({
                    nome: req.body.professorREQ,
                    email: "TESTE"
                });
                
                // Aqui você pode acessar os IDs diretamente
                const id_moni = monitor.id;  // ID do monitor criado
                const id_prof = professor.id; // ID do professor criado
        
                console.log(`ID MONITOR >>> ${id_moni}`);
                console.log(`ID PROFESSOR >>> ${id_prof}`);
                
                // Criação da Monitoria com os IDs obtidos
                await Monitorias.create({
                    horario: req.body.horarioREQ,
                    dia: req.body.diaREQ,
                    local: req.body.localREQ,
                    imagemUrl: Imagem(req.body.materiaREQ),
                    descricao: req.body.descricaoREQ,
                    professorId: id_prof,
                    monitorId: id_moni,
                    materiaId: 1
                });
                
                res.redirect('/manage');
            } catch (erro) {
                res.send("Deu Erro Boy >>>>> " + erro);
            }
            });
    
        /*
        +-------------+--------------+------+-----+---------+----------------+
        | Field       | Type         | Null | Key | Default | Extra          |
        +-------------+--------------+------+-----+---------+----------------+
        | id          | int          | NO   | PRI | NULL    | auto_increment |
        | inscricoes  | int          | YES  |     | 0       |                |
        | horario     | time         | NO   |     | NULL    |                |
        | dia         | varchar(255) | NO   |     | NULL    |                |
        | local       | varchar(255) | NO   |     | NULL    |                |
        | imagemUrl   | varchar(255) | YES  |     | NULL    |                |
        | descricao   | text         | YES  |     | NULL    |                |
        | professorId | int          | YES  | MUL | NULL    |                |
        | monitorId   | int          | YES  | MUL | NULL    |                |
        | materiaId   | int          | YES  | MUL | NULL    |                |
        | createdAt   | datetime     | NO   |     | NULL    |                |
        | updatedAt   | datetime     | NO   |     | NULL    |                |
        +-------------+--------------+------+-----+---------+----------------+
        */

    //Deletando Monitorias
        app.get('/deletar/:id',function(req,res){
            Monitorias.destroy({where:{'id_monitoria':req.params.id}})
            res.redirect('/manage')
        })

//Inicializando Servidor!
    app.listen(3000)
    console.log("Server Rodando na porta 3000!")