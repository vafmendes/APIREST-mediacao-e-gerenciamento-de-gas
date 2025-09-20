import { Request, Response } from 'express';
import { database } from '../lib/database';
import buildDateFilter from '../utils/dateUtils';


/**
 * CREATE leitura
 * POST /hidrometros/:hidrometroId/leituras
 */
const create = async (req: Request, res: Response) => {
  try {
    const hidrometroId = Number(req.params.hidrometroId);
    if (Number.isNaN(hidrometroId)) return res.status(400).json({ error: 'hidrometroId inválido' });

    const { dataLeitura, valorM3, periodicidade } = req.body;

    if (valorM3 === undefined || valorM3 === null) {
      return res.status(400).json({ error: 'valorM3 é obrigatório' });
    }

    const leitura = await database.leitura.create({
      data: {
        hidrometroId,
        dataLeitura: dataLeitura ? new Date(dataLeitura) : new Date(),
        valorM3: String(valorM3),
        periodicidade
      }
    });

    return res.status(201).json(leitura);
  } catch (err) {
    console.error('create leitura error:', err);
    return res.status(500).json({ error: 'Erro ao criar leitura' });
  }
};

/**
 * LIST leituras
 * GET /leituras?apartamentoId=&torreId=&condominioId=&from=&to=&page=&limit=
 */
const list = async (req: Request, res: Response) => {
  try {
    const { apartamentoId, torreId, condominioId } = req.query;

    const limit = Math.min(Number(req.query.limit ?? 100), 1000);
    const page = Math.max(Number(req.query.page ?? 1), 1);
    const skip = (page - 1) * limit;

    const dateFilter = buildDateFilter(req.params.from, req.params.to);

    const where: any = {};
    if (dateFilter) where.dataLeitura = dateFilter;

    // filtros por relacionamento — prioriza o filtro mais específico
    if (apartamentoId) {
      where.hidrometro = { apartamentoId: Number(apartamentoId) };
    } else if (torreId) {
      where.hidrometro = { apartamento: { torreId: Number(torreId) } };
    } else if (condominioId) {
      where.hidrometro = { apartamento: { torre: { condominioId: Number(condominioId) } } };
    }

    const readings = await database.leitura.findMany({
      where,
      orderBy: { dataLeitura: 'desc' },
      skip,
      take: limit,
      select: {
        id: true,
        dataLeitura: true,
        valorM3: true,
        periodicidade: true,
        hidrometro: {
          select: {
            id: true,
            codigo: true,
            apartamento: {
              select: { id: true, numero: true, torreId: true }
            }
          }
        }
      }
    });

    return res.json({
      page,
      limit,
      count: readings.length,
      data: readings
    });
  } catch (err) {
    console.error('list leituras error:', err);
    return res.status(500).json({ error: 'Erro ao listar leituras' });
  }
};


export default {
  create,
  list
};