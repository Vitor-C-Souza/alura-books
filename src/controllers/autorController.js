import NaoEncontrado from "../error/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = autores.find();

      req.resultado = autoresResultado;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  static PegaAutor = async (req, res, next) => {
    const id = req.params.id;

    try {
      const autor = await autores.findById(id);
      if (autor !== null) {
        res.status(200).send(autor);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static CadastrarAutor = async (req, res, next) => {
    const autor = new autores(req.body);

    try {
      const novoAutor = await autor.save();
      res.status(200).json(novoAutor);
    } catch (erro) {
      next(erro);
    }
  };

  static AtualizaAutor = async (req, res, next) => {
    const id = req.params.id;

    try {
      const autorAtualizado = await autores.findByIdAndUpdate(id, {
        $set: req.body,
      });
      if (autorAtualizado !== null) {
        res
          .status(200)
          .send({ message: `autor do id ${id} atualizado com sucesso` });
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    const id = req.params.id;

    try {
      const autorExcluido = await autores.findByIdAndDelete(id);

      if (autorExcluido !== null) {
        res.status(200).json({ message: `autor do id ${id} foi apagado` });
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutorController;
