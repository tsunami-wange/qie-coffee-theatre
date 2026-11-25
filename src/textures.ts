import * as THREE from 'three';

let woodTexture: THREE.CanvasTexture | undefined;
let mosaicTexture: THREE.CanvasTexture | undefined;

export function getWoodTexture() {
  if (woodTexture) return woodTexture;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#75493a';
  ctx.fillRect(0, 0, 256, 512);
  for (let x = 0; x < 256; x += 2) {
    const wave = Math.sin(x * .11) * 3 + Math.sin(x * .037) * 8;
    const shade = Math.round(27 + 12 * Math.sin(x * .17) + 7 * Math.sin(x * .49));
    ctx.strokeStyle = `rgba(${shade},${Math.round(shade*.42)},${Math.round(shade*.27)},${.13 + .15 * Math.abs(Math.sin(x*.08))})`;
    ctx.lineWidth = x % 13 === 0 ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    for (let y = 0; y <= 512; y += 16) ctx.lineTo(x + Math.sin(y*.018+x*.02)*wave, y);
    ctx.stroke();
  }
  for (let i = 0; i < 7; i++) {
    const x = 26 + i * 33, y = 45 + (i * 71) % 400;
    ctx.strokeStyle = 'rgba(39,15,12,.25)';
    ctx.beginPath(); ctx.ellipse(x,y,5,18,.2,0,Math.PI*2); ctx.stroke();
  }
  woodTexture = new THREE.CanvasTexture(canvas);
  woodTexture.colorSpace = THREE.SRGBColorSpace;
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  return woodTexture;
}

export function getMosaicTexture() {
  if (mosaicTexture) return mosaicTexture;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#afa99b';ctx.fillRect(0,0,512,512);
  const colors = ['#e5dfce','#d4cfbf','#eee7d5','#bfc2b7','#d5cab4','#8c9992'];
  for(let row=0;row<16;row++)for(let col=0;col<16;col++){
    const n=(row*19+col*23+row*col*7)%53;
    const motif=(row===0||col===0||row===15||col===15);
    ctx.fillStyle=motif?'#394e49':colors[n%colors.length];
    ctx.fillRect(col*32+2,row*32+2,28,28);
    if(n%9===0){ctx.fillStyle='rgba(118,80,62,.13)';ctx.fillRect(col*32+3,row*32+3,26,3)}
  }
  mosaicTexture = new THREE.CanvasTexture(canvas);
  mosaicTexture.colorSpace=THREE.SRGBColorSpace;
  mosaicTexture.wrapS=mosaicTexture.wrapT=THREE.RepeatWrapping;
  mosaicTexture.repeat.set(8,7);
  mosaicTexture.anisotropy=4;
  return mosaicTexture;
}
