# Qie.Coffee｜喫咖啡 · 海派咖啡剧场

约 14 × 12 m 的建筑外轮廓、约 150 m² 的概念使用面积、层高约 4.6 m 的**课程概念设计**。这是可交互的三维品牌空间展示，不是施工图或真实门店测绘。几何、陈设与品牌内容为 Qie.Coffee 独立设计；所附照片只用于提炼海派建筑语言和材质氛围。

## 启动

需要 Node.js 20+ 和 pnpm。

```bash
pnpm install --ignore-scripts
pnpm dev
```

打开 `http://127.0.0.1:4173/`。当前开发服务器在启动时构建一次；修改源码后重新运行 `pnpm dev`。也可以在一般开发环境中使用 Vite：`pnpm exec vite --host 127.0.0.1`。标准静态构建采用 esbuild，以兼容当前 macOS 环境的 Rollup 原生模块签名限制。

```bash
pnpm build
pnpm preview
```

产物在 `dist/`，同时复制到可直接用于 GitHub Pages 的 `docs/`。资源路径相对于页面，可部署在仓库子目录。项目不需要后端、账号或收费 API。

## 操作

- 左侧选择区域；“推门进入”打开双门并移动镜头。
- 鼠标拖动旋转视角，滚轮缩放；俯瞰会隐藏屋顶。
- “漫游”模式用 WASD / 方向键移动，拖动鼠标转向。空间边界和舞台有基础碰撞约束。
- 顶栏自动导览每 6.5 秒切换一个区域，按钮可暂停；手动选择区域也会退出自动导览。
- 右侧切换昼夜、互动提示点、小地图和全屏。手机可触控旋转与缩放，并用区域导航。
- 点击门、幕布、咖啡机、产品、食材、座位、留声机、文化卡及礼品可查看说明。点击食材可加入本地概念配方。
- 没有设置点单网址时，“进入点单系统”打开本地简化 DIY 面板，不会提交真实订单。

## 如何调整

| 内容 | 文件 | 方法 |
| --- | --- | --- |
| 品牌与点单地址 | `src/config.ts` | 修改 `siteConfig.brand` / `orderingUrl` |
| 空间尺寸与色彩 | `src/config.ts` | 修改 `dimensions` 与 `palette`；改变尺寸后同步调整几何坐标 |
| 导览镜头 | `src/config.ts` | 修改 `areas` 中的 `position` 与 `target` |
| 产品、配料与文化说明 | `src/config.ts` | 修改 `products`、`ingredients`、`content` 的中英文字段 |
| 建筑、家具、区域模型 | `src/Scene.tsx` | 调整 `Facade`、`Walls`、`Seating`、`Stage`、`Lab`、`Mix` 等组件 |
| 界面和移动布局 | `src/main.tsx`、`src/styles.css` | 修改控制逻辑与样式 |

模型使用 Three.js 原生几何与程序化组合，无外部 GLB 或远程贴图依赖。若要替换材质，可在 `B`、`C` 组件中改用纹理材质，并将纹理文件放到项目内。`Label` 使用浏览器 Canvas 生成文字贴图。新增热点时，给三维物体绑定 `onClick`，并将对应内容加入 `content`。

## 接入已有点单网站

`src/config.ts` 的 `siteConfig.orderingUrl` 已设置为 `https://tsunami-wange.github.io/qie-coffee/`。顶栏点单入口和 DIY 按钮会在新标签页打开该站点。现有点单站不在本项目中，也没有被复制或改写。

## GitHub Pages 手动部署

1. 运行 `pnpm build`，提交更新后的 `docs/`。
2. 在仓库 **Settings → Pages** 中选择主分支和 `/docs` 目录。
4. 等待 Pages 给出站点网址。网站使用相对路径，可适应仓库子路径。

当前项目没有配置自动发布工作流；Pages 使用分支中的静态 `docs/` 文件。

## 已知边界

移动碰撞覆盖建筑边界、门洞、舞台、主要展柜及桌位，不是完整物理引擎。音频资源尚未提供，声音按钮为预留接口，页面不会自动播放。产品与售价为课堂展示的概念内容，不代表真实售卖。文化展陈明确区分通用历史背景与品牌创意构想。
