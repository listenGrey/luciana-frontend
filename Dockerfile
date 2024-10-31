# 使用官方 Node.js 镜像
FROM node:16 AS build-stage

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制其余的项目文件
COPY . .

# 构建前端项目
RUN npm run build

# 使用 Nginx 提供服务
FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 复制 Nginx 配置（可选）
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
