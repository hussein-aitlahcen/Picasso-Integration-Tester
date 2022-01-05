/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/**
 * Contains all tests which are bound to a wallet.
 **/

import {ApiPromise, Keyring} from '@polkadot/api';
import {expect} from 'chai';


/**
 * AccountTests:class
 *    checkBalance(api)
 *    listAssetAmounts(api)
**/
export class AccountTests {
  /**
   * Tests by checking the balance of the supplied account is >0
   * @param {ApiPromise} api Connected API Promise.
   * @param {string} walletAddress generated key through Keyring class
   */
  public static async checkBalance(api, walletAddress:string) {
    const {nonce, data: balance} = await api.query.system.account(walletAddress);
    expect(parseInt(balance.free)).to.be.a('number');
    expect(parseInt(nonce)).to.be.a('number');
    expect(parseInt(balance.free)).to.be.greaterThan(0);
  }

  // Asset Tests
  /**
   * Tests by checking the balance of the supplied account is >0
   * @param {ApiPromise} api Connected API Promise.
   * @param {string} walletAddress generated key through Keyring class
   */
  public static async getSingleAssetAmount(api, walletAddress:string) {
    // ToDo: Change call to get all tokens, and add check.
    const {free, reserved, frozen} = await api.query.tokens.accounts(walletAddress, 0);
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
   * @param {string} walletAddress generated key through Keyring class
   */
  public static async getListAssetAmounts(api, walletAddress:string) {
    // ToDo: Change call to get all tokens, and add check.
    // const data = await api.query.tokens.accounts(WALLET_FERDIE_ADDR, 0);
  }

  // Governance Tests
  /**
     * First checks if walletKey is in council.members()
     * Then submits a new proposal to council.propose()
     * @param {ApiPromise} api Connected API Promise.
     * @param {Object} walletKey generated key through Keyring class
    **/
  public static async governanceSudoCouncilSetMembersTest(api, walletKey) {
    // ToDo: STUB
  }

  /**
   * First checks if walletKey is in council.members()
   * Then submits a new proposal to council.propose()
   * @param {ApiPromise} api Connected API Promise.
   * @param {Object} walletKey generated key through Keyring class
  **/
  public static async governanceCouncilSubmitProposalTest(api, walletKey) {
    const councilMembers = await api.query.council.members();
    const keyring = new Keyring();
    for (const councilMember of councilMembers) {
      if (keyring.encodeAddress(councilMember) == walletKey.address) {
        // ToDo: Implement propsal submission
        break;
      }
    }
  }
}
