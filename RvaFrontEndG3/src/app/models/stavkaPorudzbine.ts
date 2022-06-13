import { Artikl } from "./artikl";
import { Porudzbina } from "./porudzbina";

export class StavkaPorudzbine{
    id!: number;
    cena!: number;
    kolicina!: number;
    jedinicaMere!: string;
    redniBroj!: number;
    artikl!: Artikl;
    porudzbina!: Porudzbina;
}