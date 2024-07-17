import { describe, expect, it } from '@jest/globals';
import { sum, multiple } from './index';

describe('sum module', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1,2)).toBe(3);
  });

  it('adds -1 + -3 to equal -4', () => {
    expect(sum(-1,-3)).toBe(-4);
  });
});

describe('multiple module', () => {
  it('adds 1 * 2 to equal 2', () => {
    expect(multiple(1,2)).toBe(2);
  });

  it('adds -2 * -3 to equal 6', () => {
    expect(multiple(-2,-3)).toBe(6);
  });
});