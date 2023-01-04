import livros from "../models/livro.js";

class LivroController {

    static listarLivros = (req,res) => {

        livros.find((err, livros) => {
            res.status(200).json(livros)
        })
    }

    static CadastrarLivro = (req,res) => {
        const livro = new livros(req.body)
        
        livro.save((err) => {
            if(err) {
                res.status(500).send({message: `${err.message} - falha ao cadastrar livro`})
            } else {
                res.status(201).json(livro) 
            }
        })        
    }
}

export default LivroController