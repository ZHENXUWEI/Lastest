
import request from '@/utils/request'
export function loginAPI(id) {
  return request({
    url: `/api/user/getuserinfo/${id}`,
  })
}

export function sso(){
  return request({
    url:`http://服务地址/ssoserver/moc2/authorize`
  })
}

