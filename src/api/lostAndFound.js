import request from "@/utils/request";
// 获取list
export function fetchList() {
  return request({
    url: "/lostAndFound/adminList",
    method: "get"
  });
}
// 通过申请
export function approve(params) {
  return request({
    url: "/lostAndFound/approve",
    method: "post",
    data: params
  });
}
// 不通过申请
export function reject(params) {
  return request({
    url: "/lostAndFound/reject",
    method: "post",
    data: params
  });
}
// 删除
export function deleteLostAndFound(data) {
  return request({
    url: "lostAndFound/delete",
    method: "post",
    data
  });
}
// 发布
export function publishLostAndFound(data) {
  return request({
    url: "lostAndFound/adminEdit",
    method: "post",
    data
  });
}

// 发布
export function chartsData(data) {
  return request({
    url: "lostAndFound/chartsData",
    method: "get",
    data
  });
}
