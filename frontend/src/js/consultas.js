// Funções de consulta
export async function consultarCondominio(id, API_URL) {
  const res = await fetch(`${API_URL}/condominios/${id}`);
  if (!res.ok) throw new Error('Condomínio não encontrado');
  return await res.json();
}

export async function consultarTorre(id, API_URL) {
  const res = await fetch(`${API_URL}/torres/${id}`);
  if (!res.ok) throw new Error('Torre não encontrada');
  return await res.json();
}

export async function consultarApartamento(id, API_URL) {
  const res = await fetch(`${API_URL}/apartamentos/${id}`);
  if (!res.ok) throw new Error('Apartamento não encontrado');
  return await res.json();
}

export async function consultarPessoasDoApartamento(apartamentoId, API_URL) {
  const res = await fetch(`${API_URL}/apartamentos/${apartamentoId}`);
  if (!res.ok) throw new Error('Apartamento não encontrado');
  const json = await res.json();
  return json.pessoas || [];
}

export async function consultarHidrometroDoApartamento(apartamentoId, API_URL) {
  const res = await fetch(`${API_URL}/apartamentos/${apartamentoId}`);
  if (!res.ok) throw new Error('Apartamento não encontrado');
  const json = await res.json();
  return json.hidrometro || null;
}

export async function consultarLeituras(params, API_URL) {
  const searchParams = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/leituras?${searchParams}`);
  if (!res.ok) throw new Error('Erro ao buscar leituras');
  return await res.json();
}
