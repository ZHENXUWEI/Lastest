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
