import {build} from 'esbuild';
import {copyFile,mkdir,writeFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
await build({entryPoints:['src/main.tsx'],bundle:true,format:'esm',outfile:'dist/app.js',loader:{'.css':'css'},jsx:'automatic',minify:true,target:'es2022'});
await writeFile('dist/index.html','<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="theme-color" content="#142a24"><title>Qie.Coffee｜海派咖啡剧场</title><meta name="description" content="交互式3D海派咖啡剧场"></head><body><div id="root"></div><link rel="stylesheet" href="./app.css"><script type="module" src="./app.js"></script></body></html>');
await mkdir('docs',{recursive:true});
for(const name of ['index.html','app.js','app.css'])await copyFile(`dist/${name}`,`docs/${name}`);
console.log('Built dist/ and docs/ for static hosting.');
