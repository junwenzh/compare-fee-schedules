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
  const lines = csv.replaceAll('\r', '').split('\n');
  // skip first line
  lines.shift();
  // build a map of QnxtInputFormat for comparison
  const map = new Map<string, QnxtInputFormat>();
  lines.forEach(line => {
    const cells = line.split(',');
    const formatted = formatSource(cells);
    const qnxtInputFormat = parseRow(formatted);
    qnxtInputFormat.forEach(record => {
      const key = `${record.cpt}_${record.mod}`;
      map.set(key, record);
    });
  });

  return map;
}

// take a row from the source file and return a SourceRow object
function formatSource(cells: string[]): SourceRow {
  return {
    cpt: cells[0],
    mod: cells[1],
    effective: cells[2],
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
    });

    const technical = Object.assign({}, partial, {
      fee: row.technical,
    });
    results.push(professional, technical);
  }

  return results;
}
