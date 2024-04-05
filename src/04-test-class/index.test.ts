/* eslint-disable prettier/prettier */
// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from './index';

let INITIAL_BALANCE: number;
let account: BankAccount;
let targetAccount: BankAccount;

describe('BankAccount', () => {
  beforeEach(() => {
    INITIAL_BALANCE = 1000;
    account = getBankAccount(INITIAL_BALANCE);
    targetAccount = getBankAccount(INITIAL_BALANCE);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toEqual(INITIAL_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(1500)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(1500, targetAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(500, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(account.deposit(100)).toEqual({ _balance: INITIAL_BALANCE + 100 });
  });

  test('should withdraw money', () => {
    expect(account.withdraw(100)).toEqual({ _balance: INITIAL_BALANCE - 100 });
  });

  test('should transfer money', () => {
    expect(account.transfer(100, targetAccount)).toEqual({
      _balance: INITIAL_BALANCE - 100,
    });
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await account.fetchBalance();
    if (balance) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    account.fetchBalance = async () => 100;
    await account.synchronizeBalance();
    expect(account.getBalance()).not.toEqual(INITIAL_BALANCE);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    account.fetchBalance = async () => null;
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
