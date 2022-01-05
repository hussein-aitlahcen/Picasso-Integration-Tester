import { ApiPromise, WsProvider } from '@polkadot/api';
import { AccountTests } from './accountTests';


/*
Index:
    endpoint:string
    provider:WsProvider
    api:ApiPromise

    before()        Gets called before the tests and connects the API object.
    after()         Gets called after all tests are finished and disconnects from the API.

    describe()      Runs the tests using Mocha
        1. it()     checkBalance() => Get balance and checks if > 0.
        2. it()     listAssetAmounts() => Gets all assets on account and lists them.
        3. it()
        4. it()
 */

// Initialise the provider to connect to the defined node
let endpoint = 'ws://127.0.0.1:9988';
const provider = new WsProvider(endpoint);
let api;


before(async () => {
    api = await ApiPromise.create({ provider: provider });
});

after(async () => {
    api.disconnect();
});

describe("Account Tests", () => {

    // Account balance check.
    it("Balance check should result >0", async () => {
        await AccountTests.checkBalance(api);
    });

    it("List asset amounts", async() => {
        await AccountTests.listAssetAmounts(api);
    });

    it("Vesting creation test", async() => {
        // ToDo: Stub
    });

    it("Vesting add tokens test", async() => {
        // ToDo: Stub
    });
});
