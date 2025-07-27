import FormSubmit from "@/components/FormSubmit";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Chequealo – Detectá cargos duplicados</title>
        <meta
          name="description"
          content="Chequealo analiza tu resumen de tarjeta Galicia y te avisa si hay cargos duplicados o sospechosos."
        />
      </Head>
      <main className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold text-blue-900">Chequealo ✅</h1>
        <h2 className="text-xl mt-4 font-semibold text-blue-800">
          ¿Te cobraron dos veces y no te diste cuenta?
        </h2>
        <p className="mt-2 text-blue-700 max-w-md">
          Chequealo analiza tu resumen de tarjeta Galicia y te avisa si hay
          cargos sospechosos.
        </p>
        <FormSubmit />
      </main>
    </>
  );
}
