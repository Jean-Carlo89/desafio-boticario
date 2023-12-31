import { FeatureFlag } from "@/app/dashboard/flags/flag";
import { current_api } from "../api/helper";
import axios, { AxiosHeaders } from "axios";
import { cookies } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const feature_flag_api = `${current_api}/feature-flags`;

export async function getFeatureFlags(props?: listFeatureFlagsRequestParams): Promise<ProxyRequestResponse> {
  let url = `${feature_flag_api}`;

  if (props?.query) {
    url += props.query;
  }

  const response = await fetch(url, { headers: getAuthHeader(), cache: "no-cache" });

  const resp = await generate_proxy_response(response);

  return resp;
}

export async function getFeatureFlag(props: getFeatureFlagRequestParams): Promise<ProxyRequestResponse> {
  // return await (await fetch(`${feature_flag_api}/${props.id}`, { headers: getAuthHeader() })).json();

  const response = await fetch(`${feature_flag_api}/${props.id}`, { headers: getAuthHeader() });

  const resp = await generate_proxy_response(response);

  return resp;
}

export async function deleteFeatureFlag(props: getFeatureFlagRequestParams): Promise<ProxyRequestResponse> {
  // return await (await fetch(`${feature_flag_api}/${props.id}`, { method: "DELETE", headers: getAuthHeader() })).json();

  const response = await fetch(`${feature_flag_api}/${props.id}`, { method: "DELETE", headers: getAuthHeader(), cache: "no-cache" });

  const resp = await generate_proxy_response(response);

  return resp;
}

export async function updateFeatureFlag(props: updateFeatureFlagRequestParams): Promise<ProxyRequestResponse> {
  const body_to_update = props;

  const response = await fetch(`${feature_flag_api}/${props.id}`, {
    method: "PATCH",
    headers: getAuthHeader(),

    body: JSON.stringify({ ...body_to_update }),
  });

  const resp = await generate_proxy_response(response);

  return resp;
}

export function getCookiesInstance() {
  return cookies();
}

export function getToken() {
  return getCookiesInstance().get("token")?.value;
}

export function getAuthHeader() {
  const token = getToken();

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return headers;
}

export async function postFeatureFlag({ body }: createFeatureFlagRequestParams): Promise<ProxyRequestResponse> {
  const token = getToken();

  const post_body = { ...body };

  const response = await fetch(`${feature_flag_api}`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify({ ...post_body }),
  });

  const resp = await generate_proxy_response(response);

  return resp;
}

export type ProxyRequestResponse = {
  status: number;
  json: any;
};

async function generate_proxy_response(res: Response) {
  let { status, json } = res;
  let json_parse_error = false;

  try {
    json = await res.json();
  } catch (error) {
    console.log("Houve um erro ao lidar com o json da api externa");

    json_parse_error;
  }

  return { status, json };
}
export type listFeatureFlagsRequestParams = {
  query?: string;
  params?: {
    per_page?: number;
    index?: number;
  };

  headers?: {
    Authorization: string;
  };
};

export type getFeatureFlagRequestParams = {
  id: string;
  headers?: {
    Authorization: string;
  };
};
export type createFeatureFlagRequestParams = {
  body: Partial<FeatureFlag>;
  //headers?: Partial<AxiosHeaders>;
};
export type updateFeatureFlagRequestParams = {
  id: string;
  body: Partial<FeatureFlag>;
  headers?: Partial<AxiosHeaders>;
};
