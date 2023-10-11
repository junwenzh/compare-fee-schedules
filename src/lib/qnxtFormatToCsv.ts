import { QnxtInputFormat, QnxtOutputFormat } from '@/types/QnxtFormat';

function qnxtInputToOutput(input: QnxtInputFormat): QnxtOutputFormat {
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
    '', // location
    '', // provtype
    '', // specialty
    '', // typesrv
    '', // modcode2
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
  ];
  return headers.join(',').concat('\n', csv);
}

export function inputMapToCsv(map: Map<string, QnxtInputFormat>): string {
  const output: QnxtOutputFormat[] = [];
  map.forEach(v => {
    output.push(qnxtInputToOutput(v));
  });
  const csv = qnxtOutputToCsv(output);
  return csv;
}