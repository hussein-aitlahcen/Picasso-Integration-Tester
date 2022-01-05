import {expect} from 'chai';


/* Index:

WALLET_ALICE_ADDR:string
WALLET_FERDIE_ADDR:string

AccountTests:class
    checkBalance(api)
    listAssetAmounts(api)
 */

const WALLET_ALICE_ADDR = '5yNZjX24n2eg7W6EVamaTXNQbWCwchhThEaSWB7V3GRjtHeL';
const WALLET_FERDIE_ADDR = '5uE1CpSM5GKgr9LSupWxNgfjP5Ynk8Ay7DnxAEHkzkbize92';

export class AccountTests {
  public static async checkBalance(api) {
    const {nonce, data: balance} = await api.query.system.account(WALLET_ALICE_ADDR);
    expect(parseInt(balance.free)).to.be.greaterThan(0);
  }

  public static async listAssetAmounts(api) {
    // ToDo: Change call to get all tokens, and add check.
    const data = await api.query.tokens.accounts(WALLET_FERDIE_ADDR, 0);
    console.log(data);
  }
}
