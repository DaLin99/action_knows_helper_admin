import request from "@/utils/request";
// 获取用户列表
export function fetchList(type) {
  return request({
    url: "user/userList",
    method: "get"
  });
}
// 删除用户
export function deleteUser(data) {
  return request({
    url: "user/delete",
    method: "post",
    data
  });
}
// 修改用户
export function editUser(data) {
  return request({
    url: "user/edit",
    method: "post",
    data
  });
}

// 新增用户
export function importUser(data) {
  return request({
    url: "user/importUser",
    method: "post",
    data
  });
}
