/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/**
 * Inserts default values into the devnet for development.
 **/
import {ApiPromise, Keyring, WsProvider} from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';

// ToDo: Change endpoint to be read from env variables or run parameters.
const endpoint = 'ws://127.0.0.1:9988';
const provider = new WsProvider(endpoint);

let walletAlice: KeyringPair;
let walletBob: KeyringPair;
let walletCharlie: KeyringPair;
let walletDave: KeyringPair;
let walletEve: KeyringPair;
let walletFerdie: KeyringPair;

/**
 * Contains all generation methods as static async functions
**/
class Generator {
  /**
   * Sends test transaction from Alice to Bob.
   * @param {ApiPromise} api Connected API Promise.
  **/
  public static async testTransaction(api:ApiPromise) {
    const transfer = api.tx.assets.transferNative(walletBob.address, 12345678910, true);
    const hash = await transfer.signAndSend(walletAlice, {nonce: -1});
    console.debug('Transfer sent with hash', hash.toHex());
  }

  // ToDo: Add more generation functions here.
}

/**
 * Call default generation here.
 * @param {ApiPromise} api Connected API Promise.
**/
async function createDefaultData(api:ApiPromise) {
  await Generator.testTransaction(api);
  
  // ToDo: Add additional data generator calls here.
}

/**
 * Application entry point
**/
async function main() {
  // Instantiate the API
  const api = await ApiPromise.create({provider: provider});
  // Constuct the keyring after the API (crypto has an async init)
  const keyring = new Keyring({type: 'sr25519'});

  /*  Get keys for dev accounts.
      ToDo: Read public/private keys from external file to be usable in live environment.
            and ability to specify keys using env variables or using run parameters.
  */
  walletAlice = keyring.addFromUri('//Alice');
  walletBob = keyring.addFromUri('//Bob');
  walletCharlie = keyring.addFromUri('//Charlie');
  walletDave = keyring.addFromUri('//Dave');
  walletEve = keyring.addFromUri('//Eve');
  walletFerdie = keyring.addFromUri('//Ferdie');

  console.info('Creating dummy data...');

  await createDefaultData(api);

  console.info('Finished creating dummy data.');
}
main().catch(console.error).finally(() => process.exit());
