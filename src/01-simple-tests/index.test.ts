/* eslint-disable prettier/prettier */

import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Add })).toBe(6);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Subtract })).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Multiply })).toBe(8);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Divide })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Exponentiate })).toBe(
      16,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: 'qwe' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '1', b: '2', action: Action.Add })).toBe(null);
  });
});
