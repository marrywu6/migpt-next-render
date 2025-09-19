// config.js - 环境变量配置集中管理

const config = {
  speaker: {
    userId: process.env.MI_USERID,
    password: process.env.MI_PASSWORD,
    did: process.env.MI_DID,
    passToken: process.env.MI_PASS_TOKEN, 
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASEURL || "https://tbai.xin/v1",
    model: process.env.GPT_MODEL || "gpt-4o-mini",
  },
  prompt: {
    system: process.env.SYSTEM_PROMPT || "你是一个智能助手，请根据用户的问题给出回答。",
  },
};

// 检查必要环境变量
const missing = [];
if (!config.speaker.userId) missing.push("MI_USERID");
if (!config.speaker.password) missing.push("MI_PASSWORD");
if (!config.speaker.did) missing.push("MI_DID");
if (!config.openai.apiKey) missing.push("OPENAI_API_KEY");

if (missing.length > 0) {
  console.error("❌ 启动失败，缺少环境变量:", missing.join(", "));
  process.exit(1);
}

export default config;



