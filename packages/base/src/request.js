import refreshToken from "first";

const instance = axios.create({
  baseURL: "https://some-domain.com/api/",
  //   timeout: 1000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// 添加请求拦截器
instance.interceptors.request.use(async (config) => {
  // 在发送请求之前做些什么
  return config;
});

// 添加响应拦截器
instance.interceptors.response.use(async (res) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 重新登陆
  console.log(res);
  if (res.data.code === 401) {
    await refreshToken();
  }
  return response;
});

export default instance;
