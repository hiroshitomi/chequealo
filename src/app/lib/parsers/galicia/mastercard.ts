import { Movimiento } from "@/app/types/Movimiento";
import { formatFecha, parseMonto } from "../utils/helpers";

export const galiciaMastercardParser = (text: string): Movimiento[] => {
  const movimientos: Movimiento[] = [];
  const transaccionesProcesadas = new Set<string>();

  // Buscar la sección "DETALLE DEL CONSUMO"
  const lines = text.split("\n");
  let startIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("DETALLE DEL CONSUMO")) {
      startIndex = i + 1; // Comenzar desde la línea siguiente
      break;
    }
  }

  if (startIndex === -1) {
    return movimientos; // No se encontró la sección de transacciones
  }

  // Procesar desde el inicio hasta encontrar totales o fin de sección
  // Ahora procesa TODAS las páginas, no solo la primera
  const transactionLines = lines.slice(startIndex);
  
  for (const line of transactionLines) {
    // Detener solo si encontramos totales reales, no en "Página" para continuar con páginas siguientes
    if (line.includes("SUBTOTAL") || line.includes("TOTAL A PAGAR") || line.includes("TOTAL GENERAL")) {
      break;
    }
    
    // Saltar líneas de encabezado de página pero continuar procesando
    if (line.includes("Página") || line.includes("DETALLE DEL CONSUMO") || line.trim() === "") {
      continue;
    }

    // Regex para capturar transacciones con formato: [ESPACIO] DD-Mon-YY DESCRIPCION CUOTAS COMPROBANTE PESOS [DOLARES]
    // Formato de fecha: DD-Mon-YY (ej: 12-May-24, 02-Jun-24)
    // Las columnas CUOTAS, COMPROBANTE y DOLARES pueden estar vacías
    const regex = /^\s+(\d{2}-[A-Za-z]{3}-\d{2})\s+(.+?)\s+(\d+\/\d+|\s+)\s+(\d+|\s+)\s+([\d.]+\,\d{2})(?:\s+([\d.]+\,\d{2}))?$/;
    const match = line.match(regex);
    
    // Si no hace match con el regex principal, intentar con un regex más flexible
    let matchFlexible = null;
    if (!match) {
      // Regex más flexible que maneja espacios variables y columnas opcionales
      const regexFlexible = /^\s+(\d{2}-[A-Za-z]{3}-\d{2})\s+(.+?)\s+([\d\/]+|\s+)\s+([\d]+|\s+)\s+([\d.]+\,\d{2})(?:\s+([\d.]+\,\d{2}))?$/;
      matchFlexible = line.match(regexFlexible);
    }
    
    const finalMatch = match || matchFlexible;
    
    if (finalMatch) {
      const [, fechaRaw, referencia, cuotasRaw, comprobante, pesosRaw, dolaresRaw] = finalMatch;
      
      // Limpiar datos
      const referenciaLimpia = referencia.trim();
      const comprobanteLimpio = comprobante.trim();
      
      // Crear clave única para evitar duplicados
      const claveUnica = `${fechaRaw}|${referenciaLimpia}|${comprobanteLimpio}|${pesosRaw}`;
      
      // Verificar si ya procesamos esta transacción
      if (transaccionesProcesadas.has(claveUnica)) {
        continue; // Saltar transacción duplicada
      }
      
      // Marcar transacción como procesada
      transaccionesProcesadas.add(claveUnica);
      
      const fecha = formatFechaGalicia(fechaRaw);
      const pesos = parseMonto(pesosRaw);
      // Si no hay campo de dólares, usar 0
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