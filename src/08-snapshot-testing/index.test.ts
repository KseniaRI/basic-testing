/* eslint-disable prettier/prettier */

import { generateLinkedList } from './index';

const elements = [1, 2, 3];

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    expect(generateLinkedList(elements)).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const generetedList = generateLinkedList(elements);
    expect(generetedList).toMatchSnapshot();
  });
});
