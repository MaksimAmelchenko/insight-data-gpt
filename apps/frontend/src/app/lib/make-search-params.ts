export function makeSearchParams(query: Record<string, any>) {
  const params = Object.fromEntries(
    Object.entries(query)
      .filter(([_, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => [key, value.toString()]),
  );

  return new URLSearchParams(params);
}
