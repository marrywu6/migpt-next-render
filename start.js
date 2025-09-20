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
      
        await engine.MiOT.doAction(5, 3, text);
       
        return { handled: true };
      }
    },
  });
}

main().catch((err) => {
  console.error("❌ 启动失败:", err);
  process.exit(1);
});


