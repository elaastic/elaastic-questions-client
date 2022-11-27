export function parseIntFromUrlParam(param: string | string[]): number {
  if (typeof param !== "string") {
    throw Error(`Expects a string ; got "${param}"`);
  }

  const n = parseInt(param as string);

  if (isNaN(n)) {
    throw Error(`Expects a number ; got "${param}"`);
  }

  return n;
}
