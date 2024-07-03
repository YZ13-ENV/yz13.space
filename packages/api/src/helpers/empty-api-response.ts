import { APIResponse } from "../db/types";

export const emptyApiResponse = <T extends any>(
  param: T,
  status?: number
): APIResponse<T> => {
  return {
    error: null,
    data: param,
    count: null,
    status: status ? status : 200,
  };
};
