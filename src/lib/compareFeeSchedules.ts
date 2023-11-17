import { QnxtInputFormat } from '@/types/QnxtFormat';

export function compareFeeSchedules(
  source: Map<string, QnxtInputFormat>,
  target: Map<string, QnxtInputFormat>,
  decimals: number
): Map<string, QnxtInputFormat> {
  const result: Map<string, QnxtInputFormat> = new Map();

  source.forEach((v, k) => {
    const t = target.get(k);

    // if the target doesn't have the key, add it
    if (!t) {
      result.set(k, Object.assign({ action: 'Add' }, v));
      return;
    }

    let srcFee = '0';
    let qnxtFee = '0';

    // try to parse the fee as a number
    try {
      srcFee = Number(v.fee).toFixed(decimals);
    } catch (e) {
      console.log(e);
    }

    try {
      qnxtFee = Number(t.fee).toFixed(decimals);
    } catch (e) {
      console.log(e);
    }

    const combined = {
      cpt: v.cpt,
      mod: v.mod,
      pos: v.pos,
      fee: v.fee,
      effective: v.effective,
      terminate: v.terminate,
      action: '',
      qnxtFee: t.fee,
    };

    // if the fees are different, flag as update
    if (srcFee !== qnxtFee) {
      combined.action = 'Update';
    } else if (v.action === 'Duplicate' || t.action === 'Duplicate') {
      combined.action = 'Duplicate';
    } else {
      // otherwise, flag as pass
      combined.action = 'Pass';
    }

    result.set(k, combined);

    target.delete(k);
  });

  // terminate the remaining codes from qnxt
  target.forEach((v, k) => {
    result.set(k, Object.assign({ action: 'Terminate' }, v));
  });

  return result;
}
