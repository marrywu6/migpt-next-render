import express from "express";
import { MiGPT } from "@mi-gpt/next";
import config from "./config.js";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("MiGPT-Next running!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

async function main() {
  await MiGPT.start({
    speaker: config.speaker,
    openai: config.openai,
    prompt: config.prompt,
    /**
 * 自定义消息回复
 */
onMessage(engine, msg) {
  if (engine.config.callAIKeywords.some((e) => msg.text.startsWith(e))) {
    // 打断原来小爱的回复
    await engine.speaker.abortXiaoAI();
    // 调用 AI 回答
    const { text } = await engine.askAI(msg);
    console.log(`🔊 ${text}`);
    // TTS 播放文字
    await engine.MiOT.doAction(5, 1, text); // 👈 注意把 5,1 换成你的设备 ttsCommand
    return { handled: true };
  }
}
  });

  console.log("✅ MiGPT-Next 已启动");
}

main().catch(err => {
  console.error("启动失败:", err);
  process.exit(1);
});



