import { ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ name: 'ValidUF' })
export class ValidaUF {
  validate(sigla: string): boolean {
    if (sigla) {
      return !!STATE_UFS.find((uf) => sigla.toUpperCase() === uf);
    }

    return false;
  }
}

export const STATE_UFS = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MS',
  'MT',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];
