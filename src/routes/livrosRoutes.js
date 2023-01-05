    import LivroController from "../controllers/livroController.js"
    import Express from "express"

    const router = Express.Router()
    
    router
        .get('/livros', LivroController.listarLivros)
        .get('/livros/busca', LivroController.ListarLivroPorEditora)
        .get('/livros/:id', LivroController.PegaLivro)
        .post('/livros', LivroController.CadastrarLivro)
        .put('/livros/:id', LivroController.AtualizaLivro)
        .delete('/livros/:id', LivroController.excluirLivro)





export default router