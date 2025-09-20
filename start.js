import 'dotenv/config';
import express from 'express';
import { MiGPT } from '@mi-gpt/next';
import config from './config.js';

const PORT = process.env.PORT || 3000;

// 绑定端口，避免 Render 报错
const app = express();
app.get('/', (req, res) => res.send('MiGPT-Next 服务运行中'));
app.listen(PORT, () => console.log(`🌐 服务已启动，监听端口 ${PORT}`));

async function detectTTS(engine) {
  console.log("🔍 检测设备支持的 TTS Action...");
  try {
    const spec = await engine.MiOT.getSpec();
    const ttsActions = [];

    spec.services.forEach((service) => {
      service.actions.forEach((action) => {
        if (action.type.includes("text_to_speech")) {
          ttsActions.push({ serviceId: service.iid, actionId: action.iid });
        }
      });
    });

    if (ttsActions.length === 0) {
      console.warn("⚠️ 未检测到 TTS Action，请手动设置 ttsCommand");
      return null;
    }

    console.log("✅ 检测到的 TTS Action：", ttsActions);
    // 默认使用第一个
    return ttsActions[0];
  } catch (err) {
    console.error("❌ 检测 TTS 失败:", err);
    return null;
  }
}

async function main() {
  const engine = await MiGPT.init(config);

  // 自动检测 TTS
  const ttsCommand = await detectTTS(engine);

  // 启动 AI
  await MiGPT.start({
    ...config,
    async onMessage(engine, msg) {
      if (engine.config.callAIKeywords.some((e) => msg.text.startsWith(e))) {
        await engine.speaker.abortXiaoAI(); // 打断原有小爱回复
        const { text } = await engine.askAI(msg);
        console.log(`🔊 AI 回复: ${text}`);

        if (ttsCommand) {
          await engine.MiOT.doAction(ttsCommand.serviceId, ttsCommand.actionId, text);
        } else {
          console.warn("⚠️ 未播放 TTS，请手动配置 ttsCommand");
        }

        return { handled: true };
      }
    },
  });
}

main().catch((err) => {
  console.error("❌ 启动失败:", err);
  process.exit(1);
});

