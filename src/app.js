import express from "express"
import db from './config/dbConnect.js'
import livros from "./models/livro.js"
import routes from "./routes/index.js"

db.on("error", console.log.bind(console, 'Erro de conexão'))

db.once("open", () => {
    console.log('conexão com o banco feito com sucesso')
})

const app = express()

app.use(express.json())

routes(app)

  

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