const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const Monitorias = require('./models/monitorias')

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
            res.render('src/manage/manage')
        })

//Registrando em Databases
    //Monitorias
        app.post("/add",function(req,res){
            console.log("OI")
            
            Monitorias.create({
                nome :req.body.nome,
                urlimg:req.body.urlimg || "",
                cursossug:req.body.cursossug,
                profresp:req.body.profresp,
                monitoresp:req.body.monitoresp,
                diahrs:req.body.diahr,
                sala_link:req.body.salink
            }).then(function(){
                res.redirect('/home')
            }).catch(function(erro){
                res.send("Deu Erro Boy >>>>> "+erro)
            })
        })


//Inicializando Servidor!
    app.listen(3000)
    console.log("Server Rodando na porta 3000!")