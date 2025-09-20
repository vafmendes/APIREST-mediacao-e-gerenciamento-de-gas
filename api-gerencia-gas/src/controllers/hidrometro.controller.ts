import { Request, Response } from 'express';
import { database } from '../lib/database';

const create = async (req: Request, res: Response) => {
  try {
    const apartamentoId = Number(req.params.apartamentoId);
    const { codigo } = req.body;
    const hidrometro = await database.hidrometro.create({
      data: { codigo, apartamentoId }
    });
    res.status(201).json(hidrometro);
  } catch (err: any) {
    console.error(err);
    if (err?.code === 'P2002') { // unique constraint
      return res.status(400).json({ error: 'Código de hidrômetro já existe' });
    }
    res.status(500).json({ error: 'Erro ao criar hidrômetro' });
  }
};

export default { create };