import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const bancos = [
  { value: "galicia", label: "Galicia", disponible: true },
  { value: "icbc", label: "ICBC", disponible: false },
  { value: "santander", label: "Santander", disponible: false },
];

export function SelectBanco({ value, onChange, disabled }: { value?: string; onChange: (val: string) => void; disabled?: boolean }) {
  return (
    <div className="w-full">
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder="Selecciona un banco" />
      </SelectTrigger>
      <SelectContent>
        {bancos.map((banco) => (
          <SelectItem key={banco.value} value={banco.value}>
            <div className="flex items-center justify-between w-full">
              <span>{banco.label}</span>
              {!banco.disponible && (
                <Badge className="bg-sky-100 text-sky-700 border border-sky-200 text-xs">
                  Próximamente
                </Badge>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    </div>
  );
}
