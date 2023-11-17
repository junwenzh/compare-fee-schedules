import { QnxtInputFormat } from '@/types/QnxtFormat';

type SourceRow = {
  cpt: string;
  mod: string;
  effective: string;
  terminate: string;
  global: string;
  professional: string;
  technical: string;
};

// take a source string and return an array in the qnxt output format
export function magnacareToQnMap(csv: string): Map<string, QnxtInputFormat> {
  // split the csv into array of lines
  let lines = csv.split('\r\n');
  if (lines.length === 1) lines = csv.split('\n');
  if (lines.length === 1) lines = csv.split('\r');
  // skip first line
  lines.shift();
  // build a map of QnxtInputFormat for comparison
  const map = new Map<string, QnxtInputFormat>();
  // iterate over each line
  lines.forEach(line => {
    if (line === '') return;
    const cells = line.split(',');
    const formatted = formatSource(cells);
    const qnxtInputFormat = parseRow(formatted);

    qnxtInputFormat.forEach(record => {
      // sort mods ascending
      const mod =
        record.mod
          .match(/.{1,2}/g)
          ?.sort((a, b) => (a > b ? 1 : -1))
          .join('') || '';

      const key = `${record.cpt}_${mod}_${record.pos}`;

      // if the key exists, there's a duplicate entry
      if (map.has(key)) {
        const val = map.get(key)!;
        val.fee = `${val.fee}|${record.fee}`;
        val.action = `${val.action}|Duplicate`;
        map.set(key, val);
      } else {
        // otherwise, add the record to the map
        map.set(key, Object.assign({}, record, { mod: mod }));
      }
    });
  });

  // console.log(map);

  return map;
}

// take a row from the source file and return a SourceRow object
function formatSource(cells: string[]): SourceRow {
  const effective = `${cells[2].slice(4, 6)}/${cells[2].slice(
    6,
    8
  )}/${cells[2].slice(0, 4)}`;
  return {
    cpt: cells[0]?.trim(),
    mod: cells[1]?.trim(),
    effective: effective,
    terminate: cells[3],
    global: cells[4],
    professional: cells[5],
    technical: cells[6],
  };
}

// take a row from the source and output a row in QnxtInputFormat
function parseRow(row: SourceRow): QnxtInputFormat[] {
  const results: QnxtInputFormat[] = [];

  const partial = {
    cpt: row.cpt,
    mod: row.mod,
    pos: '',
    effective: row.effective,
    terminate: row.terminate,
  };

  const global = Object.assign({}, partial, {
    fee: row.global,
  });

  results.push(global);

  if (row.professional !== '0' || row.technical !== '0') {
    const professional = Object.assign({}, partial, {
      fee: row.professional,
      mod: '26',
    });

    const technical = Object.assign({}, partial, {
      fee: row.technical,
      mod: 'TC',
    });
    results.push(professional, technical);
  }

  return results;
}
