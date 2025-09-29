import { Movimiento } from "@/app/types/Movimiento";
import { formatFecha, parseMonto } from "../utils/helpers";

export const galiciaMastercardParser = (text: string): Movimiento[] => {
  const movimientos: Movimiento[] = [];

  // Dividir el texto en líneas
  const lines = text.split("\n");
  
  for (const line of lines) {
    // Buscar líneas que empiecen con un espacio seguido de una fecha y terminen con un monto
    // Patrón: espacio + DD-Mon-YY + descripción + ... + monto (con o sin dólares)
    
    // Regex para líneas con cuotas, comprobante y dos montos
    const regexCompleto = /^\s+(\d{2}-[A-Za-z]{3}-\d{2})\s+(.+?)\s+(\d+\/\d+)\s+(\d+)\s+([\d.]+\,\d{2})\s+([\d.]+\,\d{2})$/;
    const matchCompleto = line.match(regexCompleto);
    
    // Regex para líneas con cuotas, comprobante y un solo monto
    const regexConCuotas = /^\s+(\d{2}-[A-Za-z]{3}-\d{2})\s+(.+?)\s+(\d+\/\d+)\s+(\d+)\s+([\d.]+\,\d{2})$/;
    const matchConCuotas = line.match(regexConCuotas);
    
    // Regex para líneas con dos montos (pesos y dólares) sin cuotas
    const regexDosMontos = /^\s+(\d{2}-[A-Za-z]{3}-\d{2})\s+(.+?)\s+([\d.]+\,\d{2})\s+([\d.]+\,\d{2})$/;
    const matchDosMontos = line.match(regexDosMontos);
    
    // Regex para líneas con un solo monto (solo pesos) sin cuotas
    const regexUnMonto = /^\s+(\d{2}-[A-Za-z]{3}-\d{2})\s+(.+?)\s+([\d.]+\,\d{2})$/;
    const matchUnMonto = line.match(regexUnMonto);
    
    const finalMatch = matchCompleto || matchConCuotas || matchDosMontos || matchUnMonto;
    
    if (finalMatch) {
      let fechaRaw, referencia, cuotasRaw, comprobante, pesosRaw, dolaresRaw;
      
      if (matchCompleto) {
        // Línea completa con cuotas, comprobante y dos montos
        [, fechaRaw, referencia, cuotasRaw, comprobante, pesosRaw, dolaresRaw] = finalMatch;
      } else if (matchConCuotas) {
        // Línea con cuotas, comprobante y un solo monto
        [, fechaRaw, referencia, cuotasRaw, comprobante, pesosRaw] = finalMatch;
        dolaresRaw = "0,00"; // Asumir 0 dólares si no hay
      } else if (matchDosMontos) {
        // Línea con dos montos (pesos y dólares) sin cuotas
        [, fechaRaw, referencia, pesosRaw, dolaresRaw] = finalMatch;
        cuotasRaw = "";
        comprobante = "";
      } else if (matchUnMonto) {
        // Línea con un solo monto (solo pesos) sin cuotas
        [, fechaRaw, referencia, pesosRaw] = finalMatch;
        cuotasRaw = "";
        comprobante = "";
        dolaresRaw = "0,00"; // Asumir 0 dólares si no hay
      }
      
      // Limpiar datos
      const referenciaLimpia = referencia ? referencia.trim() : "";
      const comprobanteLimpio = comprobante ? comprobante.trim() : "";
      
      const fecha = formatFechaGalicia(fechaRaw || "");
      const pesos = parseMonto(pesosRaw || "0,00");
      const dolares = dolaresRaw ? parseMonto(dolaresRaw) : 0;
      
      // Formatear información de cuotas
      let cuotaInfo = "";
      if (cuotasRaw && cuotasRaw.trim() !== "") {
        cuotaInfo = cuotasRaw.trim();
      }

      movimientos.push({
        fecha,
        referencia: referenciaLimpia,
        cuota: cuotaInfo,
        comprobante: comprobanteLimpio,
        pesos,
        dolares,
      });
    } 
  }
  
  return movimientos;
};

// Función específica para formatear fechas de Galicia (DD-Mon-YY -> YYYY-MM-DD)
function formatFechaGalicia(fecha: string): string {
  const meses: { [key: string]: string } = {
    'Ene': '01', 'Feb': '02', 'Mar': '03', 'Abr': '04',
    'May': '05', 'Jun': '06', 'Jul': '07', 'Ago': '08',
    'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dic': '12'
  };
  
  const [dd, mes, yy] = fecha.split('-');
  const mm = meses[mes];
  
  if (!mm) {
    throw new Error(`Mes no reconocido: ${mes}`);
  }
  
  return `20${yy}-${mm}-${dd}`;
}