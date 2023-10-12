// takes a qnxt output csv and converts it to a map

import { QnxtInputFormat } from '@/types/QnxtFormat';

export function qnxtToMap(csv: string): Map<string, QnxtInputFormat> {
  const map = new Map<string, QnxtInputFormat>();
  const lines = csv.split('\n');

  // remove header row
  lines.shift();

  lines.forEach(line => {
    const cells = stringToInputFormat(line);
    const key = `${cells.cpt}_${cells.mod}_${cells.pos}`;
    map.set(key, cells);
  });

  return map;
}

function stringToInputFormat(text: string): QnxtInputFormat {
  const cells = text.split(',');
  return {
    cpt: cells[0],
    mod: cells[1],
    pos: cells[2],
    fee: cells[3],
    effective: cells[4],
    terminate: cells[5],
  };
}
