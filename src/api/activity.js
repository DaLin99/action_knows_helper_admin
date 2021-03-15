import request from "@/utils/request";

export function fetchList(type) {
  return request({
    url: "/action_knows_helper/activity/list",
    method: "get",
    params: type
  });
}
