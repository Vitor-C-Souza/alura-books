import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req, res) => {
    await livros
      .find()
      .populate("autor")
      .exec((err, livros) => {
        res.status(200).json(livros);
      });
  };

  static PegaLivro = async (req, res) => {
    const id = req.params.id;

    await livros
      .findById(id)
      .populate("autor", "nome")
      .exec((err, livros) => {
        if (err) {
          res.status(400).send({ message: "Id do livro não localizado." });
        } else {
          res.status(200).send(livros);
        }
      });
  };

  static CadastrarLivro = async (req, res) => {
    const livro = new livros(req.body);

    try {
      await livro.save();
      res.status(201).json(livro);
    } catch (error) {
      res.status(500).send({ message: "falha ao cadastrar livro" });
    }
  };

  static AtualizaLivro = async (req, res) => {
    const id = req.params.id;

    try {
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (error) {
      res.status(500).send({ message: `livro do id ${id} não encontrado` });
    }
  };

  static excluirLivro = async (req, res) => {
    const id = req.params.id;

    try {
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro removido com sucesso" });
    } catch (error) {
      res.status(500).send({ message: "livro não encontrado" });
    }
  };

  static ListarLivroPorEditora = async (req, res) => {
    const editora = req.query.editora;

    await livros.find({ editora: editora }, {}, (err, livros) => {
      res.status(200).send(livros);
    });
  };
}

export default LivroController;
