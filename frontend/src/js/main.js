
import {
  cadastrarCondominio,
  cadastrarTorre,
  cadastrarApartamento,
  cadastrarPessoa,
  cadastrarHidrometro,
  registrarLeitura
} from './cadastros.js';
import {
  consultarCondominio,
  consultarTorre,
  consultarApartamento,
  consultarPessoasDoApartamento,
  consultarHidrometroDoApartamento,
  consultarLeituras
} from './consultas.js';

const API_URL = 'http://localhost:3000/api';

// Consulta de Condomínio
const consultaCondominioForm = document.getElementById('consultaCondominioForm');
const consultaCondominioResult = document.getElementById('consultaCondominioResult');
consultaCondominioForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  consultaCondominioResult.textContent = '';
  const data = Object.fromEntries(new FormData(consultaCondominioForm));
  try {
    const json = await consultarCondominio(data.condominioId, API_URL);
    consultaCondominioResult.textContent = JSON.stringify(json, null, 2);
    consultaCondominioResult.className = 'result';
  } catch (err) {
    consultaCondominioResult.textContent = err.message;
    consultaCondominioResult.className = 'result error';
  }
});

// Consulta de Torre
const consultaTorreForm = document.getElementById('consultaTorreForm');
const consultaTorreResult = document.getElementById('consultaTorreResult');
consultaTorreForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  consultaTorreResult.textContent = '';
  const data = Object.fromEntries(new FormData(consultaTorreForm));
  try {
    const json = await consultarTorre(data.torreId, API_URL);
    consultaTorreResult.textContent = JSON.stringify(json, null, 2);
    consultaTorreResult.className = 'result';
  } catch (err) {
    consultaTorreResult.textContent = err.message;
    consultaTorreResult.className = 'result error';
  }
});

// Consulta de Apartamento
const consultaApartamentoForm = document.getElementById('consultaApartamentoForm');
const consultaApartamentoResult = document.getElementById('consultaApartamentoResult');
consultaApartamentoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  consultaApartamentoResult.textContent = '';
  const data = Object.fromEntries(new FormData(consultaApartamentoForm));
  try {
    const json = await consultarApartamento(data.apartamentoId, API_URL);
    consultaApartamentoResult.textContent = JSON.stringify(json, null, 2);
    consultaApartamentoResult.className = 'result';
  } catch (err) {
    consultaApartamentoResult.textContent = err.message;
    consultaApartamentoResult.className = 'result error';
  }
});

// Consulta de Pessoa
const consultaPessoaForm = document.getElementById('consultaPessoaForm');
const consultaPessoaResult = document.getElementById('consultaPessoaResult');
consultaPessoaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  consultaPessoaResult.textContent = '';
  const data = Object.fromEntries(new FormData(consultaPessoaForm));
  try {
    const pessoas = await consultarPessoasDoApartamento(data.apartamentoId, API_URL);
    if (!pessoas || pessoas.length === 0) {
      consultaPessoaResult.textContent = 'Nenhuma pessoa encontrada para este apartamento.';
      consultaPessoaResult.className = 'result';
    } else {
      consultaPessoaResult.textContent = JSON.stringify(pessoas, null, 2);
      consultaPessoaResult.className = 'result';
    }
  } catch (err) {
    consultaPessoaResult.textContent = err.message;
    consultaPessoaResult.className = 'result error';
  }
});

// Consulta de Hidrômetro
const consultaHidrometroForm = document.getElementById('consultaHidrometroForm');
const consultaHidrometroResult = document.getElementById('consultaHidrometroResult');
consultaHidrometroForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  consultaHidrometroResult.textContent = '';
  const data = Object.fromEntries(new FormData(consultaHidrometroForm));
  try {
    const hidrometro = await consultarHidrometroDoApartamento(data.apartamentoId, API_URL);
    if (!hidrometro) {
      consultaHidrometroResult.textContent = 'Nenhum hidrômetro encontrado para este apartamento.';
      consultaHidrometroResult.className = 'result';
    } else {
      consultaHidrometroResult.textContent = JSON.stringify(hidrometro, null, 2);
      consultaHidrometroResult.className = 'result';
    }
  } catch (err) {
    consultaHidrometroResult.textContent = err.message;
    consultaHidrometroResult.className = 'result error';
  }
});

// Consulta de Leituras
const consultaLeituraForm = document.getElementById('consultaLeituraForm');
const consultaLeituraResult = document.getElementById('consultaLeituraResult');
consultaLeituraForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  consultaLeituraResult.textContent = '';
  const data = Object.fromEntries(new FormData(consultaLeituraForm));
  const params = {};
  if (data.apartamentoId) params.apartamentoId = data.apartamentoId;
  if (data.torreId) params.torreId = data.torreId;
  if (data.condominioId) params.condominioId = data.condominioId;
  if (data.from) params.from = data.from;
  if (data.to) params.to = data.to;
  try {
    const json = await consultarLeituras(params, API_URL);
    consultaLeituraResult.textContent = JSON.stringify(json, null, 2);
    consultaLeituraResult.className = 'result';
  } catch (err) {
    consultaLeituraResult.textContent = err.message;
    consultaLeituraResult.className = 'result error';
  }
});

// Cadastro de Condomínio
const condominioForm = document.getElementById('condominioForm');
const condominioResult = document.getElementById('condominioResult');
condominioForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  condominioResult.textContent = '';
  const data = Object.fromEntries(new FormData(condominioForm));
  try {
    const json = await cadastrarCondominio(data, API_URL);
    condominioResult.textContent = `Condomínio cadastrado com ID: ${json.id}`;
    condominioResult.className = 'result';
  } catch (err) {
    condominioResult.textContent = err.message;
    condominioResult.className = 'result error';
  }
});

// Cadastro de Torre
const torreForm = document.getElementById('torreForm');
const torreResult = document.getElementById('torreResult');
torreForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  torreResult.textContent = '';
  const data = Object.fromEntries(new FormData(torreForm));
  try {
    const json = await cadastrarTorre(data, API_URL);
    torreResult.textContent = `Torre cadastrada com ID: ${json.id}`;
    torreResult.className = 'result';
  } catch (err) {
    torreResult.textContent = err.message;
    torreResult.className = 'result error';
  }
});

// Cadastro de Apartamento
const apartamentoForm = document.getElementById('apartamentoForm');
const apartamentoResult = document.getElementById('apartamentoResult');
apartamentoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  apartamentoResult.textContent = '';
  const data = Object.fromEntries(new FormData(apartamentoForm));
  try {
    const json = await cadastrarApartamento(data, API_URL);
    apartamentoResult.textContent = `Apartamento cadastrado com ID: ${json.id}`;
    apartamentoResult.className = 'result';
  } catch (err) {
    apartamentoResult.textContent = err.message;
    apartamentoResult.className = 'result error';
  }
});

// Cadastro de Pessoa
const pessoaForm = document.getElementById('pessoaForm');
const pessoaResult = document.getElementById('pessoaResult');
pessoaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  pessoaResult.textContent = '';
  const data = Object.fromEntries(new FormData(pessoaForm));
  try {
    const json = await cadastrarPessoa(data, API_URL);
    pessoaResult.textContent = `Pessoa cadastrada com ID: ${json.id}`;
    pessoaResult.className = 'result';
  } catch (err) {
    pessoaResult.textContent = err.message;
    pessoaResult.className = 'result error';
  }
});

// Cadastro de Hidrômetro
const hidrometroForm = document.getElementById('hidrometroForm');
const hidrometroResult = document.getElementById('hidrometroResult');
hidrometroForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  hidrometroResult.textContent = '';
  const data = Object.fromEntries(new FormData(hidrometroForm));
  try {
    const json = await cadastrarHidrometro(data, API_URL);
    hidrometroResult.textContent = `Hidrômetro cadastrado com ID: ${json.id}`;
    hidrometroResult.className = 'result';
  } catch (err) {
    hidrometroResult.textContent = err.message;
    hidrometroResult.className = 'result error';
  }
});

// Registrar Leitura
const leituraForm = document.getElementById('leituraForm');
const leituraResult = document.getElementById('leituraResult');
leituraForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  leituraResult.textContent = '';
  const data = Object.fromEntries(new FormData(leituraForm));
  try {
    const json = await registrarLeitura(data, API_URL);
    leituraResult.textContent = `Leitura registrada com ID: ${json.id}`;
    leituraResult.className = 'result';
  } catch (err) {
    leituraResult.textContent = err.message;
    leituraResult.className = 'result error';
  }
});
