import NaoEncontrado from "../error/NaoEncontrado.js";

import { autores, livros } from "../models/index.js";

class LivroController {
  static listarLivros = (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static PegaLivro = async (req, res, next) => {
    const id = req.params.id;

    try {
      const livro = await livros.findById(id, {}, { autopopulate: false }).populate("autor", "nome").exec();

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

  static ListarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livros.find(busca);

        req.resultado = livrosResultado;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};

  if (editora) busca.editora = { $regex: editora, $options: "i" };
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPaginas) busca.numeroPaginas = { $gte: minPaginas };
  if (maxPaginas) busca.numeroPaginas = { $lte: maxPaginas };

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;
