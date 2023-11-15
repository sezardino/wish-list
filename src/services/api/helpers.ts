import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { GraphQLClient, Variables } from "graphql-request";
import { z, Schema } from "zod";
import { BackendErrorResponse } from "../server";

type FetchProps<T extends z.Schema> = {
  endpoint: string;
  config?: AxiosRequestConfig;
  schema: T;
};

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

  protected async fetch<T extends z.Schema>(
    props: FetchProps<T>
  ): Promise<z.infer<T>> {
    const { endpoint, config, schema } = props;

    return axios<
      AxiosError<BackendErrorResponse>,
      AxiosResponse<z.infer<Schema>>
    >(`${this.restUrl}/${endpoint}`, { ...config }).then((res) =>
      schema.parse(res.data)
    );
  }

  protected async gqlFetcher<R, V extends Variables>(
    schema: string,
    variables?: V
  ) {
    const client = new GraphQLClient(this.gqlUrl);

    return await client.request<R, Variables>(schema, variables);
  }
}
