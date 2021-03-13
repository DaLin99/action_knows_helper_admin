import request from "@/utils/request";

export function fetchList(type) {
  return request({
    url: "/action_knows_helper/lostAndFound/list",
    method: "get",
    params: type
  });
}
