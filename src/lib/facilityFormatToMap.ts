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
  const lines = csv.replaceAll('/r', '').split('/n');
  const results: Map<string, QnxtInputFormat> = new Map();
  lines.forEach(line => {
    const cells = line.split(',');
    const input: Input = {
      cpt: cells[0]?.trim(),
      mod: cells[1]?.trim(),
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
