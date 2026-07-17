import { buildImageMaps } from '../src/utils/assets';

// Mock require for image assets
jest.mock('../../assets/users/1.jpg', () => 'user1.jpg', { virtual: true });

describe('buildImageMaps', () => {
  it('returns userImages, challengeImages, and percentageImages', () => {
    const maps = buildImageMaps();
    expect(maps).toHaveProperty('userImages');
    expect(maps).toHaveProperty('challengeImages');
    expect(maps).toHaveProperty('percentageImages');
  });

  it('userImages has entries keyed by userId', () => {
    const { userImages } = buildImageMaps();
    expect(userImages[1]).toBeDefined();
    expect(userImages[40]).toBeDefined();
  });

  it('challengeImages has entries for IDs 1-15', () => {
    const { challengeImages } = buildImageMaps();
    for (let i = 1; i <= 15; i++) {
      expect(challengeImages[i]).toBeDefined();
    }
  });

  it('percentageImages has entries for 50, 70, 90, 100', () => {
    const { percentageImages } = buildImageMaps();
    expect(percentageImages[50]).toBeDefined();
    expect(percentageImages[70]).toBeDefined();
    expect(percentageImages[90]).toBeDefined();
    expect(percentageImages[100]).toBeDefined();
  });
});
