<script setup>
import {reactive, ref, onMounted} from 'vue';
import request from '@/utils/request'; // 引入请求工具
import { ElMessage } from 'element-plus'; // 引入Element的消息提示组件
   
const credentials = reactive({
  username: '',
  password: '',
  code: '',       // 验证码输入值
  uuid: ''        // 验证码唯一标识（后端生成）
});

// 验证码图片URL
const captchaImg = ref('');

// 页面加载时获取验证码
onMounted(() => {
  refreshCaptcha();
});

// 刷新验证码
const refreshCaptcha = async () => {
  try {
    // 调用后端获取验证码接口（假设接口为/getCaptcha）
    const response = await request({
      url: '/captchaImage',  // 后端Ruoyi框架默认的验证码接口
      method: 'GET'
    });
    if (response.code === 200) {
      // 存储验证码唯一标识（用于后端校验）
      credentials.uuid = response.uuid;
      // 生成验证码图片URL（后端返回base64格式）
      captchaImg.value = 'data:image/png;base64,' + response.img;
    } else {
      ElMessage.error('获取验证码失败');
    }
  } catch (error) {
    console.error('验证码获取失败:', error);
    ElMessage.error('验证码加载失败，请重试');
  }
};

// 登录方法（修改为携带验证码参数）
const login = async () => {
  try {
    const response = await request({
      url: '/login',
      method: 'POST',
      data: credentials  // 此时包含username、password、code、uuid
    });

    if (response.code === 200) {
      localStorage.setItem('token', response.token);
      ElMessage.success('登录成功');
      window.location.href = '/home';
    } else {
      // 登录失败时刷新验证码（避免重复使用失效的验证码）
      refreshCaptcha();
      ElMessage.error(response.msg || '登录失败');
    }
  } catch (error) {
    refreshCaptcha();
    ElMessage.error('登录请求失败，请检查网络或联系管理员');
    console.error('Login error:', error);
  }
};

  </script>

<template>
  <div class="login-container">
    <h1>登录</h1>
    <form @submit.prevent="login">
      <!-- 用户名和密码输入框保持不变 -->
      <div>
        <label for="username">用户名:</label>
        <el-input id="username" v-model="credentials.username" style="width: 250px" placeholder="Please input" />
      </div>
      <div>
        <label for="password">密 码:</label>
        <el-input id="password" v-model="credentials.password" style="width: 250px" type="password" placeholder="Please input" />
      </div>

      <!-- 新增验证码区域 -->
      <div style="display: flex; gap: 10px; align-items: center;">
        <div style="flex: 1;">
          <label for="code">验证码:</label>
          <el-input id="code" v-model="credentials.code" style="width: 100%" placeholder="请输入验证码" />
        </div>
        <!-- 验证码图片 -->
        <div>
          <img
              :src="captchaImg"
              alt="验证码"
              style="width: 100px; height: 40px; cursor: pointer;"
              @click="refreshCaptcha"
          >
        </div>
      </div>

      <el-button type="primary" @click="login">登录</el-button>
    </form>
  </div>
</template>
   
  
   
  <style scoped>
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