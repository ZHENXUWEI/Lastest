import request from "@/utils/request";
export function loginAPI(id) {
  return request({
    url: `/api/user/getuserinfo/${id}`,
  });
}

export function getAccessToken(code, state) {
  return request({
    url: "/token",
    params: {
      code: code,
      state: state,
    },
  });
}

export function getOpenId(token) {
  return request({
    url: "/openId",
    params: {
      access_token: token,
    },
  });
}

export function getusrinfo(token) {
  return request({
    url: "/usrInfo",
    params: {
      access_token: token,
    },
  });
}
