/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/**
 * Contains all tests which are bound to a wallet.
 **/

import {ApiPromise} from '@polkadot/api';
import {expect} from 'chai';


// ToDo: Read public/private keys from external file to be usable in live environment.
//       and ability to specify keys using env variables or using run parameters.
const WALLET_ALICE_ADDR = '5yNZjX24n2eg7W6EVamaTXNQbWCwchhThEaSWB7V3GRjtHeL';
const WALLET_ALICE_STASH_ADDR = '5xsveQBo4sHTHAJjh6AW2hiw4BFsHnwSxcpHkZGM3KnJw82d';
const WALLET_BOB_ADDR = '5woQTSqveJemxVbj4eodiBTSVfC4AAJ8CQS7SoyoyHWW7MA6';
const WALLET_BOB_STASH_ADDR = '5zKsxsv3sNmAccgqxiz7UPKR4Keh88auXXiscoDWMpeHQmeA';
const WALLET_CHARLIE_ADDR = '5wr4XcyxyJYQb71PbSPxhqujKnsS9UAydBhSypGvFgh2QXBa';
const WALLET_DAVE_ADDR = '5ufnboWwBKb5tBrQquow1DqATxWvUXmu4DrQqG9f9kCoRiC5';
const WALLET_EVE_ADDR = '5ynMK7S4uhNHbohyb8nf8LDrTP2bGeAYFGgXYM7Jy5JASqj3';
const WALLET_FERDIE_ADDR = '5uE1CpSM5GKgr9LSupWxNgfjP5Ynk8Ay7DnxAEHkzkbize92';

/**
 * AccountTests:class
 *    checkBalance(api)
 *    listAssetAmounts(api)
**/
export class AccountTests {
  /**
   * Tests by checking the balance of the supplied account is >0
   * @param {ApiPromise} api Connected API Promise.
   */
  public static async checkBalance(api) {
    const {nonce, data: balance} = await api.query.system.account(WALLET_ALICE_ADDR);
    expect(parseInt(balance.free)).to.be.a('number');
    expect(parseInt(nonce)).to.be.a('number');
    expect(parseInt(balance.free)).to.be.greaterThan(0);
  }

  /**
   * Tests by checking the balance of the supplied account is >0
   * @param {ApiPromise} api Connected API Promise.
   */
  public static async getSingleAssetAmount(api:ApiPromise) {
    // ToDo: Change call to get all tokens, and add check.
    // @ts-ignore
    const {free, reserved, frozen} = await api.query.tokens.accounts(WALLET_FERDIE_ADDR, 0);
    if (!free && !reserved && !frozen) {
      throw new Error('getSingleAsssetAmount: Received variable wasn\'t set!');
    }
    expect(parseInt(free)).to.be.a('number');
    expect(parseInt(reserved)).to.be.a('number');
    expect(parseInt(frozen)).to.be.a('number');
  }
  
  /**
   * Tests by checking the balance of the supplied account is >0
   * @param {ApiPromise} api Connected API Promise.
   */
  public static async getListAssetAmounts(api:ApiPromise) {
    // ToDo: Change call to get all tokens, and add check.
    // const data = await api.query.tokens.accounts(WALLET_FERDIE_ADDR, 0);
  }
}
