import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {extname,join,normalize} from 'node:path';
const dist=process.argv.includes('--dist');
if(!dist)await import('./build.mjs');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
const server=createServer(async(req,res)=>{let path=normalize(decodeURIComponent((req.url||'/').split('?')[0]));if(path==='/'||path==='.')path='/index.html';if(path.includes('..')){res.writeHead(403).end();return}try{const data=await readFile(join(process.cwd(),'dist',path));res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream'}).end(data)}catch{res.writeHead(404).end('Not found')}});
server.listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173/'));
