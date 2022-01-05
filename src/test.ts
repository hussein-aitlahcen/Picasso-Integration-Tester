/* eslint-disable max-len */
/**
 * Defines the tests to be run on the picasso parachain node.
 *
 * Index:
 *    endpoint:string
 *    provider:WsProvider
 *    api:ApiPromise
 *
 *    before()              Gets called before the tests and connects the API object.
 *    after()               Gets called after all tests are finished and disconnects from the API.
 *
 *    describe()            Runs the tests using Mocha
 *        1. it()           checkBalance() => Get balance and checks if > 0.
 *        2. it()           listAssetAmounts() => Gets all assets on account and lists them.
 *        3. it()
 *        4. it()
 **/

import {ApiPromise, WsProvider} from '@polkadot/api';
import {AccountTests} from './accountTests';

// ToDo: Change endpoint to be read from env variables or run parameters.
const endpoint = 'ws://127.0.0.1:9988';
const provider = new WsProvider(endpoint);
let api:ApiPromise;

before(async () => {
  api = await ApiPromise.create({provider: provider});
});

after(async () => {
  api.disconnect();
});

describe('Account Tests', () => {
  // Standard wallet tests
  it('Wallet balance check should result >0', async () => {
    await AccountTests.checkBalance(api);
  });

  // Asset tests
  it('Get single asset amount', async () => {
    await AccountTests.getSingleAssetAmount(api);
  });

  it('Get list of asset amounts', async () => {
    await AccountTests.getListAssetAmounts(api);
  });

  // ToDo
  // Governance Tests

  // ToDo
  // Vault 101 Tests

  // ToDo
  // Swap Tests

  // ToDo
  // Liquidity Tests

  // ToDo
  // Vesting tests
  it('Vesting creation test', async () => {
    // ToDo: Stub
  });

  it('Vesting add tokens test', async () => {
    // ToDo: Stub
  });
});
