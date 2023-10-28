import { GraphQLClient, Variables } from "graphql-request";

export abstract class AbstractApiModule {
  protected restUrl: string;
  protected gqlUrl: string;

  constructor() {
    this.restUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api`;
    this.gqlUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/graphql`;
  }

  protected async restFetcher<Response>(endpoint: string, init?: RequestInit) {
    try {
      const res = await fetch(`${this.restUrl}/${endpoint}`, init);

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return (await res.json()) as Response;
    } catch (error) {
      return error;
    }
  }

  protected async gqlFetcher<R, V extends Variables>(
    schema: string,
    variables?: V
  ) {
    const client = new GraphQLClient(this.gqlUrl);

    return await client.request<R, Variables>(schema, variables);
  }
}
