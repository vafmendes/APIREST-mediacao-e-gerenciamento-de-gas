import { Request, Response } from 'express';
import { database } from '../lib/database';
import buildDateFilter from '../utils/dateUtils';

const create = async (req: Request, res: Response) => {
  try {
    const condoId = Number(req.params.condominioId);
    const { identificacao } = req.body;
    const torre = await database.torre.create({
      data: { identificacao, condominioId: condoId }
    });
    res.status(201).json(torre);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar torre' });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const torre = await database.torre.findUnique({
      where: { id },
      include: { apartamentos: true, condominio: true }
    });
    if (!torre) return res.status(404).json({ error: 'Torre não encontrada' });
    res.json(torre);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar torre' });
  }
};

const consumoTorre = async (req: Request, res: Response) => {
  try {
    const torreId = Number(req.params.torreId);
    if (Number.isNaN(torreId)) return res.status(400).json({ error: 'torreId inválido' });

    const dateFilter = buildDateFilter(req.params.from, req.params.to);

    const agg = await database.leitura.aggregate({
      _sum: { valorM3: true },
      where: {
        ...((dateFilter) && { dataLeitura: dateFilter }),
        hidrometro: {
          apartamento: {
            torreId
          }
        }
      }
    });
   const total = Number(agg._sum?.valorM3?.toString() ?? '0');
    return res.json({ torreId, totalM3: total });
  } catch (err) {
    console.error('consumoTorre error:', err);
    return res.status(500).json({ error: 'Erro ao calcular consumo por torre' });
  }
};

export default { create, getById, consumoTorre };