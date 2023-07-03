import LivroController from "../controllers/livroController.js";
import Express from "express";
import paginar from "../middlewares/paginar.js";

const router = Express.Router();
    
router
  .get("/livros", LivroController.listarLivros, paginar)
  .get("/livros/busca", LivroController.ListarLivroPorFiltro, paginar)  // http://localhost:3000/livros/busca?minPaginas=100&maxPaginas=400
  .get("/livros/:id", LivroController.PegaLivro)
  .post("/livros", LivroController.CadastrarLivro)
  .put("/livros/:id", LivroController.AtualizaLivro)
  .delete("/livros/:id", LivroController.excluirLivro);





export default router;