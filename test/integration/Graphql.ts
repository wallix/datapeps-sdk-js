import { gql } from "apollo-boost";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { print } from "graphql/language/printer";
import { expect } from "chai";
import { admin } from "../Context";
import { GraphQL } from "../../src/GraphQL";
/*
describe("graphql.main", () => {
  it("list of tenants should not be empty", async () => {
    let { adminSession } = await admin();
    const authLink = setContext(async (req, deq) => {
      const query = print(req.query);
      const body = {
        operationName: req.operationName,
        variables: req.variables,
        query
      };
      let headers = {
        accept: "application/json"
      };
      let h = await new GraphQL(adminSession).getHeaders(JSON.stringify(body));
      h.forEach((v, k) => {
        headers[k] = v;
      });
      return {
        headers
      };
    });

    const httpLink = createHttpLink({
      uri: `https://${process.env.DATAPEPS_API_HOST}/query`
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });

    let {
      data: { tenants }
    } = await client.query({
      query: gql`
        {
          tenants {
            name
          }
        }
      `
    });
    expect(tenants).to.not.be.empty;
  });
});
*/
