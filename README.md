# 司南 - 科技管理数字化系统

## 介绍

### 技术栈

Vue3, Typescript, Vite, Pinia, Element-Plus, Antv-X6图编辑引擎

### 文件资源目录

```text
sinan-system
├─ .husky                 # husky 配置文件
├─ .vscode                # VSCode 推荐配置
├─ public                 # 静态资源文件（该文件夹不会被打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ hooks               # 常用 Hooks 封装
│  ├─ layout              # 框架布局模块
│  ├─ router              # 路由管理
│  ├─ store               # pinia store
│  ├─ styles              # 全局样式文件
│  ├─ typings             # 全局 ts 声明
│  ├─ utils               # 常用工具库
│  ├─ views               # 项目所有页面
│  ├─ App.vue             # 项目主组件
│  ├─ env.d.ts            # 指定 ts 识别 vue
│  └─ main.ts             # 项目入口文件
├─ .commitlintrc.cjs      # git 提交规范配置
├─ .editorconfig          # 统一不同编辑器的编码风格
├─ .env                   # vite 常用配置
├─ .env.development       # 测试环境配置
├─ .env.production        # 生产环境配置 
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.cjs          # Eslint 校验配置文件
├─ .gitignore             # 忽略 git 提交
├─ .prettierignore        # 忽略 Prettier 格式化
├─ .prettierrc.cjs        # Prettier 格式化配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ .stylelintrc.cjs       # stylelint 样式格式化配置 
├─ index.html             # 入口 html 
├─ lßint-staged.config.cjs # lint-staged 配置文件
├─ package.json           # 依赖包管理
├─ pnpm-lock.yaml         # 依赖包包版本锁
├─ postcss.config.cjs     # postcss 配置
├─ README.md              # README 介绍 
├─ tailwind.config.js     # tailwind配置
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 全局配置文件
```

## 安装与运行

### 安装

```bash
pnpm install
# 若安装失败，注意 Node.js 版本，请升级到 16 以上
```

### 运行

```bash
pnpm run dev
```

## 打包部署

```bash
# 测试环境
pnpm run build:dev
# 生产环境
pnpm run build
```

## 其他

### 提交代码

```bash
# 提交代码（提交前会自动执行 lint:lint-staged 命令）
pnpm run commit
```
