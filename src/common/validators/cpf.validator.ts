import { ValidateBy, buildMessage, ValidationOptions } from 'class-validator';

export function IsValidCPF(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: 'IS_VALID_CPF',
      validator: {
        validate: (value): boolean => validarCPF(value),
        defaultMessage: buildMessage((eachPrefix) => eachPrefix + '$property precisa ser um CPF válido.', validationOptions),
      },
    },
    validationOptions
  );
}

function validarCPF(cpf: any): boolean {
  if (typeof cpf !== 'string') return false;

  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  cpf = cpf.split('');

  const validator = cpf.filter((digit, index, array) => index >= array.length - 2 && digit).map((el) => +el);

  const toValidate = (pop) => cpf.filter((digit, index, array) => index < array.length - pop && digit).map((el) => +el);

  const rest = (count, pop) => ((toValidate(pop).reduce((soma, el, i) => soma + el * (count - i), 0) * 10) % 11) % 10;

  return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
}
