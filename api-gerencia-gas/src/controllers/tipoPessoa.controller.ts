import { Request, Response } from 'express';
import { database } from '../lib/database';

const create = async (req: Request, res: Response) => {
  try {
    const apartamentoId = Number(req.params.apartamentoId);
    const { nome, endereco, email, telefone, tipo } = req.body;
    const person = await database.pessoa.create({
      data: {
        nome,
        endereco,
        email,
        telefone,
        tipo,
        apartamentoId
      }
    });
    res.status(201).json(person);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar pessoa' });
  }
};

export default { create };