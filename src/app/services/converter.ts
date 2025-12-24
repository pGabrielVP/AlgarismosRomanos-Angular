import { Injectable } from '@angular/core';
import { ROMAN_DECIMAL_MAP } from '../constants/roman_decimal';
import { VALORES, SIMBOLOS } from '../constants/decimal_roman';

@Injectable({
  providedIn: 'root'
})
export class Converter {

  public toDecimal(algarismos: string): number {
    algarismos = algarismos.toUpperCase();
    let total = 0;
    let indiceCaractereAtual = 0;
    while (indiceCaractereAtual < algarismos.length) {
      let vinculumPair: boolean = algarismos.charAt(indiceCaractereAtual) === '_'
        && indiceCaractereAtual + 3 < algarismos.length
        && algarismos.charAt(indiceCaractereAtual + 2) === '_'
        && ROMAN_DECIMAL_MAP.has(algarismos.substring(indiceCaractereAtual, indiceCaractereAtual + 4));

      let vinculumSingle__NormalPair: boolean = algarismos.charAt(indiceCaractereAtual) == '_'
        || indiceCaractereAtual + 1 < algarismos.length
        && ROMAN_DECIMAL_MAP.has(algarismos.substring(indiceCaractereAtual, indiceCaractereAtual + 2));

      let key: string = vinculumPair
        ? algarismos.substring(indiceCaractereAtual, indiceCaractereAtual + 4)
        : vinculumSingle__NormalPair
          ? algarismos.substring(indiceCaractereAtual, indiceCaractereAtual + 2)
          : algarismos.substring(indiceCaractereAtual, indiceCaractereAtual + 1);

      indiceCaractereAtual += key.length;
      total += ROMAN_DECIMAL_MAP.get(key)!;
    }

    return total;
  }

  public toRoman(numero: number): string {
    if (numero === 0) return "";
    numero = Math.abs(numero);
    let resultado: string = "";
    for (let i = 0; i < VALORES.length; i++) {
      while (numero >= VALORES[i]) {
        numero = numero - VALORES[i];
        resultado = resultado + SIMBOLOS[i];
      }
    }
    return resultado;
  }
}
