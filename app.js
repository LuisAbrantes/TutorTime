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
        const Existente = tutortime.Existente
        let c = 1

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
        app.engine('handlebars', handlebars.engine({
            defaultLayout: 'main',  // Layout padrão
            runtimeOptions: {
                allowedProtoProperties: true,
                allowProtoPropertiesByDefault: true
            },
            helpers: {
                // Helper ifCond para comparar valores
                ifCond: function(v1, v2, options) {
                    if (v1 === v2) {
                        return options.fn(this);  // Se a comparação for verdadeira, executa o bloco {{#ifCond}}
                    }
                    return options.inverse(this);  // Caso contrário, executa o bloco {{else}} (ou retorna vazio)
                }
            }
        }));

        app.set('view engine','handlebars')

        app.use(express.static('css'))      

    //BodyParser
        app.use(bodyParser.urlencoded({extended:false}))
        app.use(bodyParser.json())

//Rotas
    //          HOME
        app.get("/home",function(req,res){
            Existente.findAll().then(function(existente){
                res.render('src/home/index',{Existente:existente})
            })
        })
    
    //          ABOUT
        app.get("/about",function(req,res){
                res.render('src/about/about')
        })
        
    //          MANAGE

        app.get("/manage", function(req, res) {
            Materia.findAll().then(function(materias) {
                Monitorias.findAll({
                    include: [
                        {
                            model: Materia,
                            as: 'Materia' // Certifique-se de usar o alias correto
                        },
                        {
                            model: Professor,
                            as: 'Professor'
                        }
                    ],
                    raw: false
                }).then(function(monitorias) {
                    res.render('src/manage/manage', { Monitorias: monitorias, Materia: materias });
                }).catch(function(error) {
                    console.error('Erro ao buscar monitorias:', error);
                    res.status(500).send('Erro ao carregar monitorias');
                });
            })
        });

    

    //          HOME >>> MATERIA
        app.get("/home/:materia", function(req, res) {
            // Primeiro, busque a Materia com o nome que corresponde ao parametro "materia"
            Materia.findOne({ 
                where: { nome: req.params.materia } 
            }).then(function(materia) {
                if (!materia) {
                    return res.status(404).send('Matéria não encontrada'); // Se não encontrar a matéria
                }
        
                // Agora, busque as monitorias associadas a esta matéria específica
                Monitorias.findAll({
                    where: { materiaId: materia.id },  // Filtra pelas monitorias associadas a esta matéria
                    include: [
                        {
                            model: Materia,
                            as: 'Materia' // Alias correto para a associação
                        },
                        {
                            model: Professor,
                            as: 'Professor'
                        }
                    ],
                    raw: false
                }).then(function(monitorias) {
                    // Passa para a view
                    res.render('new', { 
                        monitorias: monitorias, 
                        Materia: materia,
                        REQ: req.params.materia
                    });
                }).catch(function(err) {
                    console.error('Erro ao buscar monitorias:', err);
                    res.status(500).send('Erro ao buscar monitorias');
                });
            }).catch(function(err) {
                console.error('Erro ao buscar matéria:', err);
                res.status(500).send('Erro ao buscar matéria');
            });
        });

    //         TESTE
//Database
    //Criando monitorias
        app.post("/add", async function(req, res) {
            try {
                // Criação dos registros de Monitor e Professor
                const monitor = await Monitor.create({
                    nome: req.body.monitorREQ,
                    email: "TESTE"
                })
                
                const professor = await Professor.create({
                    nome: req.body.professorREQ,
                    email: "TESTE"
                })
                
                const id_moni = monitor.id
                const id_prof = professor.id 
                const id_materia = await Materia.findOne({ where: { id: req.body.materiaREQ } })

                console.log(`ID MONITOR >>> ${id_moni}`);
                console.log(`ID PROFESSOR >>> ${id_prof}`);

                async function verificarEAdicionarMateria(id_materia) {
                try {
                    
                    const verify = await Existente.findAll({
                    where: {
                        nome: id_materia.nome
                    }
                    });

                    
                    if (verify.length === 0) {
                    
                    console.log("NAO TEM !! " + id_materia.nome);
                    
                    // Adicionar a nova matéria
                    await Existente.create({
                        nome: id_materia.nome 
                    });
                    console.log("Matéria adicionada: " + id_materia.nome);
                    
                    } else {
                    console.log("TEM " + verify[0].nome); 
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
                    imagemUrl: 'https://images.pexels.com/photos/28706618/pexels-photo-28706618.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
                    descricao: req.body.descricaoREQ,
                    professorId: id_prof,
                    monitorId: id_moni,
                    materiaId: id_materia.id
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
            Monitorias.destroy({where:{'id':req.params.id}})
            res.redirect('/manage')
        })

//Inicializando Servidor!
    app.listen(3000)
    console.log("Server Rodando na porta 3000!")