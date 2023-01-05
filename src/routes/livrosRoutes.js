    import LivroController from "../controllers/livroController.js"
    import Express from "express"

    const router = Express.Router()
    
    router.get('/livros', LivroController.listarLivros)
    router.get('/livros/:id', LivroController.PegaLivro)
    router.post('/livros', LivroController.CadastrarLivro)
    router.put('/livros/:id', LivroController.AtualizaLivro)
    router.delete('/livros/:id', LivroController.excluirLivro)



export default router