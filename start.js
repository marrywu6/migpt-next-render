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
    async onMessage(engine, { text }) {
      if (text === "测试") {
        return { text: "你好，很高兴认识你！" };
      }
    },
  });

  console.log("✅ MiGPT-Next 已启动");
}

main().catch(err => {
  console.error("启动失败:", err);
  process.exit(1);
});

