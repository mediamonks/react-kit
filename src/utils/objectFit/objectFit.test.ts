import { contain, cover } from './objectFit.js';

describe('objectFit', () => {
  describe('contain', () => {
    it('returns expected values for positive input arguments', () => {
      expect(contain(100, 100, 50, 50)).toEqual({
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        scale: 2,
        cssText: 'left:0px;top:0px;width:100px;height:100px;',
      });
    });

    it('throws an error for non-positive input arguments', () => {
      expect(() => contain(1, 1, 1, 0)).toThrow('All arguments should have a positive value');
    });
  });

  describe('cover', () => {
    it('returns expected values for positive input arguments', () => {
      expect(cover(100, 100, 50, 50)).toEqual({
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        scale: 2,
        cssText: 'left:0px;top:0px;width:100px;height:100px;',
      });
    });

    it('throws an error for non-positive input arguments', () => {
      expect(() => cover(1, 1, -1, 1)).toThrow('All arguments should have a positive value');
    });
  });
});
