import request from "@/utils/request";
export function loginAPI(id) {
  return request({
    url: `/api/user/getuserinfo/${id}`,
  });
}

export function sso(data) {
  return request({
    url: `https://idm.hzsteel.com/api/ssoserver/moc2/authorize`,
    method: "post",
    data: data,
  });
}
