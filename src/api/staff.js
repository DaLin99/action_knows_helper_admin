import request from "@/utils/request";

export function fetchList(type) {
  return request({
    url: "/action_knows_helper/staff/list",
    method: "get"
  });
}
