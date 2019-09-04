/*
import { wallix } from "./proto";
import { Session } from "./Session";
import { SessionState } from "./SessionInternal";

export namespace Tenant {
  export type Customer = {
    id: number;
    name: string;
  };
}

export class Tenant {
  private api: SessionState;
  constructor(session: Session) {
    this.api = SessionState.create(session);
  }
  async getCustomers(): Promise<
    wallix.gopeps.protobuf.datapeps.TenantGetCustomersResponse
  > {
    return await this.api.client.doProtoRequest<
      wallix.gopeps.protobuf.datapeps.TenantGetCustomersResponse
    >({
      method: "GET",
      expectedCode: 200,
      path: `/api/v1/tenant/customers`,
      response: r => {
        return wallix.gopeps.protobuf.datapeps.TenantGetCustomersResponse.decode(
          r
        );
      }
    });
  }
}
*/
