import { estimateCrackTime } from './crack-time';

describe('estimateCrackTime', () => {
  test('offline fast hash is quickest to crack', () => {
    const t = estimateCrackTime(40);
    expect(t.offlineAttackFastHash).toBeLessThan(t.offlineAttackSlowHash);
    expect(t.offlineAttackSlowHash).toBeLessThan(t.onlineAttackThrottled);
  });
});
