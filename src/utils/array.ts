export function addItems<T>(array: T[], item: T[]): T[] {
  return [...array, ...item];
}
