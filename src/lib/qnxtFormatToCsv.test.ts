import { describe, expect, it } from 'vitest';

import { QnxtInputFormat } from '@/types/QnxtFormat';
import { qnxtInputToOutput } from './qnxtFormatToCsv';

describe('qnxtInputToOutput', () => {
  const data: QnxtInputFormat = {
    cpt: '12345',
    mod: '',
    fee: '123.00',
    effective: '20200101',
    terminate: '',
  };

  it('should run without errors', () => {
    const output = qnxtInputToOutput(data);
    console.log(output);
    expect(output).not.toEqual(undefined);
  });
});
