import request from "@/utils/request";
// 获取list
export function fetchList(type) {
  return request({
    url: "/lostAndFound/list",
    method: "get",
    params: type
  });
}
// 通过申请
export function ok(params) {
  return request({
    url: "/lostAndFound/approve",
    method: "post",
    data: params
  });
}
