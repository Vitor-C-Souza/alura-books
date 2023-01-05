import autorController from "../controllers/autorController.js"
import Express from "express"

const router = Express.Router()

router.get('/autores', autorController.listarAutores)
router.get('/autores/:id', autorController.PegaAutor)
router.post('/autores', autorController.CadastrarAutor)
router.put('/autores/:id', autorController.AtualizaAutor)
router.delete('/autores/:id', autorController.excluirAutor)



export default router