import { QnxtInputFormat, QnxtOutputFormat } from '@/types/QnxtFormat';

export function qnxtInputToOutput(input: QnxtInputFormat): QnxtOutputFormat {
  // const effective = `${input.effective.slice(0, 4)}-${input.effective.slice(
  //   4,
  //   6
  // )}-${input.effective.slice(6, 8)}`;
  const effectiveArr = input.effective.split('/');
  const effective = `${effectiveArr[2].padStart(
    2,
    '0'
  )}-${effectiveArr[0].padStart(2, '0')}-${effectiveArr[1]}`;

  // correct the modifiers to remove NU and sort
  const mod = input.mod
    .replace('NU', '')
    .match(/.{1,2}/g)
    ?.sort((a, b) => (a > b ? 1 : -1));

  const mod1 = mod?.[0] || '';
  const mod2 = mod?.[1] || '';

  return [
    'CPT',
    effective,
    input.cpt,
    mod1,
    '', // carelevel
    '', // medcoverage
    '2078-12-31',
    input.cpt, // maxcodeid
    input.fee, // feeamount
    input.pos, // location
    '', // provtype
    '', // specialty
    '', // typesrv
    mod2, // modcode2
    input.action || '',
    input.qnxtFee,
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
    'qnxt',
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
