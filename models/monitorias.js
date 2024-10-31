const db = require('./db');

const Monitorias = db.sequelize.define('monitorias', {
    id_monitoria: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    urlimg: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    cursossug: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    profresp: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    monitoresp: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    diahrs: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    sala_link: {
        type: db.Sequelize.STRING,
        allowNull: true
    }
},{
    db,
    timestamps:false
})

module.exports = Monitorias


/*
                    TABLES

+--------------+------+------+-----+---------+----------------+
| Field        | Type | Null | Key | Default | Extra          |
+--------------+------+------+-----+---------+----------------+
| id_monitoria | int  | NO   | PRI | NULL    | auto_increment |
| nome         | text | YES  |     | NULL    |                |
| urlimg       | text | YES  |     | NULL    |                |
| cursossug    | text | YES  |     | NULL    |                |
| profresp     | text | YES  |     | NULL    |                |
| monitoresp   | text | YES  |     | NULL    |                |
| diahrs       | text | YES  |     | NULL    |                |
| sala_link    | text | YES  |     | NULL    |                |
+--------------+------+------+-----+---------+----------------+
*/