import { Router } from 'express';

import condominioController from '../controllers/condominio.controller';
import apartamentoController from '../controllers/apartamento.controller';
import hidrometroController from '../controllers/hidrometro.controller';
import tipoPessoaController from '../controllers/tipoPessoa.controller';
import torreController from '../controllers/torre.controller';
import leituraController from '../controllers/leitura.controller';

const router = Router();

// Condominios
router.post('/condominios', condominioController.create);
router.get('/condominios/:id', condominioController.getById);

// Torres
router.post('/condominios/:condoId/torres', torreController.create);
router.get('/torres/:id', torreController.getById);

// Apartamentos
router.post('/torres/:torreId/apartamentos', apartamentoController.create);
router.get('/apartamentos/:id', apartamentoController.getById);

// Pessoas
router.post('/apartamentos/:apartamentoId/pessoas', tipoPessoaController.create);

// Hidrômetros
router.post('/apartamentos/:apartamentoId/hidrometros', hidrometroController.create);

// Leituras
router.post('/hidrometros/:hydrometerId/leituras', leituraController.create);
router.get('/leituras', leituraController.list); // filtros: apartmentId, towerId, condoId, from, to

//Consumo
router.get('/consumo/apartamento/:apartmentId', apartamentoController.consumoApartamento);
router.get('/consumo/torre/:torreId', torreController.consumoTorre);
router.get('/consumo/condominio/:condoId', condominioController.consumoCondominio);


export default router;