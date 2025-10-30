
import request from '@/utils/request'
export function loginAPI(id) {
  return request({
    url: `/api/user/getuserinfo/${id}`,
  })
}

export function sso(){
  return request({
    url:`https://idm.hzsteel.com/ssoserver/moc2/authorize`,
    method:
  })
}

