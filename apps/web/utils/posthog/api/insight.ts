import { POSTHOG_PERSONAL_KEY } from "../const";

const host = "https://app.posthog.com";

export type APIResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
const empty_response = (): APIResponse<any> => ({
  count: 0,
  next: null,
  previous: null,
  results: [],
});
const getList = async (project_id: string): Promise<APIResponse<any>> => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${POSTHOG_PERSONAL_KEY}`);
    const result = await fetch(`${host}/api/projects/${project_id}/insights`, {
      headers: headers,
    });
    return result.json();
  } catch (e) {
    console.log(e);
    return empty_response();
  }
};
const getInsights = async (
  project_id: string,
  insight_id: string
): Promise<any> => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${POSTHOG_PERSONAL_KEY}`);
    const result = await fetch(
      `${host}/api/projects/${project_id}/insights/${insight_id}`,
      {
        headers: headers,
      }
    );
    return result.json();
  } catch (e) {
    console.log(e);
    return null;
  }
};
const getProjects = async (): Promise<APIResponse<any>> => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${POSTHOG_PERSONAL_KEY}`);
    const result = await fetch(`${host}/api/projects`, {
      headers: headers,
    });
    return result.json();
  } catch (e) {
    console.log(e);
    return empty_response();
  }
};
export { getInsights, getList, getProjects };
