export function skipUndefined(obj: Record<string, any>): Record<string, any> {
  return Object.entries(obj).reduce<any>((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

