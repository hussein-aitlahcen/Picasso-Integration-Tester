/* eslint-disable max-len */
/**
 * Defines the tests to be run on the picasso parachain node.
 *
 * Settings will later be configured using either a configuration
 * file or using environment variables. Until then, please set
 * the constant variables below.
 *
 * Index:
 *    before()                Gets called before the tests and connects the API object.
 *    after()                 Gets called after all tests are finished and disconnects from the API.
 *
 *    describe()              Runs the tests using Mocha.
 *    runAccountWalletTests()
 **/

import {ApiPromise, Keyring, WsProvider} from '@polkadot/api';
import {AccountTests} from './tests/accountTests';
require('dotenv').config();

// ToDo: Change endpoint to be read from env variables or run parameters.
const testSudoCommands = process.env.TEST_SUDO_CMD === 'true';
const useTestnetWallets = process.env.USE_TESTNET_WALLETS === 'true';
const endpoint = process.env.PICASSO_RPC;
const provider = new WsProvider(endpoint);
let api:ApiPromise;
let keyring:Keyring;

// ToDo: Read public/private keys from external file to be usable in live environment.
//       and ability to specify keys using env variables or using run parameters.
let walletAlice;
let walletBob;
let walletCharlie;
let walletDave;
let walletEve;
let walletFerdie;

before(async () => {
  api = await ApiPromise.create({provider: provider});
  keyring = new Keyring({type: 'sr25519'});

  if (useTestnetWallets === true) {
    walletAlice = keyring.addFromUri('//Alice');
    walletBob = keyring.addFromUri('//Bob');
    walletCharlie = keyring.addFromUri('//Charlie');
    walletDave = keyring.addFromUri('//Dave');
    walletEve = keyring.addFromUri('//Eve');
    walletFerdie = keyring.addFromUri('//Ferdie');
  }
});

after(async () => {
  api.disconnect();
});

describe('Account Tests', () => {
  runAccountWalletTests();
  // ToDo
  // Governance Tests
  runAccountGovernanceTests();

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

/**
 * Standard wallet tests
**/
function runAccountWalletTests() {
  it('Wallet balance check should result >0', async () => {
    await AccountTests.checkBalance(api, walletAlice.address);
  });

  // Asset tests
  it('Get single asset amount', async () => {
    await AccountTests.getSingleAssetAmount(api, walletAlice.address);
  });

  it('Get list of asset amounts', async () => {
    await AccountTests.getListAssetAmounts(api, walletAlice.address);
  });
}

/**
 * Tests governance functionalities
**/
async function runAccountGovernanceTests() {
  if (testSudoCommands === true) {
    it('Council.setMembers(newMembers, prime, oldCount) test', async () => {
      await AccountTests.governanceSudoCouncilSetMembersTest(api, walletAlice);
    });
  }

  it('Submit proposal test', async () => {
    await AccountTests.governanceCouncilSubmitProposalTest(api, walletAlice);
  });
}
