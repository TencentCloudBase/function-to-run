# function-to-run

将 CloudBase 云函数转换为云托管

## 安装

```
npm install @cloudbase/function-to-run
```

## 如何使用

在云函数的根目录下，创建一份 `server.js`，填入以下内容

```js
const { CloudBaseRunServer } = require('@cloudbase/function-to-run')

// 导入云函数的入口函数
const myCloudFunction = require('./main.js').main

// 创建云托管Server实例
const server = new CloudBaseRunServer()

// 设置路由
server.route('/xxx', myCloudFunction)

// 监听端口
server.listen(3000)
```

然后在 `server.js` 平级目录下，创建一个 `Dockerfile`，填入以下内容：

```dockerfile
# 使用官方 Node.js 12 轻量级镜像.
# https://hub.docker.com/_/node
FROM node:12-slim

# 定义工作目录
WORKDIR /usr/src/app

# 将依赖定义文件拷贝到工作目录下
COPY package*.json ./

# 以 production 形式安装依赖
RUN npm install --only=production

# 将本地代码复制到工作目录内
COPY . ./

# 启动服务
CMD [ "node", "server.js" ]
```

## 如何发布

### 上传代码包

将目录下所有文件压缩为 zip：

![](https://main.qcloudimg.com/raw/2f7b3d10472cb95f7a87691a679e1ef6.png)

进入微信云托管，创建环境和服务，然后发布一个版本。

- 上传方式为本地代码
- 附件类型为 ZIP 压缩包（即上一步中产生的压缩包）
- 监听端口为 3000

![](https://main.qcloudimg.com/raw/42ff035c940850d5e4b7915a0a17f40c.png)

随后点击确定，即可创建一个版本，后续发布流程可以参考微信云托管文档。
