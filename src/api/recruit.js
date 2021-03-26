import request from "@/utils/request";
// 获取招聘信息列表
export function fetchList(type) {
  return request({
    url: "/recruitInfo/list",
    method: "get"
  });
}
// 发布
export function publishRecruit(params) {
  return request({
    url: "/recruitInfo/publish",
    method: "post",
    data: params
  });
}
// 删除
export function deleteRecruit(params) {
  return request({
    url: "recruitInfo/delete",
    method: "post",
    data: params
  });
}
// 编辑
export function editRecruit(params) {
  return request({
    url: "recruitInfo/edit",
    method: "post",
    data: params
  });
}
