/* eslint-disable @typescript-eslint/no-explicit-any */
export const toString = (v: any) => Object.prototype.toString.call(v);
export function getTypeName(v: any) {
  if (v === null) return "null";
  const type = toString(v).slice(8, -1).toLowerCase();
  return typeof v === "object" || typeof v === "function" ? type : typeof v;
}
export function isDeepEqual(value1: any, value2: any): boolean {
  const type1 = getTypeName(value1);
  const type2 = getTypeName(value2);

  if (type1 !== type2) return false;

  if (type1 === "array") {
    if (value1.length !== value2.length) return false;

    // Sort the arrays before comparison
    const sortedValue1 = [...value1].sort();
    const sortedValue2 = [...value2].sort();

    return sortedValue1.every((item: any, i: number) => {
      return isDeepEqual(item, sortedValue2[i]);
    });
  }

  if (type1 === "object") {
    const keyArr1 = Object.keys(value1);
    const keyArr2 = Object.keys(value2);

    if (keyArr1.length !== keyArr2.length) return false;

    return keyArr1.every((key: string) => {
      return isDeepEqual(value1[key], value2[key]);
    });
  }

  return Object.is(value1, value2);
}
