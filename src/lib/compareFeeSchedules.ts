import { QnxtInputFormat } from '@/types/QnxtFormat';

export function compareFeeSchedules(
  source: Map<string, QnxtInputFormat>,
  target: Map<string, QnxtInputFormat>,
  decimals: number
): Map<string, QnxtInputFormat> {
  const result: Map<string, QnxtInputFormat> = new Map();

  source.forEach((v, k) => {
    const t = target.get(k);
    // if not in target (qnxt), flag as add
    // if in target, check rates
    // if rate is different, flag as update
    // else flag as pass
    if (!t) {
      result.set(k, Object.assign({ action: 'Add' }, v));
      return;
    }

    let srcFee = '0';
    let qnxtFee = '0';

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
      qnxtFee,
    };

    if (srcFee !== qnxtFee) {
      combined.action = 'Update';
    } else {
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
