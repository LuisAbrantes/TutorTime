const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const Monitorias = require('./models/monitorias')
const todasDisciplinas = [
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
];



let c =1

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
            Monitorias.findAll().then(function(Monitorias){
                res.render('src/manage/manage',{Monitorias:Monitorias})
            })
        })
    //          HOME >>> MATERIA
            app.get("/home/:materia",function(req,res){
                Monitorias.findAll({where:{'nome':req.params.materia}}).then(function(Monitorias){
                    res.render('oi',{Monitorias:Monitorias})
                })
            })

            app.get("/TESTE",function(req,res){
                res.render("oi")
            })

//Registrando em Databases
    //Monitorias
        app.post("/add",function(req,res){
            if (todasDisciplinas.includes(req.body.nome)) {
                Monitorias.create({
                    nome :req.body.nome,
                    urlimg:req.body.urlimg || "",
                    cursossug:req.body.cursossug,
                    profresp:req.body.profresp,
                    monitoresp:req.body.monitoresp,
                    diahrs:req.body.diahr,
                    sala_link:req.body.salink
                }).then(function(){
                    res.redirect('/manage')
                }).catch(function(erro){
                    res.send("Deu Erro Boy >>>>> "+erro)
                })
            }else{
                console.log("DISCIPLINA NAO ENCONTRADA!!")
            }
            
        })
//Deletando Dados!
    app.get('/deletar/:id',function(req,res){
        Monitorias.destroy({where:{'id_monitoria':req.params.id}})
        res.redirect('/manage')
    })
//Inicializando Servidor!
    app.listen(3000)
    console.log("Server Rodando na porta 3000!")