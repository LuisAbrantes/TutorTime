const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const Monitorias = require('./models/monitorias')
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
    
            app.get("/home/:materia",function(req,res){
                res.send(`Materia Selecionada >>> ${req.params.materia}`)
            })

//Registrando em Databases
    //Monitorias
        app.post("/add",function(req,res){
            
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
        })
//Deletando Dados!
    app.get('/deletar/:id',function(req,res){
        Monitorias.destroy({where:{'id_monitoria':req.params.id}})
        res.redirect('/manage')
    })
//Inicializando Servidor!
    app.listen(3000)
    console.log("Server Rodando na porta 3000!")