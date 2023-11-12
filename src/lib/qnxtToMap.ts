// takes a qnxt output csv and converts it to a map

import { QnxtInputFormat } from '@/types/QnxtFormat';

export function qnxtToMap(csv: string): Map<string, QnxtInputFormat> {
  const map = new Map<string, QnxtInputFormat>();
  const lines = csv.split('\n');

  // remove header row
  lines.shift();

  lines.forEach(line => {
    const cells = stringToInputFormat(line);
    const mod =
      cells.mod
        .replace('NU', '')
        .match(/.{1,2}/g)
        ?.sort((a, b) => (a > b ? 1 : -1))
        .join('') || '';
    const key = `${cells.cpt}_${mod}_${cells.pos}`;

    // if the key exists, there's a duplicate entry
    if (map.has(key)) {
      map.set(key, Object.assign({ action: 'Duplicate' }, cells));
    } else {
      // otherwise, add the record to the map
      map.set(key, cells);
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
