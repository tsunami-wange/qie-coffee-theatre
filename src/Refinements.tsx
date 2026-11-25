import * as THREE from 'three';

const brass='#bb995e',mahogany='#512c26',cream='#ede2c9';
function Box({p,s,c,metalness=0}:{p:[number,number,number];s:[number,number,number];c:string;metalness?:number}){return <mesh position={p} castShadow receiveShadow><boxGeometry args={s}/><meshStandardMaterial color={c} metalness={metalness} roughness={metalness?.28:.68}/></mesh>}
function Cyl({p,r,h,c,rotate}:{p:[number,number,number];r:number;h:number;c:string;rotate?:[number,number,number]}){return <mesh position={p} rotation={rotate} castShadow><cylinderGeometry args={[r,r,h,20]}/><meshStandardMaterial color={c} metalness={c===brass?.65:0} roughness={.4}/></mesh>}
function Cup({x,z}:{x:number;z:number}){return <group><Cyl p={[x,1.04,z]} r={.11} h={.16} c={cream}/><Cyl p={[x,1.13,z]} r={.115} h={.025} c="#fff8e8"/><Cyl p={[x,1.149,z]} r={.083} h={.012} c="#9e6743"/><mesh position={[x+.135,1.08,z]}><torusGeometry args={[.052,.017,6,14,Math.PI*1.4]}/><meshStandardMaterial color={cream}/></mesh><Cyl p={[x,.94,z]} r={.17} h={.018} c="#d7c5a3"/></group>}
function MenuBoard({x,title,subtitle}:{x:number;title:string;subtitle:string}){return <group><Box p={[x,2.89,-5.68]} s={[1.25,.67,.08]} c="#172e29"/><Box p={[x,3.2,-5.6]} s={[1.27,.035,.04]} c={brass} metalness={.5}/><Box p={[x,2.57,-5.6]} s={[1.27,.035,.04]} c={brass} metalness={.5}/><mesh position={[x,3.02,-5.62]}><planeGeometry args={[1.05,.2]}/><meshBasicMaterial map={makeText(title,40)} transparent/></mesh><mesh position={[x,2.77,-5.62]}><planeGeometry args={[1.05,.14]}/><meshBasicMaterial map={makeText(subtitle,26)} transparent/></mesh></group>}
const labels=new Map<string,THREE.CanvasTexture>();
function makeText(text:string,size:number){const key=text+size;if(labels.has(key))return labels.get(key)!;const canvas=document.createElement('canvas');canvas.width=512;canvas.height=90;const ctx=canvas.getContext('2d')!;ctx.clearRect(0,0,512,90);ctx.fillStyle='#e8d3a7';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`600 ${size}px Georgia, serif`;ctx.fillText(text,256,45);const texture=new THREE.CanvasTexture(canvas);labels.set(key,texture);return texture}
export function StageRefinements(){return <group>
  {Array.from({length:23},(_,i)=><Box key={i} p={[-2.57+i*.234,.58,-3.746]} s={[.045,.56,.035]} c={i%3===0?'#9f7251':'#6e4739'}/>)}
  <Box p={[0,.86,-3.715]} s={[5.46,.035,.055]} c={brass} metalness={.7}/><Box p={[0,.28,-3.715]} s={[5.46,.035,.055]} c={brass} metalness={.7}/>
  <Cyl p={[0,.58,-3.69]} r={.22} h={.035} c={brass} rotate={[Math.PI/2,0,0]}/>
  <Cyl p={[0,.58,-3.66]} r={.14} h={.037} c="#17372d" rotate={[Math.PI/2,0,0]}/>
  <Box p={[0,1.46,-4.53]} s={[1.15,.56,.14]} c="#b4b8b2" metalness={.55}/><Box p={[0,1.21,-4.43]} s={[1.28,.08,.25]} c="#454c49" metalness={.35}/>
  {[-.36,0,.36].map((x,i)=><group key={i}><Cyl p={[x,1.55,-4.43]} r={.075} h={.024} c={i===1?'#f0e1be':brass} rotate={[Math.PI/2,0,0]}/><Cyl p={[x,1.22,-4.31]} r={.055} h={.17} c="#343b39" rotate={[Math.PI/2,0,0]}/></group>)}
  <Cyl p={[1.51,1.23,-4.75]} r={.13} h={.46} c="#272e2b"/><Cyl p={[1.51,1.49,-4.75]} r={.2} h={.08} c={brass}/><Cyl p={[1.51,1.7,-4.75]} r={.14} h={.31} c="#58514a"/>
  {[-2.11,-1.66,-1.22].map((x,i)=><group key={i}><Cyl p={[x,1.18,-4.65]} r={.14} h={.3} c={['#e2d4b7','#b8a582','#cead86'][i]}/><Cyl p={[x,1.34,-4.65]} r={.155} h={.035} c={brass}/></group>)}
  <Cup x={-1.04} z={-4.02}/><Cup x={-.72} z={-4.04}/>
  <MenuBoard x={-1.42} title="CLASSICS" subtitle="上海经典 · ¥28–38"/><MenuBoard x={1.42} title="QIE.LAB" subtitle="创意风味 · ¥36–39"/>
 </group>}
export function SeatingRefinements(){return <group>{[[-3.5,-.4],[-3.5,2.3],[3.5,.2],[3.5,2.55]].map(([x,z],i)=><group key={i}>
  <Cyl p={[x-.29,1.05,z+.18]} r={.035} h={.25} c={brass}/><Cyl p={[x-.29,1.2,z+.18]} r={.13} h={.12} c="#f2ddb5"/>
  <Cyl p={[x+.22,1.02,z-.18]} r={.1} h={.1} c={cream}/><Cyl p={[x+.22,1.08,z-.18]} r={.07} h={.012} c="#926442"/>
  <Box p={[x,1.0,z+.38]} s={[.25,.025,.16]} c={mahogany}/><Box p={[x,1.027,z+.38]} s={[.2,.006,.12]} c={brass}/>
 </group>)}</group>}
