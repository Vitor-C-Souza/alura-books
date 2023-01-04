import express from "express"
import db from './config/dbConnect.js'
import livros from "./models/livro.js"

db.on("error", console.log.bind(console, 'Erro de conexão'))

db.once("open", () => {
    console.log('conexão com o banco feito com sucesso')
})

const app = express()

app.use(express.json())

// const livros = [
//     {id: 1, "titulo": "Senhor dos Aneis"},
//     {id: 2, "titulo": "O Hobbit"}
//   ]

  app.get('/', (req,res) => {
    res.status(200).send('Curso de node')
  })

  app.get('/livros', (req,res) => {
    livros.find((err, livros) => {
        res.status(200).json(livros)
    })

    
  })

  app.post('/livros', (req,res) => {
    livros.push(req.body)
    res.status(201).send('livros cadastrado com sucesso')
  })

  app.get('/livros/:id', (req,res) => {
    const id = buscaLivro(req.params.id)

    res.status(200).send(livros[id])
    
  })
  app.put('/livros/:id', (req,res) => {
    const id = buscaLivro(req.params.id)

    livros[id].titulo = req.body.titulo

    res.status(200).send(livros)
    
  })

  app.delete('/livros/:id', (req,res) => {
    const {id} = req.params
    
    const index = buscaLivro(id)

    livros.splice(index, 1)

    res.send(`Livro ${id} removido com sucesso`)
    
  })

  function buscaLivro(id) {
    return livros.findIndex(livro => livro.id == id)
  }
  export default app