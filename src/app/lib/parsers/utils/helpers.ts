function formatFecha(fecha: string) {
  const [dd, mm, yy] = fecha.split("-");
  return `20${yy}-${mm}-${dd}`;
}

function parseMonto(monto: string): number {
  return parseFloat(monto.replace(/\./g, '').replace(',', '.'));
}

export { formatFecha, parseMonto}