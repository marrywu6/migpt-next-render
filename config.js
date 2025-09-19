// config.js - 环境变量配置集中管理

const config = {
  speaker: {
    userId: process.env.MI_USERID,
    password: process.env.MI_PASSWORD,
    did: process.env.MI_DID,
     
passToken: 'V1:DXmurwq2/R1BHTELu6obCZ2iCvdSqWCmMRBqbihOG1101Txt4I5rE6U6d/6B8SXy3Es2FXNbALQguqWzJXG+AvCgwNdl2x5Pa8I0cALaP3cGaUAwH0sWtYLbBRFjn4JbwgqMtp/iV9BOtavtJeRF9VGTvV7RFxedUkYS+HM9lz1EsKotQD1o8ZEH70jLLJUwtBw48p1vQxPKTTupJ7xDJxR5zq6kzJhroUnHR3WbOFklUsr8sJLIVqTr2CovY9bVxDPZTyzZdmVEQidkhx7qNLtG4k9jRkxhUW0dnNHat/FQKBem8Pa4j+xGaot8cyj3g81EUWiRcdGICdM67JgVkw==
  '
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


