import { QnxtInputFormat } from '@/types/QnxtFormat';

export function compareFeeSchedules(
  source: Map<string, QnxtInputFormat>,
  target: Map<string, QnxtInputFormat>
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

    if (v.fee !== t.fee) {
      result.set(k, Object.assign({ action: 'Update' }, v));
    } else {
      result.set(k, Object.assign({ action: 'Pass' }, v));
    }

    target.delete(k);
  });

  // terminate the remaining codes from qnxt
  target.forEach((v, k) => {
    result.set(k, Object.assign({ action: 'Terminate' }, v));
  });

  return result;
}
