import { QnxtInputFormat, QnxtOutputFormat } from '@/types/QnxtFormat';

export function qnxtInputToOutput(input: QnxtInputFormat): QnxtOutputFormat {
  const effective = `${input.effective.slice(0, 4)}-${input.effective.slice(
    4,
    6
  )}-${input.effective.slice(6, 8)}`;

  return [
    'CPT',
    effective,
    input.cpt,
    input.mod,
    '', // carelevel
    '', // medcoverage
    '2078-12-31',
    input.cpt, // maxcodeid
    input.fee, // feeamount
    input.pos, // location
    '', // provtype
    '', // specialty
    '', // typesrv
    '', // modcode2
    input.action || '',
  ];
}

function qnxtOutputToCsv(array: QnxtOutputFormat[]) {
  // join each line with \n
  const lines = array.map(line => line.join(','));
  // console.log(lines);
  // join each cell with ,
  const csv = lines.join('\n');
  // add the header
  const headers: QnxtOutputFormat = [
    'category',
    'effdate',
    'cpt',
    'modcode',
    'carelevel',
    'medcoverage',
    'termdate',
    'maxcodeid',
    'feeamount',
    'locationcode',
    'provtype',
    'specialtycode',
    'typesrv',
    'modcode2',
    'action',
  ];
  return headers.join(',').concat('\n', csv);
}

export function inputMapToCsv(map: Map<string, QnxtInputFormat>): string {
  const output: QnxtOutputFormat[] = [];
  map.forEach(v => {
    try {
      output.push(qnxtInputToOutput(v));
    } catch (e) {
      console.log('error', v);
    }
  });
  const csv = qnxtOutputToCsv(output);
  return csv;
}
