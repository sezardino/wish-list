import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { GraphQLClient, Variables } from "graphql-request";
export abstract class AbstractApiModule {
  protected restUrl: string;
  protected gqlUrl: string;

  constructor() {
    this.restUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api`;
    this.gqlUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/graphql`;
  }

  protected async restFetcher<Response>(
    endpoint: string,
    config?: AxiosRequestConfig
  ) {
    return axios<Response>(`${this.restUrl}/${endpoint}`, config);
  }

  async fetch<Response, Error = object>(
    endpoint: string,
    config: Omit<AxiosRequestConfig, "url"> = {}
  ) {
    return axios<AxiosError<Error>, AxiosResponse<Response>>(
      `${this.restUrl}/${endpoint}`,
      { ...config }
    ).then((res) => res.data);
  }

  protected async gqlFetcher<R, V extends Variables>(
    schema: string,
    variables?: V
  ) {
    const client = new GraphQLClient(this.gqlUrl);

    return await client.request<R, Variables>(schema, variables);
  }
}
