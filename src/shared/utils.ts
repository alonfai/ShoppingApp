export const isNumber = function (n: any): n is number {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
};
