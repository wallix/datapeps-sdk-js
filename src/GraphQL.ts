import { Session } from "./Session";
import { SessionState } from "./SessionInternal";
import { Uint8Converter } from "./Tools";

export class GraphQL {
  private api: SessionState;
  constructor(session: Session) {
    this.api = SessionState.create(session);
  }

  getHeaders(body: string) {
    return this.api.client.getAuthHeaders({
      method: "POST",
      body: Uint8Converter.fromString(body),
      path: "/any",
      expectedCode: 666
    });
  }
}
