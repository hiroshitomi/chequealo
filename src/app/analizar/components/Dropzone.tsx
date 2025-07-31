import {useRef} from "react";

export default function Dropzone({
  onFileAccepted,
}: {
  onFileAccepted: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onFileAccepted(file);
    } else {
      alert("Solo se permiten archivos PDF.");
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 p-6 rounded-xl text-center cursor-pointer"
      onClick={() => inputRef.current?.click()}
    >
      <p className="text-sm text-gray-600">Tocá para subir tu resumen PDF</p>
      <input
        type="file"
        ref={inputRef}
        accept="application/pdf"
        onChange={handleFile}
        hidden
      />
    </div>
  );
}
