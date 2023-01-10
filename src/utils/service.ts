/*
 * @Author: your name
 * @Date: 2020-12-15 16:02:31
 * @LastEditTime: 2022-07-30 18:43:31
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-vue/src/utils/service.ts
 */
import axios from "axios";
import { ElMessage } from "element-plus";
// import { isPlainObject } from "lodash";

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

let lang = navigator.language; //常规浏览器语言和IE浏览器

const headerObj = {
  "Content-Type": "application/json;charset=UTF-8",
  // token: "7777777!",
  "system-source": "SLT",
  system: "supplier",
  currency: "USD",
  lang: lang,
  "app-id": "0",
};

// 创建一个 axios 实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_API,
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
    // 内部系统访问，使用飞书登录校验
    if (location.pathname === "/quotationManagement/bomInfo") {
      config.headers["system-source"] = "WEB";
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
    let msg = JSON.parse(error?.response?.data?.msg);
    if (error.response.status === 401 && msg.code == 1304) {
      error.response.data.msg = "登录超时，请重新登录";
      // localStorage.removeItem("login");
      errorHandle(
        error.response,
        () => {
          // window.location.href = window.location.origin + "/login";
        },
        2000
      );
    }
    return Promise.reject(error);
  }
);

export default service;
