"use client";
import {useState} from "react";

const FormSubmit = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Cargando...");

    const res = await fetch("/api/join", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email}),
    });

    if (res.ok) {
      setStatus("¡Te agregamos a la lista!");
      setEmail("");
    } else {
      setStatus("Hubo un error, intentá de nuevo.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col sm:flex-row justify-center gap-2 max-w-md mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresá tu email"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Quiero probarlo
        </button>
      </form>
      <p className="text-sm text-blue-600 mt-2">{status}</p>
    </>
  );
};

export default FormSubmit;
