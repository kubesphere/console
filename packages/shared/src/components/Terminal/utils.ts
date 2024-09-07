/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

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
