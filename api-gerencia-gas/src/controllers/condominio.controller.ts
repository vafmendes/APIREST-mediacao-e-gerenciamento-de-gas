import { Request, Response } from 'express';
import { database } from '../lib/database';
import buildDateFilter from '../utils/dateUtils';

const create = async (req: Request, res: Response) => {
  try {
    const { nome, cep, logradouro, numero, bairro, estado, uf } = req.body;
    const condominio = await database.condominio.create({
      data: { nome, cep, logradouro, numero, bairro, estado, uf }
    });
    res.status(201).json(condominio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar condomínio' });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const condominio = await database.condominio.findUnique({
      where: { id },
      include: { torres: { include: { apartamentos: true } } }
    });
    if (!condominio) return res.status(404).json({ error: 'Condomínio não encontrado' });
    res.json(condominio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar condomínio' });
  }
};

/**
 * CONSUMO por CONDOMÍNIO
 * GET /consumo/condominio/:condominioId?from=&to=
 */
const consumoCondominio = async (req: Request, res: Response) => {
  try {
    const condominioId = Number(req.params.condominioId);
    if (Number.isNaN(condominioId)) return res.status(400).json({ error: 'condominioId inválido' });

    const dateFilter = buildDateFilter(req.params.from, req.params.to);

    const agg = await database.leitura.aggregate({
      _sum: { valorM3: true },
      where: {
        ...((dateFilter) && { dataLeitura: dateFilter }),
        hidrometro: {
          apartamento: {
            torre: {
              condominioId
            }
          }
        }
      }
    });

    const total = Number(agg._sum?.valorM3?.toString() ?? '0');
    return res.json({ condominioId, totalM3: total });
  } catch (err) {
    console.error('consumoCondominio error:', err);
    return res.status(500).json({ error: 'Erro ao calcular consumo por condomínio' });
  }
};

export default { create, getById, consumoCondominio };