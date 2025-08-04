import { Movimiento } from "@/app/types/Movimiento";

export interface BankParser {
  name: string;
  detect: (text: string) => boolean;
  parse: (text: string) => Movimiento[];
}