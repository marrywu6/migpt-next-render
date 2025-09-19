//start.js
const { MiGPT } = require('@mi-gpt/next');
const config = require('./config');

async function main() {
  try {
    await MiGPT.start({
      openaiApiKey: config.openaiApiKey,
      miAccount: config.miAccount,
      miPassword: config.miPassword,
      miDid: config.miDid,
      gptModel: config.gptModel,
      port: config.port,
      baseURL: config.baseURL, // 新增 baseURL 支持
      onMessage: async (engine, { text }) => {
        // 自定义消息回复逻辑
        if (text === "测试") {
          return { text: "你好，我已上线！" };
        }
      }
    });

    console.log(`MiGPT-Next 已启动，监听端口 ${config.port}, baseURL: ${config.baseURL}`);
  } catch (err) {
    console.error("启动失败:", err);
    process.exit(1);
  }
}

main();
