const { query } = require('express')
const Sequelize = require('sequelize')

//Conexão com o DataBase
    const sequelize = new Sequelize('tutortime','root','123456',{
        host:'localhost',
        dialect:'mysql',
        query:{raw:true}
    })

//Exportação do DataBase
    module.exports={
        Sequelize:Sequelize,
        sequelize:sequelize
    }

