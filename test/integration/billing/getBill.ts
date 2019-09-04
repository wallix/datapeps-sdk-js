import { BillingAPI } from "../../../src/Billing";
import {
  initCtx,
  init,
  identityAndSession,
  identityAndSessionCtx
} from "../../Context";
import { expect } from "chai";

describe("billing", () => {
  let initCtx: initCtx;

  before(async () => {
    initCtx = init();
  });

  describe("getBill", () => {
    let ctx: {
      alice: identityAndSessionCtx;
    };

    before(async () => {
      ctx = {
        alice: await identityAndSession(initCtx)
      };
    });

    it("getting a bill", async () => {
      let response = await new BillingAPI().getSimpleBill("Uncle Thierry", {
        from: 123,
        to: 456
      });
      console.log("Tenant: ", response.tenant.name);
      for (let i = 0; i < response.customers.length; i++) {
        console.log("Customer", response.customers[i].customer);
        for (let j = 0; j < response.customers[i].bills.length; j++) {
          console.log("\t Pack: ", response.customers[i].bills[j].pack.id);
          console.log("\t Stats: ", response.customers[i].bills[j].stats);
        }
      }
      expect(true).true;
    });
  });
});
