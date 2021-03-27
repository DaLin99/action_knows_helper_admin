import request from "@/utils/request";

export function fetchList() {
  return request({
    url: "/schoolActivity/list",
    method: "get"
  });
}
export function publishActivity(data) {
  return request({
    url: "schoolActivity/publish",
    method: "post",
    data
  });
}
export function delActivity(data) {
  return request({
    url: "schoolActivity/delete",
    method: "post",
    data
  });
}
