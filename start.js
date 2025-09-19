import { MiGPT } from "@mi-gpt/next";

// 读取环境变量
const {
  MI_USERID,
  MI_PASSWORD,
  MI_DID,
  OPENAI_API_KEY,
  GPT_MODEL = "gpt-4o-mini",
  OPENAI_BASEURL = "https://api.openai.com/v1",
} = process.env;

// 检查关键变量是否存在
const missing = [];
if (!MI_USERID) missing.push("MI_USERID");
if (!MI_PASSWORD) missing.push("MI_PASSWORD");
if (!MI_DID) missing.push("MI_DID");
if (!OPENAI_API_KEY) missing.push("OPENAI_API_KEY");

if (missing.length > 0) {
  console.error("❌ 启动失败，缺少环境变量:", missing.join(", "));
  process.exit(1);
}

async function main() {
  await MiGPT.start({
    speaker: {
      userId: MI_USERID,
      password: MI_PASSWORD,
      did: MI_DID,
    },
    openai: {
      model: GPT_MODEL,
      baseURL: OPENAI_BASEURL,
      apiKey: OPENAI_API_KEY,
    },
    prompt: {
      system: "你是一个智能助手，请根据用户的问题给出回答。",
    },
    async onMessage(engine, { text }) {
      if (text === "测试") {
        return { text: "你好，很高兴认识你！" };
      }
    },
  });

  console.log("✅ MiGPT-Next 已启动");
  process.exit(0);
}

main().catch(err => {
  console.error("启动失败:", err);
  process.exit(1);
});
