import { services, wallix as wallixProto } from "../proto";
import { Session } from "../Session";
import { SessionState } from "../SessionInternal";
import { Error, SDKKind } from "../Error";

import billing = services.interfaces.billing;
import { client } from "../HTTP";

export class BillingAPI {
  private api: SessionState;
  constructor(session: Session) {
    this.api = SessionState.create(session);
  }

  async getSimpleBill(
    tenantName: string,
    period: {
      from: number | Long;
      to: number | Long;
    }
  ): Promise<billing.ITenantSimpleBill> {
    let response = await client.doRequest({
      expectedCode: 200,
      method: "POST",
      path: "/api/v1/billing/bill",
      body: billing.GetTenantBillRequest.encode({
        tenant: new billing.Tenant({
          name: tenantName
        }),
        period: new wallixProto.gopeps.protobuf.common.Duration({
          start: period.from,
          end: period.to
        }),
        type: billing.GetTenantBillRequest.BillType.SIMPLE
      }).finish(),
      response: billing.GetTenantBillResponse.decode,
      headers: new Headers({
        "content-type": "application/x-protobuf"
      })
    });
    if (response.body.bill != "simpleBill") {
      throw new Error({
        kind: SDKKind.BadResponse,
        message: `a bill of the kind "${
          response.body.bill
        }", a bill of the kind "simpleBill" was expected`
      });
    }
    let bill = response.body.simpleBill;
    return bill;
  }
}
