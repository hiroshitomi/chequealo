import { Movimiento } from "@/app/types/Movimiento";
import { formatFecha, parseMonto } from "../utils/helpers";

export const icbcVisaParser = (text: string): Movimiento[] => {
  const movimientos: Movimiento[] = [];
  const transaccionesProcesadas = new Set<string>();

  // Buscar la línea que contiene "SU PAGO EN PESOS" para encontrar el inicio de las transacciones
  const lines = text.split("\n");
  let startIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("SU PAGO EN PESOS")) {
      startIndex = i + 1; // Comenzar desde la línea siguiente
      break;
    }
  }

  if (startIndex === -1) {
    return movimientos; // No se encontró el inicio de transacciones
  }

  // Procesar desde el inicio de transacciones hasta encontrar "TARJETA" o "SALDO ACTUAL"
  const transactionLines = lines.slice(startIndex);
  
  for (let i = 0; i < transactionLines.length; i++) {
    const line = transactionLines[i];
    
    // Detener si encontramos el total de consumos o saldo actual
    if (line.includes("TARJETA") || line.includes("SALDO ACTUAL") || line.includes("Total Consumos")) {
      break;
    }

    // Función para dividir líneas con múltiples transacciones
    function dividirTransacciones(texto: string): string[] {
      // Buscar patrones de inicio de transacción: DD.MM.YY seguido de espacio y código
      const patronInicio = /(\d{2}\.\d{2}\.\d{2}\s+\d+\*)/g;
      const matches = [...texto.matchAll(patronInicio)];
      
      if (matches.length <= 1) {
        return [texto]; // Solo una transacción
      }
      
      // Dividir en múltiples transacciones
      const transacciones: string[] = [];
      for (let i = 0; i < matches.length; i++) {
        const inicio = matches[i].index!;
        const fin = i < matches.length - 1 ? matches[i + 1].index! : texto.length;
        const transaccion = texto.substring(inicio, fin).trim();
        transacciones.push(transaccion);
      }
      
      return transacciones;
    }

    // Dividir la línea en transacciones individuales
    const transacciones = dividirTransacciones(line);
    
    // Procesar cada transacción individual
    for (let j = 0; j < transacciones.length; j++) {
      const transaccion = transacciones[j];

      // Regex 1: Para transacciones con cuotas - DD.MM.YY CODIGO* DESCRIPCION C.XX/YY MONTO
      const regexConCuotas = /^(\d{2}\.\d{2}\.\d{2})\s+(\d+\*)\s+([A-Za-z0-9\s\*\.\-\/_]+?)\s+C\.(\d+)\/(\d+)\s+([\d.]+\,\d{2})$/;
      
      // Regex 2: Para transacciones sin cuotas - DD.MM.YY CODIGO* DESCRIPCION MONTO
      const regexSinCuotas = /^(\d{2}\.\d{2}\.\d{2})\s+(\d+\*)\s+([A-Za-z0-9\s\*\.\-\/_]+?)\s+([\d.]+\,\d{2})$/;
      
      let match = transaccion.match(regexConCuotas);
      let tieneCuotas = true;
      
      if (!match) {
        match = transaccion.match(regexSinCuotas);
        tieneCuotas = false;
      }
      
      if (match) {
        let fechaRaw, codigoTransaccion, referencia, cuotaActual, cuotaTotal, pesosRaw;
        
        if (tieneCuotas) {
          [, fechaRaw, codigoTransaccion, referencia, cuotaActual, cuotaTotal, pesosRaw] = match;
        } else {
          [, fechaRaw, codigoTransaccion, referencia, pesosRaw] = match;
          cuotaActual = null;
          cuotaTotal = null;
        }
        
        // Crear clave única combinando código y descripción
        const referenciaLimpia = referencia.trim();
        const claveUnica = `${codigoTransaccion}|${referenciaLimpia}`;
        
        // Verificar si ya procesamos esta combinación código + descripción
        if (transaccionesProcesadas.has(claveUnica)) {
          continue; // Saltar esta transacción duplicada
        }
        
        // Marcar transacción como procesada
        transaccionesProcesadas.add(claveUnica);
        
        const fecha = formatFechaICBC(fechaRaw);
        const pesos = parseMonto(pesosRaw);
        
        // Formatear información de cuotas si existe
        let cuotaInfo = "";
        if (cuotaActual && cuotaTotal) {
          cuotaInfo = `${cuotaActual}/${cuotaTotal}`;
        }

        movimientos.push({
          fecha,
          referencia: referenciaLimpia,
          cuota: cuotaInfo,
          comprobante: "", // No hay número de comprobante visible
          pesos,
          dolares: 0, // Todas las transacciones están en pesos
        });
      }
    }
  }
  return movimientos;
};

// Función específica para formatear fechas de ICBC (DD.MM.YY -> YYYY-MM-DD)
function formatFechaICBC(fecha: string): string {
  const [dd, mm, yy] = fecha.split(".");
  return `20${yy}-${mm}-${dd}`;
}
