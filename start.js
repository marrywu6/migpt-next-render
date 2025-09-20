import 'dotenv/config';
import express from 'express';
import { MiGPT } from '@mi-gpt/next';
import config from './config.js';

const PORT = process.env.PORT || 3000;

// 绑定端口，避免 Render 报错
const app = express();
app.get('/', (req, res) => res.send('MiGPT-Next 服务运行中'));
app.listen(PORT, () => console.log(`🌐 服务已启动，监听端口 ${PORT}`));

/**
 * 自动检测 TTS 命令
 */
async function detectTTS(engine) {
  console.log("🔍 检测设备支持的 TTS Action...");
  try {
    const spec = await engine.speaker.MiOT.getSpec();
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
    return ttsActions[0]; // 默认使用第一个
  } catch (err) {
    console.error("❌ 检测 TTS 失败:", err);
    return null;
  }
}

/**
 * 启动 MiGPT
 */
async function main() {
  const ttsCommand = await MiGPT.start({
    ...config,
    async onReady(engine) {
      // 设备准备好后自动检测 TTS
      engine.ttsCommand = await detectTTS(engine);
    },
    async onMessage(engine, msg) {
      if (engine.config.callAIKeywords.some((e) => msg.text.startsWith(e))) {
        await engine.speaker.abortXiaoAI(); // 打断原来小爱回复
        const { text } = await engine.askAI(msg);
        console.log(`🔊 AI 回复: ${text}`);

        if (engine.ttsCommand) {
          await engine.speaker.MiOT.doAction(
            engine.ttsCommand.serviceId,
            engine.ttsCommand.actionId,
            text
          );
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
