# 使用官方 Node 18 镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 拷贝 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 拷贝项目文件
COPY . .

# 设置 Node 为 ES Module
ENV NODE_OPTIONS=--experimental-specifier-resolution=node

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", "start.js"]
