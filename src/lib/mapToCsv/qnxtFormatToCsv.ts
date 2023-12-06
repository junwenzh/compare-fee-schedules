import { QnxtInputFormat, QnxtOutputFormat } from '@/types/QnxtFormat';

export function qnxtInputToOutput(input: QnxtInputFormat): QnxtOutputFormat {
  // if input.effective is not in format yyyy-mm-dd
  // it is in mm/dd/yyyy
  // create a new string in format yyyy-mm-dd
  let effective = input.effective;

  if (!effective.match(/\d{4}-\d{2}-\d{2}/)) {
    const effectiveArr = effective.split('/');
    effective = `${effectiveArr[2].padStart(4, '0')}-${effectiveArr[0].padStart(
      2,
      '0'
    )}-${effectiveArr[1].padStart(2, '0')}`;
  }

  // split the modifer into two parts
  const mod = input.mod.match(/.{1,2}/g);
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
      console.log('error in qnxtFormatToCsv.ts, inputMapToCsv', v, e);
    }
  });
  const csv = qnxtOutputToCsv(output);
  return csv;
}
