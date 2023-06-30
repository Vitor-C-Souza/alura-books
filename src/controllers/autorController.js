import autores from "../models/autor.js";

class AutorController {
  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  static PegaAutor = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
      const autor = await autores.findById(id, data);
      res.status(200).send(autor);
    } catch (error) {
      res.status(400).json({ message: "Error, id errado!!!" });
    }
  };

  static CadastrarAutor = async (req, res) => {
    const autor = new autores(req.body);

    try {
      const novoAutor = await autor.save();
      res.status(200).json(novoAutor);
    } catch (error) {
      res.status(500).send({ message: "falha ao cadastrar autor" });
    }
  };

  static AtualizaAutor = async (req, res) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res
        .status(200)
        .send({ message: `autor do id ${id} atualizado com sucesso` });
    } catch (error) {
      res.status(500).send({ message: "Autor ou campo não encontrado" });
    }
  };

  static excluirAutor = async (req, res) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndDelete(id);
      res.status(200).json({ message: `autor do id ${id} foi apagado` });
    } catch (error) {
      res.status(400).json({ message: "autor não encontrado" });
    }
  };
}

export default AutorController;
