export const getWaitlistEmailHTML = (name: string = "Usuario") => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>¡Bienvenido a Chequealo!</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2250f4 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
            ¡Bienvenido a Chequealo! 🎉
          </h1>
          <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">
            La herramienta que revolucionará el análisis de tus extractos bancarios
          </p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 22px;">
            ¡Gracias por sumarte a nuestra lista de espera!
          </h2>
          
          <p style="color: #4b5563; margin-bottom: 20px; font-size: 16px;">
            Hola ${name}, estamos trabajando duro para traerte la mejor herramienta de análisis de extractos bancarios. Con Chequealo podrás:
          </p>

          <ul style="color: #4b5563; margin-bottom: 30px; padding-left: 20px;">
            <li style="margin-bottom: 8px;">📊 Analizar automáticamente tus movimientos bancarios</li>
            <li style="margin-bottom: 8px;">🔍 Detectar patrones y categorizar gastos</li>
            <li style="margin-bottom: 8px;">📈 Generar reportes detallados de tus finanzas</li>
            <li style="margin-bottom: 8px;">⚡ Ahorrar tiempo en el análisis manual</li>
          </ul>

          <div style="background-color: #f0f9ff; border-left: 4px solid #2250f4; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
            <p style="color: #1e40af; margin: 0; font-weight: 500;">
              <strong>¿Qué sigue?</strong> Te mantendremos informado sobre nuestro progreso y serás uno de los primeros en probar Chequealo cuando esté listo.
            </p>
          </div>

          <div style="text-align: center; margin: 40px 0;">
            <a href="#" style="background: linear-gradient(135deg, #2250f4 0%, #1e40af 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(34, 80, 244, 0.3);">
              Conocer más sobre Chequealo
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; margin: 0 0 15px 0; font-size: 14px;">
            Si no deseas recibir estos emails, puedes 
            <a href="#" style="color: #2250f4; text-decoration: none;">cancelar tu suscripción</a>.
          </p>
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            © 2025 Chequealo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};
