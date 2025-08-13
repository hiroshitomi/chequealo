import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Badge} from "@/components/ui/badge";

const tarjetas = [
  {value: "Visa", label: "Visa", disponible: true},
  {value: "Mastercard", label: "Mastercard", disponible: false},
  {value: "amex", label: "American Express", disponible: false},
];

export function SelectTarjeta({
  value,
  onChange,
  disabled,
}: {
  value?: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="w-full">
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona una tarjeta" />
        </SelectTrigger>
        <SelectContent>
          {tarjetas.map((tarjeta) => (
            <SelectItem key={tarjeta.value} value={tarjeta.value}>
              <div className="flex items-center justify-between w-full">
                <span>{tarjeta.label}</span>
                {!tarjeta.disponible && (
                  <Badge className="bg-sky-100 text-sky-700 border border-sky-200 text-xs ml-2">
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
