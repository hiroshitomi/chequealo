import { BankParser } from "./BankParser";
import { galiciaParser } from "./galiciaParser";
import { icbcParser } from "./icbcParser";

export const parsers: BankParser[] = [galiciaParser, icbcParser];