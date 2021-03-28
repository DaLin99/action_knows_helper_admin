import request from "@/utils/request";

export function fetchList(type) {
  return request({
    url: "/schoolForum/list",
    method: "get",
    params: type
  });
}

export function delForum(data) {
  return request({
    url: "/schoolForum/delete",
    method: "post",
    data
  });
}
