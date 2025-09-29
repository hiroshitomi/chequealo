import FormSubmit from "@/components/FormSubmit";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/demo");
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header + CTA */}
      <section className="py-10 px-4 text-center bg-white shadow">
        <h1 className="text-3xl font-bold text-blue-600">Chequealo</h1>
        <p className="mt-2 text-lg">
          Tu resumen de tarjeta, más claro que nunca.
        </p>
        <FormSubmit />
      </section>

      {/* Problema */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">¿Te pasó alguna vez...?</h2>
        <ul className="space-y-2 text-lg">
          <li>• Ver un cargo duplicado y no saber de dónde salió</li>
          <li>• Compras en cuotas cobradas todas juntas</li>
          <li>• Débitos automáticos que no recordás</li>
          <li>• Revisar el resumen... y rendirte por frustración</li>
        </ul>
        <p className="mt-6 text-blue-600 font-medium">
          ¡No estás solo! Chequealo te ayuda.
        </p>
      </section>

      {/* Solución */}
      <section className="bg-green-50 py-16 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Chequealo lo detecta por vos
        </h2>
        <p className="max-w-2xl mx-auto text-lg">
          Subí tu resumen, y en segundos te mostramos si hay cargos duplicados,
          suscripciones no reconocidas o errores. Sin vueltas, sin compartir
          datos bancarios.
        </p>
      </section>

      {/* Beneficios */}
      <section className="py-16 px-6 max-w-4xl mx-auto grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold mb-2">¿Qué detectamos?</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Cargos duplicados o sospechosos</li>
            <li>Cuotas mal aplicadas</li>
            <li>Débitos automáticos no autorizados</li>
            <li>Errores frecuentes de comercios</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">¿Cómo funciona?</h3>
          <ol className="list-decimal list-inside text-gray-700">
            <li>Subís una foto o PDF de tu resumen</li>
            <li>Lo analizamos con IA (sin guardar tus datos)</li>
            <li>Te mostramos lo sospechoso de forma clara</li>
          </ol>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Chequealo es:</h2>
        <ul className="space-y-2 text-lg">
          <li>✔️ Gratuito en su versión inicial</li>
          <li>✔️ Creado en Argentina</li>
          <li>✔️ Seguro y transparente</li>
        </ul>
      </section>

      {/* CTA Final */}
      <section className="bg-blue-50 py-12 px-4 text-center">
        <h2 className="text-xl font-semibold">Sumate a la waitlist</h2>
        <p className="mt-2 text-gray-700">
          Recibí acceso anticipado cuando lancemos Chequealo.
        </p>
        <FormSubmit />
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        Hecho con 💙 por{" "}
        <Link
          href={"https://www.linkedin.com/in/hiroshidev/"}
          className="italic underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hiroshidev
        </Link>{" "}
        | © 2025 Chequealo
      </footer>
    </main>
  );
}
