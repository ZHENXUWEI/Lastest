<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router'; // 导入路由工具
import { login as loginApi } from '@/api/user'; // 导入登录API
import { userLogin } from '@/api/user';

const credentials = reactive({
  username: '',
  password: ''
});
const router = useRouter();


// const login = async () => {
//   try {
//     const res = await userLogin(credentials.username, credentials.password);
//     // 登录成功后存储 token 并跳转首页
//     localStorage.setItem('token', res.token);
//     window.location.href = '/'; // 跳转到用户端首页
//   } catch (error) {
//     console.error('登录失败:', error);
//     // 显示错误提示
//   }
// };
const login = async () => {
  try {
    // 表单验证
    if (!credentials.username || !credentials.password) {
      alert('请输入用户名和密码');
      return;
    }

    // 调用登录接口
    const response = await loginApi(credentials);

    // 假设后端返回格式：{ code: 200, data: { token: 'xxx' }, message: '登录成功' }
    if (response.code === 200) {
      // 存储token（实际项目建议用pinia/vuex管理）
      localStorage.setItem('token', response.data.token);
      // 跳转到公司首页（根据实际路由调整）
      router.push('/');
    } else {
      alert(response.message || '登录失败，请重试');
    }
  } catch (error) {
    console.error('登录请求失败:', error);
    alert('网络错误，请稍后再试');
  }
};
</script>

<template>
  <div class="login-container">
    <h1>公司登录</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">用户名:</label>
        <el-input
            id="username"
            v-model="credentials.username"
            style="width: 250px"
            placeholder="请输入公司用户名"
        />
      </div>
      <div>
        <label for="password">密 码:</label>
        <el-input
            id="password"
            v-model="credentials.password"
            style="width: 250px"
            placeholder="请输入密码"
            type="password"/>  <!-- 密码框应隐藏输入内容 -->

      </div>
      <el-button type="primary" @click="login">登录</el-button>
    </form>
  </div>
</template>

<style scoped>
/* 保持原样式不变 */
.login-container {
  width: 300px;
  margin: 100px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-container h1{
  color:#007bff;
  text-align: center;
}
form div {
  margin: 10px 0;
}
label {
  display: block;
  margin-bottom: 5px;
}
input[type="text"], input[type="password"] {
  width: 100%;
  padding: 8px;
  margin-top: 2px;
}
button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
