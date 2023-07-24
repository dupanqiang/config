/*
 * @Author: your name
 * @Date: 2020-12-15 16:02:31
 * @LastEditTime: 2023-07-21 18:38:49
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-config/src/utils/service.ts
 */
import axios from "axios";

// 记录和显示错误
function errorHandle(info: any, callback?: any, time?: number) {
  let sp = info?.data?.message || info?.data?.msg;
  // 显示提示
  ElMessage({
    type: "error",
    message: sp,
    duration: time || 2000,
    onClose: () => {
      callback && callback();
    },
  });
}

let lang = localStorage.getItem('my_locale')
const headerObj = {
  "Content-Type": "application/json;charset=UTF-8",
  "system-source": "WEB",
  system: "supplier",
  currency: "USD",
  lang: lang === 'zh' ? 'zh-CN' : (lang === 'en' ? 'en-US' : navigator.language),
  "app-id": "0",
};

// 创建一个 axios 实例
const service = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: headerObj,
});

//请求拦截
service.interceptors.request.use(
  (config) => {
    let userInfo: any = localStorage.getItem("userInfo");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      config.headers["x-user-slt-mobile"] = userInfo.mobile;
      config.headers["x-user-slt-login-id"] =
        userInfo.supplierUserVo?.userLoginId;
      config.headers["x-user-slt-user-name"] = !!userInfo.supplierUserVo
        ?.userName
        ? encodeURIComponent(userInfo.supplierUserVo?.userName)
        : userInfo?.mobile;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.data);
  }
);

/**
 * 响应拦截
 */
service.interceptors.response.use(
  (response) => {
    if (response.data.code == 1304 || response.data.code === 20007) {
      window.location.href = response.data.data;
    } else if (response.data.code === 401 || response.data.code === 10001) {
      errorHandle(response);
      window.location.href = window.location.origin;
      return Promise.reject(response.data.message);
    } else if (response.data.code === 204) {
      errorHandle(response.data.msg, () => (window.location.href = "/"));
      return Promise.reject(response);
    } else if (response.data.code !== 0) {
      errorHandle(response);
      return Promise.reject(response.data);
    } else {
      if (Object.prototype.toString.call(response.data.data).toLowerCase() == "[object object]") {
        return response.data.data;
      } else if (
        typeof response.data.data === "string" &&
        response.data.data != ""
      ) {
        let data = {};
        try {
          data = JSON.parse(response.data.data);
        } catch (e) {
          data = response.data.data;
        }
        return data;
      } else {
        return response.data.data;
      }
    }
  },
  (error) => {
    errorHandle(error.response);
    return Promise.reject(error);
  }
);

export default service;
