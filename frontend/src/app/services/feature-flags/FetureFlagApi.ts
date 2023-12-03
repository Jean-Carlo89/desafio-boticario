import { FeatureFlag } from "@/app/dashboard/flags/flag";
import { current_api } from "../api/helper";
import axios, { AxiosHeaders } from "axios";

const feature_flag_api = `${current_api}/feature-flags`;

export async function getFeatureFlags(props?: listFeatureFlagsRequestParams): Promise<FeatureFlag[]> {
  return await (await fetch(`${feature_flag_api}`, { headers: props?.headers })).json();
}

export async function getFeatureFlag(props: getFeatureFlagRequestParams): Promise<FeatureFlag> {
  return await (await fetch(`${feature_flag_api}/${props.id}`, { headers: props.headers })).json();
}

export async function updateFeatureFlag(props: updateFeatureFlagRequestParams): Promise<FeatureFlag> {
  console.log("herefff");

  const f = props.body;

  console.log(f);

  console.log(props.body);

  console.log(props.body.is_active);

  const body = { ...props.body };

  console.log(body);
  return await (
    await fetch(`${feature_flag_api}/${props.id}`, {
      method: "PATCH",
      headers: props.headers,

      body: JSON.stringify({ ...body }),
    })
  ).json();
  // return await axios.patch(`${feature_flag_api}/${props.id}`, props.body, props.headers as any);
}

export type listFeatureFlagsRequestParams = {
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

export type updateFeatureFlagRequestParams = {
  id: string;
  body: Partial<FeatureFlag>;
  headers?: Partial<AxiosHeaders>;
};
// export class FeatureFlagsApi {
//   getFeatureFlags(props: listFeatureFlagsRequestParams) {
//     return api.get("/feature-flags", { headers: props.headers, params: props.params });
//   }

//   getFeatureFlag() {
//     return api.get("/feature-flags");
//   }
// }

// export type listFeatureFlagsRequestParams = {
//   params: {
//     per_page?: number;
//     index?: number;
//   };

//   headers: {
//     Authorization: string;
//   };
// };
