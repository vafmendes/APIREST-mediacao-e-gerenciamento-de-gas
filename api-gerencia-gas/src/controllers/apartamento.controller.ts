import { Request, Response } from 'express';
import { database } from '../lib/database';
import buildDateFilter from '../utils/dateUtils';

const create = async (req: Request, res: Response) => {
  try {
    const torreId = Number(req.params.torreId);
    const { numero } = req.body;
    const apt = await database.apartamento.create({
      data: { numero, torreId }
    });
    res.status(201).json(apt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar apartamento' });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const apt = await database.apartamento.findUnique({
      where: { id },
      include: { pessoas: true, hidrometro: true, torre: true }
    });
    if (!apt) return res.status(404).json({ error: 'Apartamento não encontrado' });
    res.json(apt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar apartamento' });
  }
};

/**
 * CONSUMO por APARTAMENTO
 * GET /consumo/apartamento/:apartamentoId?from=&to=
 */
const consumoApartamento = async (req: Request, res: Response) => {
  try {
    const apartamentoId = Number(req.params.apartamentoId);
    if (Number.isNaN(apartamentoId)) return res.status(400).json({ error: 'apartamentoId inválido' });

    const dateFilter = buildDateFilter(req.params.from, req.params.to);

    const agg = await database.leitura.aggregate({
      _sum: { valorM3: true },
      where: {
        ...((dateFilter) && { dataLeitura: dateFilter }),
        hidrometro: { apartamentoId }
      }
    });

    // agg._sum.valorM3 é Decimal | null
    const totalStr = agg._sum?.valorM3?.toString() ?? '0';
    const total = Number(totalStr);

    return res.json({ apartamentoId, totalM3: total });
  } catch (err) {
    console.error('consumoApartamento error:', err);
    return res.status(500).json({ error: 'Erro ao calcular consumo por apartamento' });
  }
};

export default { create, getById, consumoApartamento };