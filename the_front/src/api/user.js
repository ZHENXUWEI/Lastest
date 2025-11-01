import request from "@/utils/request";
export function loginAPI(id) {
  return request({
    url: `/api/user/getuserinfo/${id}`,
  });
}

// export function getAccessToken(code, state) {
//   return request({
//     url: "/token",
//     params: {
//       code: code,
//       state: state,
//     },
//   });
// }

/**
 * 公司用户登录
 * @param {Object} data - 登录凭证
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise}
 */
export function login(data) {
    return request({
        url: '/oauth', // 后端登录接口路径
        method: 'post',
        data // 传递用户名和密码
    });
}

export function userLogin(username, password) {
    return request({
        url: '/user/login', // 后端需对应实现用户端登录接口
        method: 'post',
        data: { username, password }
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

// export function getusrinfo(token, openId) {
//   return request({
//     url: "/usrInfo",
//     params: {
//       access_token: token,
//       openId: openId,
//     },
//   });
// }


export function SSOLogin(code, state) {
    return request({
        url: "/token",
        params: { code: code, state: state }
    });
}
// 修改后
// export function SSOLogin(code, state) {
//     return request({
//         url: "/oauth", // 新路径（后端实际接口路径）
//         method: "post", // 后端接口使用 @RequestBody，需指定 post 方法
//         data: { // 后端接收请求体参数，替换 params 为 data
//             code: code,
//             state: state,
//             // 若后端需要 accessToken，补充该字段
//             // accessToken: yourAccessToken
//         },
//     });
// }

export function jump() {
  return request({
    url: "/oauth-login",
  });
}

export function getInfo() {
  return request({
    url: "/getInfo",
  });
}
