# Node.js 18 Alpine 基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install --production

# 复制整个项目
COPY . .

# 设置默认端口，可被 Render 环境变量覆盖
ENV PORT=3000
ENV BASE_URL=""

# 对外暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", "start.js"]

