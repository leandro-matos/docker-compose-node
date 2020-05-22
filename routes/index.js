var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
require('marko/node-require').install()// Habilita o uso do template Marko
require('marko/express')
let Book = require('../models/Book')
var indexTemplate = require('../views/index.marko')


// Busca a página e carrega os livros
router.get('/', (req, res) => {
    console.log("Exibindo a Home!")
    if(mongoose.connection.readyState){
        Book.find({}).then((books) => {
            res.marko(indexTemplate, {books: books})
        })
    }else{
        res.marko(indexTemplate)
    }
})


// Seed nos arquivos
router.get('/seed', (req,res) => {
    let livros = [
        new Book({
            name: "SPQR - Uma história da Roma antiga", 
            price: "R$59,90", 
            description: "Cobrindo mil anos da história romana, SPQR revela em detalhes como Roma cresceu de uma vila insignificante na Itália Central para se tornar a primeira potência global", 
            cover: "spqr.jpg"
        }),
        new Book(
        {
            name: "Declínio e queda do império romano", 
            price: "R$39,90", 
            description: "Publicada em seis volumes, entre 1776 e 1778, esta obra, imediatamente reconhecida como clássica e que se tornaria a mais famosa da historiografia inglesa.",  
            cover: "gibbon.jpg"
        }),
         new Book({
            name: "Os Inimigos de Roma", 
            price: "R$39,90", 
            description: "Os inimigos de Roma mostra o crescimento e eventual queda de Roma pelo ponto de vista das pessoas que lutaram contra ela. Aqui está a realidade por trás de lendass e histórias de grandes guerreiros",  
            cover: "inimigos.jpg"
        }),
        new Book({
            name: "Rômulo a Justiniano", 
            price: "R$69,90", 
            description: "Os romanos tinham o hábito de preservar a história dos seus antepassados por meio de mitos. A fundação de Roma parte justamente de um mito célebre - a lenda dos irmãos Rômulo e Remo.",  
            cover: "martin.jpg"
        }),
        new Book({
            name: "Em nome de Roma", 
            price: "R$59,90", 
            description: "Muito já se escreveu sobre Roma. Neste livro, porém, o aclamado historiador inglês Adrian Goldsworthy inova ao colocar o foco nos personagens mais decisivos do Império Romano: seus generais. Foi através de seu poderio militar que o Império foi criado",  
            cover: "adrian.jpg"
        }),
        new Book({
            name: "História de Roma", 
            price: "R$25,90", 
            description: "o historiador nos conduz pelos caminhos do Império com uma linguagem poética e precisa. Roma ressurge, assim, não só como potência política e militar de um mundo em constante conflito, mas também nas motivações filosóficas, artísticas ou religiosas",  
            cover: "grimal.jpg"
        }),
        new Book({
            name: "Anibal: O Inimigo de Roma", 
            price: "R$23,90", 
            description: "Século III a. C., a Primeira Guerra Púnica culmina com o triunfo do Império Romano. O general cartaginês derrotado no campo de batalha é Amílcar Barca, pai de Aníbal Barca, que, na ocasião, era apenas uma criança.",  
            cover: "anibal.jpg"
        }),
        new Book(
        {
            name: "Roma: A História De Um Império", 
            price: "R$39,90", 
            description: "Cobrindo toda a vasta extensão do Império, esse livro combina três perspectivas. Primeiro, é uma história completa do Império Romano: como foi criado, como resistiu às crises e como moldou o mundo até o alvorecer da Idade Média.",  
            cover: "greg.jpg"
        })


    ]
                    
         
    Book.insertMany(livros).then(moogoseDocuments => {
        console.log(moogoseDocuments, "Inseridos com sucesso")
    }).catch(err => {
        console.log(err)
    })  
    res.send(" Livros salvos com sucesso, retorne a rota anterior :) ");
    
})

module.exports = router;