export function sanitizePhone(phone: string): string {
  // remove all non-digits except first plus sign
  let result = phone.replace(/[^+\d]/g, '').replace(/(.)(?=\+.*)\+/g, '$1');

  // if first digit is 8, replace it with +7
  if (result[0] === '8') {
    result = `+7${result.slice(1)}`;
  }

  // if there is no +7, add it
  if (!result.startsWith('+7')) {
    result = `+7${result}`;
  }

  return result;
}
