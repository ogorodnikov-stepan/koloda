const { int, minMax, getNextNumericId } = require('./misc');

describe('app/misc/int', () => {
  const fallbackValues = [
    undefined, null, true, false, NaN, {}, [], 'str1ng',
  ];

  test('fallback values', () => {
    for (let i = 0; i < fallbackValues.length; i += 1) {
      expect(int(fallbackValues[i], 2)).toBe(2);
    }
  });

  test('int value', () => {
    expect(int(10, 2)).toBe(10);
  });

  test('string int value', () => {
    expect(int('10', 2)).toBe(10);
  });
});

describe('app/misc/minMax', () => {
  test('in range, no loop', () => {
    expect(minMax(5, 1, 10)).toBe(5);
  });

  test('min, no loop', () => {
    expect(minMax(1, 1, 10)).toBe(1);
  });

  test('under min, no loop', () => {
    expect(minMax(1, 5, 10)).toBe(5);
  });

  test('max, no loop', () => {
    expect(minMax(10, 1, 10)).toBe(10);
  });

  test('over max, no loop', () => {
    expect(minMax(10, 1, 5)).toBe(5);
  });

  test('in range, loop', () => {
    expect(minMax(5, 1, 10, true)).toBe(5);
  });

  test('min, loop', () => {
    expect(minMax(1, 1, 10, true)).toBe(1);
  });

  test('under min, loop', () => {
    expect(minMax(1, 5, 10, true)).toBe(10);
  });

  test('max, loop', () => {
    expect(minMax(10, 1, 10, true)).toBe(10);
  });

  test('over max, loop', () => {
    expect(minMax(10, 1, 5, true)).toBe(1);
  });
});

describe('app/getNextNumericId', () => {
  test('empty array', () => {
    expect(getNextNumericId([])).toBe(1);
  });

  test('sequential', () => {
    expect(getNextNumericId([{ id: 1 }, { id: 2 }])).toBe(3);
  });

  test('with gap', () => {
    expect(getNextNumericId([{ id: 1 }, { id: 3 }])).toBe(2);
  });
});
