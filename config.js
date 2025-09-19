// config.js
// 使用环境变量配置敏感信息

module.exports = {
  openaiApiKey: process.env.OPENAI_API_KEY || "",
  miAccount: process.env.MI_ACCOUNT || "",
  miPassword: process.env.MI_PASSWORD || "",
  miDid: process.env.MI_DID || "",
  gptModel: process.env.GPT_MODEL || "gpt-4.1-mini",
  port: process.env.PORT || 3000,
  
  // baseURL 可自定义访问路径，方便反向代理或多服务部署
  baseURL: process.env.BASE_URL || ""
};
