export function formatMoney(value: number) {
  let valueToBeFormatted = value;

  if (!valueToBeFormatted || valueToBeFormatted < 0) {
    valueToBeFormatted = 0;
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valueToBeFormatted);
};