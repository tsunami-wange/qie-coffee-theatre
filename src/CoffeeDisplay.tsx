import {useMemo} from 'react';
import * as THREE from 'three';
import {Environment, Lightformer} from '@react-three/drei';
import {products, type Info} from './config';

// Product geometry follows the supplied brand posters; no external model is required.
const maps=new Map<string,THREE.CanvasTexture>();
function latteMap(dark:boolean){
 const key=dark?'dark':'milk';if(maps.has(key))return maps.get(key)!;
 const c=document.createElement('canvas');c.width=512;c.height=512;const x=c.getContext('2d')!;
 const g=x.createLinearGradient(0,0,0,512);g.addColorStop(0,'#643019');g.addColorStop(.25,'#a56130');g.addColorStop(.52,'#d9a56b');g.addColorStop(.85,'#f2d7a3');g.addColorStop(1,dark?'#672e26':'#e6c48f');x.fillStyle=g;x.fillRect(0,0,512,512);
 for(let i=0;i<30;i++){const px=i*18; x.strokeStyle=`rgba(113,55,22,${.025+(i%5)*.012})`;x.lineWidth=8+i%12;x.beginPath();x.moveTo(px,0);for(let y=0;y<480;y+=12)x.lineTo(px+Math.sin(y*.018+i)*18+Math.sin(y*.04)*7,y);x.stroke()}
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;maps.set(key,t);return t;
}
function brandMap(){if(maps.has('brand'))return maps.get('brand')!;const c=document.createElement('canvas');c.width=512;c.height=256;const x=c.getContext('2d')!;x.fillStyle='#fff4d8';x.textAlign='center';x.font='48px Georgia';x.fillText('Qie.Coffee',256,112);x.font='28px serif';x.fillText('喫 咖 啡',256,160);x.font='15px Georgia';x.fillText('SHANGHAI COFFEE',256,197);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;maps.set('brand',t);return t}
function Pearl({p,r=.035,c='#f8ead0'}:{p:[number,number,number];r?:number;c?:string}){return <mesh position={p} castShadow><sphereGeometry args={[r,16,12]}/><meshPhysicalMaterial color={c} roughness={.3} clearcoat={.25}/></mesh>}
function Drink({x,item,kind,onInfo}:{x:number;item:Info;kind:number;onInfo:(i:Info)=>void}){
 const spiral=useMemo(()=>{const points=[];for(let i=0;i<=140;i++){const t=i/140;const a=t*Math.PI*8;const r=.115*(1-t);points.push(new THREE.Vector3(Math.cos(a)*r,.48+t*.16,Math.sin(a)*r))}return new THREE.CatmullRomCurve3(points)},[]);
 const photo=useMemo(()=>{const t=new THREE.TextureLoader().load(item.images![0]);t.colorSpace=THREE.SRGBColorSpace;return t},[item]);
 return <group position={[x,.99,-3.98]} onClick={e=>{e.stopPropagation();onInfo(item)}}>
  <mesh receiveShadow><cylinderGeometry args={[.22,.22,.018,48]}/><meshStandardMaterial color="#b39459" metalness={.8} roughness={.27}/></mesh>
  <mesh position={[0,.235,0]} castShadow><cylinderGeometry args={[.145,.105,.44,48]}/><meshPhysicalMaterial map={latteMap(kind===2)} roughness={.25} clearcoat={.65}/></mesh>
  <mesh position={[0,.24,0]}><cylinderGeometry args={[.151,.11,.46,48,1,true]}/><meshPhysicalMaterial color="#fff7ec" transparent opacity={.16} roughness={.1} depthWrite={false} side={THREE.DoubleSide}/></mesh>
  {[.025,.46].map(y=><mesh key={y} position={[0,y,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[y>.1?.151:.11,.009,10,48]}/><meshPhysicalMaterial color="#fae8c9" roughness={.16} metalness={.15}/></mesh>)}
  <mesh position={[0,.235,.156]}><planeGeometry args={[.27,.135]}/><meshBasicMaterial map={brandMap()} transparent depthWrite={false}/></mesh>
  <mesh castShadow><tubeGeometry args={[spiral,100,.032,10,false]}/><meshPhysicalMaterial color="#fff0d5" roughness={.6}/></mesh>
  {kind===0&&Array.from({length:7},(_,i)=><Pearl key={i} p={[Math.cos(i*2.4)*.085,.55+(i%3)*.025,Math.sin(i*2.4)*.085]} r={.033}/>)}
  {kind===1&&[-1,1].map(v=><group key={v} position={[v*.058,.61,-.02]} rotation={[0,v*.3,v*.24]}><mesh castShadow><torusGeometry args={[.065,.022,10,28]}/><meshStandardMaterial color="#bf732c" roughness={.8}/></mesh><mesh position={[0,0,.017]}><torusGeometry args={[.04,.009,8,28]}/><meshStandardMaterial color="#e8b15e" roughness={.8}/></mesh></group>)}
  {kind===2&&Array.from({length:8},(_,i)=><Pearl key={i} p={[Math.cos(i*2.4)*.09,.55+(i%2)*.04,Math.sin(i*2.4)*.08]} r={.027} c={i%3===0?'#eee1c4':'#722b20'}/>)}
  {Array.from({length:16},(_,i)=><Pearl key={i} p={[Math.cos(i*2.399)*(.025+i*.006),.51+(i%4)*.025,Math.sin(i*2.399)*(.025+i*.006)]} r={kind===1?.009:.006} c={kind===1?'#c58b42':'#e4ac34'}/>)}
  <group position={[.28,.15,.035]} rotation={[-.12,-.12,0]}><mesh castShadow><boxGeometry args={[.19,.29,.025]}/><meshStandardMaterial color="#a9844c" metalness={.65} roughness={.35}/></mesh><mesh position={[0,0,.014]}><planeGeometry args={[.17,.255]}/><meshBasicMaterial map={photo} toneMapped={false}/></mesh></group>
 </group>
}
export function CoffeeDisplay({onInfo}:{onInfo:(i:Info)=>void}){return <group><Drink x={-1.75} item={products[2]} kind={0} onInfo={onInfo}/><Drink x={-.92} item={products[1]} kind={1} onInfo={onInfo}/><Drink x={.9} item={products[3]} kind={2} onInfo={onInfo}/></group>}
export function StudioReflections(){return <Environment resolution={128} frames={1}><Lightformer position={[0,5,0]} rotation={[Math.PI/2,0,0]} scale={[10,8,1]} intensity={.65} color="#fff0d4"/><Lightformer position={[0,2,8]} scale={[12,4,1]} intensity={1.2} color="#e4f1ff"/><Lightformer position={[-5,2,-4]} rotation={[0,Math.PI/2,0]} scale={[2,3,1]} intensity={.65} color="#ffd39c"/></Environment>}
