export function stringifyValue(value) {
  if (typeof value === 'string' || typeof value === 'number') {
    return `${value}`;
  } else {
    return JSON.stringify(value, null, '  ');
  }
}
