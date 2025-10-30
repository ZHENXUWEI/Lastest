import request from "@/utils/request";
export function loginAPI(id) {
  return request({
    url: `/api/user/getuserinfo/${id}`,
  });
}

export function getAccessToken(id) {
  return request({
    url: '/token',
    params:{
      
    }
  });
}
