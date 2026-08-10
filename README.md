# 邱宇｜UI/UX 设计师作品集

面向招聘方的个人作品集首页，使用真实项目界面展示复杂桌面工具、批处理状态与 AI 创作工作流设计能力。

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## GitHub Pages 部署

仓库已包含 `.github/workflows/deploy.yml`。将代码推送到 GitHub 仓库的 `main` 分支后：

1. 进入仓库 **Settings → Pages**。
2. 将 **Build and deployment / Source** 设置为 **GitHub Actions**。
3. 手动运行 `Deploy portfolio to GitHub Pages`，或再次推送到 `main`。

Vite 使用相对资源路径，可部署在 `https://<用户名>.github.io/<仓库名>/` 子路径。

## 内容维护

- 页面内容：[src/App.tsx](./src/App.tsx)
- 全局视觉与响应式：[src/index.css](./src/index.css)
- 优化后的网页素材：[public/assets](./public/assets)
- 视觉系统：[DESIGN.md](./DESIGN.md)
- 产品与真实性边界：[PRODUCT.md](./PRODUCT.md)

原始设计稿保留在 `项目文件`，网页使用的 WebP 由 `scripts/prepare-assets.py` 生成。
