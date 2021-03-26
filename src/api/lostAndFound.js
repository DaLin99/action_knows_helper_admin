import request from "@/utils/request";

export function fetchList(type) {
  return request({
    url: "/lostAndFound/list",
    method: "get",
    params: type
  });
}
