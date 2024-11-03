//Database
    const { Sequelize, DataTypes } = require('sequelize');
    const sequelize = new Sequelize('tutortime','root','123456',{
        host:'localhost',
        dialect:'mysql',
        query:{raw:true}
    })

//Tabelas
    //Professores
        const Professor = sequelize.define('Professor', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        });
        /*
        +-----------+--------------+------+-----+---------+----------------+
        | Field     | Type         | Null | Key | Default | Extra          |
        +-----------+--------------+------+-----+---------+----------------+
        | id        | int          | NO   | PRI | NULL    | auto_increment |
        | nome      | varchar(255) | NO   |     | NULL    |                |
        | email     | varchar(255) | YES  |     | NULL    |                |
        | createdAt | datetime     | NO   |     | NULL    |                |
        | updatedAt | datetime     | NO   |     | NULL    |                |
        +-----------+--------------+------+-----+---------+----------------+
        */

    //Monitores
        const Monitor = sequelize.define('Monitor', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        });
        /*
        +-----------+--------------+------+-----+---------+----------------+
        | Field     | Type         | Null | Key | Default | Extra          |
        +-----------+--------------+------+-----+---------+----------------+
        | id        | int          | NO   | PRI | NULL    | auto_increment |
        | nome      | varchar(255) | NO   |     | NULL    |                |
        | email     | varchar(255) | YES  |     | NULL    |                |
        | createdAt | datetime     | NO   |     | NULL    |                |
        | updatedAt | datetime     | NO   |     | NULL    |                |
        +-----------+--------------+------+-----+---------+----------------+
        */

    //Materias
        const Materia = sequelize.define('Materia', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            descricao: {
                type: DataTypes.TEXT,
                allowNull: true,
            }
        });
        /*
        +-----------+--------------+------+-----+---------+----------------+
        | Field     | Type         | Null | Key | Default | Extra          |
        +-----------+--------------+------+-----+---------+----------------+
        | id        | int          | NO   | PRI | NULL    | auto_increment |
        | nome      | varchar(255) | NO   |     | NULL    |                |
        | descricao | text         | YES  |     | NULL    |                |
        | createdAt | datetime     | NO   |     | NULL    |                |
        | updatedAt | datetime     | NO   |     | NULL    |                |
        +-----------+--------------+------+-----+---------+----------------+
        */

    //Monitoria
        const Monitoria = sequelize.define('Monitoria', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            inscricoes: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            horario: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            dia: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            local: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imagemUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            descricao: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            professorId: {
                type: DataTypes.INTEGER,
                references: {
                    model: Professor,
                    key: 'id',
                },
            },
            monitorId: {
                type: DataTypes.INTEGER,
                references: {
                    model: Monitor,
                    key: 'id',
                },
            },
            materiaId: {
                type: DataTypes.INTEGER,
                references: {
                    model: Materia,
                    key: 'id',
                },
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

    //Inscrições
        const Inscricao = sequelize.define('Inscricao', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nomeInscrito: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            emailInscrito: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            monitoriaId: {
                type: DataTypes.INTEGER,
                references: {
                    model: Monitoria,
                    key: 'id',
                },
            },
            dataInscricao: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        });
        /*
        +---------------+--------------+------+-----+---------+----------------+
        | Field         | Type         | Null | Key | Default | Extra          |
        +---------------+--------------+------+-----+---------+----------------+
        | id            | int          | NO   | PRI | NULL    | auto_increment |
        | nomeInscrito  | varchar(255) | NO   |     | NULL    |                |
        | emailInscrito | varchar(255) | YES  |     | NULL    |                |
        | monitoriaId   | int          | YES  | MUL | NULL    |                |
        | dataInscricao | datetime     | YES  |     | NULL    |                |
        | createdAt     | datetime     | NO   |     | NULL    |                |
        | updatedAt     | datetime     | NO   |     | NULL    |                |
        +---------------+--------------+------+-----+---------+----------------+
        */


    //Definindo os relacionamentos
        Professor.hasMany(Monitoria, { foreignKey: 'professorId' });
        Monitor.hasMany(Monitoria, { foreignKey: 'monitorId' });
        Materia.hasMany(Monitoria, { foreignKey: 'materiaId' });
        Monitoria.belongsTo(Professor, { foreignKey: 'professorId' });
        Monitoria.belongsTo(Monitor, { foreignKey: 'monitorId' });
        Monitoria.belongsTo(Materia, { foreignKey: 'materiaId' });
        Monitoria.hasMany(Inscricao, { foreignKey: 'monitoriaId' });
        Inscricao.belongsTo(Monitoria, { foreignKey: 'monitoriaId' });

    //Sincronizar todas as tabelas com o banco de dados
        sequelize.sync()
            .then(() => console.log("Todas as tabelas foram criadas com sucesso"))
            .catch((error) => console.error("Erro ao criar tabelas:", error));

            //Exportação
    module.exports = { 
        Professor, 
        Monitor, 
        Materia, 
        Monitoria, 
        Inscricao 
    };
