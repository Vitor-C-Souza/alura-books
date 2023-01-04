    import LivroController from "../controllers/livroController.js"
    import Express from "express"

    const router = Express.Router()
    
    router.get('/livros', LivroController.listarLivros)
    router.post('/livros', LivroController.CadastrarLivro)



export default router