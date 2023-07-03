import NaoEncontrado from "../error/NaoEncontrado.js";
import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find().populate("autor").exec();

      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static PegaLivro = async (req, res, next) => {
    const id = req.params.id;

    try {
      const livro = await livros.findById(id).populate("autor", "nome").exec();

      if (livro !== null) {
        res.status(200).send(livro);
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static CadastrarLivro = async (req, res, next) => {
    const livro = new livros(req.body);

    try {
      await livro.save();
      res.status(201).json(livro);
    } catch (erro) {
      next(erro);
    }
  };

  static AtualizaLivro = async (req, res, next) => {
    const id = req.params.id;

    try {
      const livroAtualizado = await livros.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (livroAtualizado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    const id = req.params.id;

    try {
      const livroExcluido = await livros.findByIdAndDelete(id);
      if (livroExcluido !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static ListarLivroPorEditora = async (req, res, next) => {
    const editora = req.query.editora;
    try {
      const livrosResultado = await livros.find({ editora: editora });

      res.status(200).send(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };
}

export default LivroController;
