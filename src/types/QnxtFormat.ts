export type QnxtOutputFormat = [
  'category' | 'CPT',
  'effdate' | string,
  'cpt' | string,
  'modcode' | string,
  'carelevel' | '',
  'medcoverage' | '',
  'termdate' | '2078-12-31',
  'maxcodeid' | string,
  'feeamount' | string,
  'locationcode' | string,
  'provtype' | '',
  'specialtycode' | '',
  'typesrv' | '',
  'modcode2' | '',
  'action' | string
];

export interface QnxtInputFormat {
  cpt: string;
  mod: string;
  pos: string;
  fee: string;
  effective: string;
  terminate: string;
  action?: string;
}
