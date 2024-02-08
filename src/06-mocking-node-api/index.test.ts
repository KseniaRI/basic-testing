/* eslint-disable prettier/prettier */

import path from 'path';
import fs from 'fs';

import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;

    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    let callsNum = 1;
    const maxCalls = 5;

    while (callsNum <= maxCalls) {
      jest.advanceTimersByTime(interval);

      expect(callback).toHaveBeenCalledTimes(callsNum);

      callsNum++;
    }
  });
});

jest.mock('path', () => ({
  ...jest.requireActual('path'),
  join: jest.fn(),
}));

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  promises: {
    readFile: jest.fn(),
  },
}));

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';

    await readFileAsynchronously(pathToFile);

    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'not-existed-test.txt';
    (fs.promises.readFile as jest.Mock).mockRejectedValue({
      code: 'ENOENT',
    });

    const res = await readFileAsynchronously(pathToFile);

    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'test.txt';
    const fileContent = 'test content';
    const mockReadFile = (fs.promises.readFile as jest.Mock).mockImplementation(
      async () => Promise.resolve(fileContent),
    );

    const res = await readFileAsynchronously(pathToFile);

    if (res) {
      expect(mockReadFile).toHaveBeenCalledWith(
        path.join(__dirname, pathToFile),
      );

      expect(res).toEqual(fileContent);
    }
  });
});
