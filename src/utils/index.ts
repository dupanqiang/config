/*
 * @author: zhao yongfei
 * @Date: 2022-07-29 17:31:18
 * @description: 
 * @LastEditTime: 2022-07-30 18:43:39
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-vue/src/utils/index.ts
 */

import axios from "axios";
const headerObj = {
  "Content-Type": "application/json;charset=UTF-8",
  // token: "7777777!",
  "system-source": "SLT",
};
// 补位
const padding = (text: string, len: number) => {
  // 这里注意一下，如果传入的字符串比较长，会被截断，例如padding('123456',3)将得到456
  return (new Array(len).join("0") + text).slice(-len);
};
export const formatDate = (date: Date | string, patten: string): string => {
  if (!date) return "";
  const oDate = typeof date === "string" ? new Date(date) : date;
  patten = patten || "yyyy-MM-dd HH:mm:ss";
  return patten.replace(
    /yyyy|MM|dd|yy|M|d|HH|mm|ss|H|m|s|w|W/gi,
    function (str) {
      let text: any = "";
      switch (str) {
        case "yyyy":
        case "yy":
          text = oDate.getFullYear();
          break;
        case "MM":
          if (oDate.getMonth() + 1 < 10) {
            text = "0" + (oDate.getMonth() + 1);
          } else {
            text = oDate.getMonth() + 1;
          }
          break;
        case "M":
          text = oDate.getMonth() + 1;
          break;
        case "dd":
          if (oDate.getDate() < 10) {
            text = "0" + oDate.getDate();
          } else {
            text = oDate.getDate();
          }
          break;
        case "d":
          text = oDate.getDate();
          break;
        case "HH":
          if (oDate.getHours() < 10) {
            text = "0" + oDate.getHours();
          } else {
            text = oDate.getHours();
          }
          break;
        case "H":
          text = oDate.getHours();
          break;
        case "mm":
          if (oDate.getMinutes() < 10) {
            text = "0" + oDate.getMinutes();
          } else {
            text = oDate.getMinutes();
          }
          break;
        case "m":
          text = oDate.getMinutes();
          break;
        case "ss":
          if (oDate.getSeconds() < 10) {
            text = "0" + oDate.getSeconds();
          } else {
            text = oDate.getSeconds();
          }
          break;
        case "s":
          text = oDate.getSeconds();
          if (text == "0") {
            text = "00";
          }
          break;
        case "W":
          text = ["一", "二", "三", "四", "五", "六", "日"][oDate.getDay()];
          break;
        case "w":
          text = oDate.getDay();
          break;
      }

      if (text && str.length != String(text).length) {
        text = padding(text, str.length);
      }

      return text;
    }
  );
};
// 导出
export const downLoadData = (parameter: {
  url: string;
  fileName: string;
  params?: any;
  method?: string;
  store: any
}) => {
  const { url, fileName, params, store } = parameter;
  store.commit("setLoading", true);
  axios.defaults.withCredentials = true;
  axios.defaults.timeout = 60000;
  axios.defaults.responseType = "blob";
  axios.defaults.headers = headerObj;
  let method: string = parameter.method || "post";
  (axios as any)
    [method](url, params)
    .then(function (response: any) {
      const blobUrl = URL.createObjectURL(response.data);
      var elink = document.createElement("a");
      elink.style.display = "none";
      elink.href = blobUrl;
      elink.download = fileName || "";
      document.body.appendChild(elink);
      elink.click();
      document.body.removeChild(elink);
      store.commit("setLoading", false);
    })
    .catch(function (error: any) {
      console.log(error);
    });
};
// 加
export const sum = (v1: number, v2: number) => {
  let r1, r2, m;
  try {
    r1 = v1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = v2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (mul(v1, m) + mul(v2, m)) / m;
};
// 减
export const sub = (v1: number, v2: number) => {
  let r1, r2, m, n;
  try {
    r1 = v1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = v2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = r1 >= r2 ? r1 : r2;
  return ((v1 * m - v2 * m) / m).toFixed(n);
};
// 乘
export const mul = (v1: number, v2: number) => {
  let m = 0,
    s1 = v1.toString(),
    s2 = v2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
};
// 除
export const div = (v1: number, v2: number) => {
  let t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = v1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = v2.toString().split(".")[1].length;
  } catch (e) {}
  r1 = Number(v1.toString().replace(".", ""));
  r2 = Number(v2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
};
// 回车事件
export const handleEnter = (cb: () => void) => {
  document.onkeydown = (e) => {
    if (e.keyCode == 13 || e.which == 13) {
      cb();
    }
  };
};