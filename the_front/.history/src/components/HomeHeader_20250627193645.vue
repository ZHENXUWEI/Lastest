<script setup>
import { ref, onMounted, defineEmits, defineProps } from "vue";
import { loginAPI, getAccessToken, getOpenId, usrInfo } from "@/api/user";
import { policyVisitNAPI } from "@/api/policy";
import { getCookie, setCookie, removeCookie } from "@/utils/cookie";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";

const props = defineProps({
  parentData: String,
});
const router = useRouter();
const route = useRoute();
const users = ref({});
// users.value.companyName="浙江省产业大数据有限公司"
const isOpen = ref(false);
const fetchUsers = async () => {
  //   window.location.href = `http://172.18.30.42/ssoserver/moc2/authorize?
  //   response_type=code&
  //   client_id=zcfw&
  //   redirect_uri=http://172.19.14.40:5317&
  //   state=ok`;
  const redirectUri = encodeURIComponent("http://172.19.14.40:5317");
  const fullUrl = `http://172.18.30.42/ssoserver/moc2/authorize?response_type=code&client_id=zcfw&redirect_uri=${redirectUri}&state=ok`;
  console.log(fullUrl);
  window.location.href = fullUrl;
  //   const res = await loginAPI(1);
  //   users.value = res.data[0];
  //   setCookie({
  //     id: 2,
  //     companyName: users.value.companyName,
  //     token: 123456,
  //   });
  //   await policyVisitNAPI();
  //   router.push({ path: `/policyModel` });
};

const loginOut = () => {
  removeCookie();
  users.value = "";
  router.push({ name: "Home" });
};
onMounted(async () => {
  const query = route.query;
  if (Object.keys(query).length > 1) {
    const res = await getAccessToken(query.code, query.state);
    console.log("token----------" + res);
    if (res.data) {
      const auth = await getOpenId(res.data.access_token);
      console.log("auth--------"+auth);
      if(auth.data)
    }
  } else {
    console.log("URL 上没有任何参数");
  }
  const info = getCookie();

  console.log(111111111111);
  console.log(info);

  if (info) {
    users.value = info;
  }
});
const activeIndex = ref(0);

if (route.path == "/") {
  activeIndex.value = 0;
} else if (route.path == "/policy" || route.path == "/detail") {
  activeIndex.value = 1;
} else if (route.path == "/match") {
  activeIndex.value = 2;
} else {
  activeIndex.value = null;
}

const BusinessSystem = () => {
  let id = users.value.id;
  router.push({ path: `/service` });
};
</script>

<template>
  {{ parentData }}
  <div id="header">
    <div class="nav">
      <img src="../assets/images/logo.png" alt="" />
      <span class="suxian"></span>
      <span style="font-size: 1.8vw; font-weight: bold">政策服务平台</span>

      <div class="nav_span">
        <span
          :class="{ active: activeIndex === 0 }"
          style="cursor: pointer; margin-left: 5vw"
          ><RouterLink class="rl" to="/">首页</RouterLink>
        </span>
        <span :class="{ active: activeIndex === 1 }" style="cursor: pointer"
          ><RouterLink class="rl" to="/policy">政策查询</RouterLink></span
        >
        <span :class="{ active: activeIndex === 2 }" style="cursor: pointer"
          ><RouterLink class="rl" to="/match">政策匹配</RouterLink></span
        >
      </div>
    </div>

    <div class="user">
      <div class="out_com_box" v-if="users.companyName">
        <div
          class="com_box"
          @mouseenter="isOpen = true"
          @mouseleave="isOpen = false"
        >
          <!-- <span class="qiyelogo">企业</span> -->
          <span class="companyName" @click="BusinessSystem">{{
            users.companyName
          }}</span>
          <!-- <div class="dropdown_box" v-if="isOpen">
                    <div  class="dropdown">
                        <ul>
                            <li @click="BusinessSystem">业务系统</li>
                            <li>管理系统</li>
                            <li >退出登录</li>
                        </ul>
                    </div>
                </div> -->
        </div>
        <span class="suxian"></span>
        <span
          class="loginout"
          @click="loginOut"
          style="margin-right: 2vw; cursor: pointer"
          >退出登录</span
        >
      </div>

      <el-button style="margin-right: 2vw" @click="fetchUsers" v-else
        >登录</el-button
      >
    </div>
  </div>
</template>

<style scoped>
#header {
  width: 100%;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
}
#header .nav {
  display: flex;
  align-items: center;
}
#header .nav img {
  width: 17vw;
  height: 3.5vw;
  margin-left: 2vw;
}
.suxian {
  display: block;
  width: 0.1vw !important;
  height: 1.5vw;
  border: 1px solid #ccc;
  margin: 0 0.8vw;
}

#header .nav_span {
  display: flex;
  align-items: center;
}
#header .nav_span span {
  display: flex;
  display: block;
  align-items: center;
  font-size: 1vw;
  margin-left: 2vw;
  padding: 1.2vw 0;
}

.active {
  border-bottom: 2px solid blue;
}

#header .user {
  display: flex;
  align-items: center;
}
.out_com_box {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1vw;
}
.com_box {
  display: flex;
  align-items: center;
  cursor: pointer;
}

#header .user .qiyelogo {
  display: block;
  font-size: 1vw;
  width: 3vw;
  height: 3vw;
  color: white;
  background: linear-gradient(to right, #448af9, #579dff);
  text-align: center;
  line-height: 3vw;
  border-radius: 50%;
  margin-right: 1vw;
}

#nav .companyName {
  display: block;
  display: flex;
  width: 15vw !important;
  height: 5vw;
  justify-content: center;
  align-items: center;
}

.dropdown_box {
  position: absolute;
  top: 100%;
  left: 50%;
  margin: 0;
  padding: 0;

  z-index: 999999;
}
.dropdown {
  background-color: red;

  background-color: #f9f9f9;
  width: 8vw;
  height: 9vw;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 999;
  border-radius: 10px;
  font-size: 0.8vw;
}

.dropdown ul {
  list-style-type: none;
  width: 100%;
  height: 9vw;
  display: flex;
  flex-direction: column;
  padding: 1vw;
  justify-content: space-around;
  align-items: center;
}

.dropdown ul li:hover {
  background-color: #f1f1f1;
}

.rl {
  color: inherit;
  text-decoration: none;
  border: none;
  padding: 0;
  background-color: transparent;
  font-size: 1vw;
  cursor: pointer;
}

.loginout {
  background-color: #448af9;
  border-radius: 0.6vw;
  color: white;
  border: 0.1vw solid #dcdfe6;
  padding: 0.3vw;
}
</style>
