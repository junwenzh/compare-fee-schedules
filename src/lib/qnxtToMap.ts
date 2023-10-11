// takes a qnxt output csv and converts it to a map

import { QnxtInputFormat } from '@/types/QnxtFormat';

export function qnxtToMap(csv: string): Map<string, QnxtInputFormat> {
  const map = new Map<string, QnxtInputFormat>();
  const lines = csv.split('\n');

  lines.forEach(line => {
    const cells = stringToInputFormat(line);
    const key = `${cells.cpt}_${cells.mod}`;
    map.set(key, cells);
  });

  return map;
}

function stringToInputFormat(text: string): QnxtInputFormat {
  const cells = text.split(',');
  return {
    cpt: cells[0],
    mod: cells[1],
    fee: cells[2],
    effective: cells[3],
    terminate: cells[4],
  };
}
