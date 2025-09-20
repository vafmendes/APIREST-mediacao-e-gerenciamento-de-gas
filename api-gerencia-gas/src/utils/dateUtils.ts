/**
 * Helpers para parse de datas e construção de filtros
 */
function parseDate(value?: string | string[] | null): Date | undefined {
  if (!value) return undefined;
  const s = Array.isArray(value) ? value[0] : value;
  const d = new Date(s);
  return isNaN(d.getTime()) ? undefined : d;
}

function buildDateFilter(from?: string | string[] | null, to?: string | string[] | null){
  const dataInicio = parseDate(from);
  const dataFinal = parseDate(to);
  if (!dataInicio && !dataFinal) return undefined;
  const obj: any = {};
  if (dataInicio) obj.gte = dataInicio;
  if (dataFinal) obj.lte = dataFinal;
  return obj;
}

export default buildDateFilter;