import { QnxtInputFormat } from '@/types/QnxtFormat';

// given a map, count the actions
type Counts = {
  added: number;
  updated: number;
  terminated: number;
  passed: number;
};

export function getCounts(map: Map<string, QnxtInputFormat>): Counts {
  let added = 0,
    updated = 0,
    terminated = 0,
    passed = 0;

  map.forEach(v => {
    switch (v.action) {
      case 'Add':
        added += 1;
        break;
      case 'Update':
        updated += 1;
        break;
      case 'Terminate':
        terminated += 1;
        break;
      case 'Pass':
        passed += 1;
        break;
    }
  });

  return {
    added,
    updated,
    terminated,
    passed,
  };
}
