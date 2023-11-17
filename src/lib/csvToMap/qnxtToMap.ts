// takes a qnxt output csv and converts it to a map

import { QnxtInputFormat } from '@/types/QnxtFormat';

export function qnxtToMap(csv: string): Map<string, QnxtInputFormat> {
  const map = new Map<string, QnxtInputFormat>();
  let lines;
  lines = csv.split('\r\n');
  if (lines.length === 1) lines = csv.split('\n');
  if (lines.length === 1) lines = csv.split('\r');

  // remove header row
  lines.shift();

  lines.forEach(line => {
    if (line === '') return;
    const cells = stringToInputFormat(line);
    const mod =
      cells.mod
        .match(/.{1,2}/g)
        ?.sort((a, b) => (a > b ? 1 : -1))
        .join('') || '';
    const key = `${cells.cpt}_${mod}_${cells.pos}`;

    // if the key exists, there's a duplicate entry
    if (map.has(key)) {
      map.set(key, Object.assign({ action: 'Duplicate' }, cells, { mod }));
    } else {
      // otherwise, add the record to the map
      map.set(key, Object.assign(cells, { mod }));
    }
  });

  // console.log(map);

  return map;
}

function stringToInputFormat(text: string): QnxtInputFormat {
  const cells = text.split(',');
  return {
    cpt: cells[0]?.trim(),
    mod: cells[1]?.trim(),
    pos: cells[2]?.trim(),
    fee: cells[3],
    effective: cells[4],
    terminate: cells[5],
  };
}
