import { randomInt } from 'node:crypto';

/**
 *
 * @param str - string to split
 * @param maxStep - max step to increase string
 * @param maxDelay - max delay between steps
 */
export async function* increasingStringParts(str: string, maxStep: number, maxDelay: number) {
  let index = 0;

  while (index < str.length) {
    const step = randomInt(1, maxStep);
    index += step;
    if (index > str.length) {
      index = str.length;
    }
    yield str.substring(0, index);

    const delay = randomInt(1, maxDelay);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}
