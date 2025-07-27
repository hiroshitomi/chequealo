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
    <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none"
        required
      />
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Quiero que me avisen
      </button>
      <p className="text-sm text-blue-600 mt-2">{status}</p>
    </form>
  );
};

export default FormSubmit;
