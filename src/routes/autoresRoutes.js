import autorController from "../controllers/autorController.js";
import Express from "express";
import paginar from "../middlewares/paginar.js";

const router = Express.Router();

router.get("/autores", autorController.listarAutores, paginar);
router.get("/autores/:id", autorController.PegaAutor);
router.post("/autores", autorController.CadastrarAutor);
router.put("/autores/:id", autorController.AtualizaAutor);
router.delete("/autores/:id", autorController.excluirAutor);

export default router;
