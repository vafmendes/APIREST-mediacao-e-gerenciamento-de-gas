// Funções de cadastro
export async function cadastrarCondominio(data, API_URL) {
  const res = await fetch(`${API_URL}/condominios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erro ao cadastrar condomínio');
  return await res.json();
}

export async function cadastrarTorre(data, API_URL) {
  const res = await fetch(`${API_URL}/condominios/${data.condominioId}/torres`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identificacao: data.identificacao })
  });
  if (!res.ok) throw new Error('Erro ao cadastrar torre');
  return await res.json();
}

export async function cadastrarApartamento(data, API_URL) {
  const res = await fetch(`${API_URL}/torres/${data.torreId}/apartamentos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ numero: data.numero })
  });
  if (!res.ok) throw new Error('Erro ao cadastrar apartamento');
  return await res.json();
}

export async function cadastrarPessoa(data, API_URL) {
  const res = await fetch(`${API_URL}/apartamentos/${data.apartamentoId}/pessoas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      tipo: data.tipo
    })
  });
  if (!res.ok) throw new Error('Erro ao cadastrar pessoa');
  return await res.json();
}

export async function cadastrarHidrometro(data, API_URL) {
  const res = await fetch(`${API_URL}/apartamentos/${data.apartamentoId}/hidrometros`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ codigo: data.codigo })
  });
  if (!res.ok) throw new Error('Erro ao cadastrar hidrômetro');
  return await res.json();
}

export async function registrarLeitura(data, API_URL) {
  const res = await fetch(`${API_URL}/hidrometros/${data.hidrometroId}/leituras`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      dataLeitura: data.dataLeitura,
      valorM3: data.valorM3,
      periodicidade: data.periodicidade
    })
  });
  if (!res.ok) throw new Error('Erro ao registrar leitura');
  return await res.json();
}
