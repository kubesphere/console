export function stringifyResize({ cols, rows }: { cols: number; rows: number }) {
  return JSON.stringify({
    Op: 'resize',
    Cols: cols,
    Rows: rows,
  });
}

export function stringifyStdin(data: string) {
  return JSON.stringify({
    Op: 'stdin',
    Data: data,
  });
}
