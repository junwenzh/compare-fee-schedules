import { QnxtInputFormat } from '@/types/QnxtFormat';

type Input = {
  cpt: string;
  mod: string;
  office: string; // office rate
  facility: string; // facility rate
  effective: string;
};

const facilityPos = [
  '02',
  '19',
  '21',
  '22',
  '23',
  '24',
  '26',
  '31',
  '34',
  '41',
  '42',
  '51',
  '52',
  '53',
  '56',
  '61',
];

export function facilityFormatToMap(csv: string): Map<string, QnxtInputFormat> {
  let lines;
  lines = csv.split('\r\n');
  if (lines.length === 1) lines = csv.split('\n');
  if (lines.length === 1) lines = csv.split('\r');

  const results: Map<string, QnxtInputFormat> = new Map();

  lines.forEach(line => {
    if (line === '') return;

    const cells = line.split(',');

    const mod =
      cells[1]
        .replace('NU', '')
        .match(/.{1,2}/g)
        ?.sort((a, b) => (a > b ? 1 : -1))
        .join('')
        .trim() || '';

    const input: Input = {
      cpt: cells[0]?.trim(),
      mod: mod,
      office: cells[2],
      facility: cells[3],
      effective: cells[4],
    };

    const partial = {
      cpt: input.cpt,
      mod: input.mod,
      pos: '',
      effective: input.effective,
      terminate: '',
    };

    // if the office rate is not blank, add it to the map
    if (input.office !== '') {
      const key = `${input.cpt}_${input.mod}_`;
      results.set(key, Object.assign({ fee: input.office }, partial));
    }

    if (input.office !== input.facility && input.facility !== '') {
      facilityPos.forEach(pos => {
        const key = `${input.cpt}_${input.mod}_${pos}`;
        results.set(key, Object.assign({ fee: input.facility }, partial));
      });
    }
  });

  return results;
}
