import {useMemo} from 'react';
import * as THREE from 'three';

const wood='#4b2b25',gold='#b9965e',red='#703540',cream='#e8d8b7';
function Rod({from,to,r=.045,color=gold}:{from:[number,number,number];to:[number,number,number];r?:number;color?:string}){
 const a=new THREE.Vector3(...from),b=new THREE.Vector3(...to),d=b.clone().sub(a);
 return <mesh position={a.add(b).multiplyScalar(.5)} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),d.clone().normalize())} castShadow><cylinderGeometry args={[r,r,d.length(),10]}/><meshStandardMaterial color={color} metalness={color===gold?.65:0}/></mesh>
}
function Arc({x,y,z,rx,ry,color=wood,r=.075}:{x:number;y:number;z:number;rx:number;ry:number;color?:string;r?:number}){
 const curve=useMemo(()=>new THREE.CatmullRomCurve3(Array.from({length:25},(_,i)=>{const t=Math.PI-i*Math.PI/24;return new THREE.Vector3(x+Math.cos(t)*rx,y+Math.sin(t)*ry,z)})),[x,y,z,rx,ry]);
 return <mesh castShadow><tubeGeometry args={[curve,40,r,8,false]}/><meshStandardMaterial color={color} metalness={color===gold?.6:0} roughness={.4}/></mesh>
}
function Globe({x,y,z,r,color}:{x:number;y:number;z:number;r:number;color:string}){return <mesh position={[x,y,z]} castShadow><sphereGeometry args={[r,12,8]}/><meshStandardMaterial color={color} roughness={.92}/></mesh>}
function StreetTree({x}:{x:number}){return <group><Rod from={[x,0,9.2]} to={[x,3.8,9.2]} r={.16} color="#544535"/>{Array.from({length:12},(_,i)=>{const a=i*2.399,h=2.9+(i%4)*.4,rr=.55+(i%3)*.18;return <Globe key={i} x={x+Math.cos(a)*rr} y={h} z={9.2+Math.sin(a)*rr} r={.55+(i%3)*.1} color={i%3===0?'#3d5641':i%3===1?'#52694b':'#637354'}/>})}</group>}
function Sconce({x,z}:{x:number;z:number}){return <group><mesh position={[x,2.85,z]}><boxGeometry args={[.13,.37,.13]}/><meshStandardMaterial color={gold} metalness={.7}/></mesh><mesh position={[x,3.05,z+.15]}><sphereGeometry args={[.14,12,10]}/><meshStandardMaterial color="#ffe2ae" emissive="#ffb75c" emissiveIntensity={.8}/></mesh><pointLight position={[x,3,z+.35]} intensity={2.5} distance={3} color="#ffcf8b"/></group>}
export function ExteriorDetails(){return <group>
  <Arc x={0} y={3.45} z={6.48} rx={1.43} ry={1.02} color="#d6cab4" r={.095}/>
  <Arc x={0} y={3.48} z={6.51} rx={1.25} ry={.85} color={gold} r={.025}/>
  <Rod from={[-1.5,4.57,6.47]} to={[0,4.84,6.47]} r={.055} color="#d6cab4"/>
  <Rod from={[0,4.84,6.47]} to={[1.5,4.57,6.47]} r={.055} color="#d6cab4"/>
  {[-4.3,4.3].map(x=><group key={x}>{Array.from({length:9},(_,i)=><Globe key={i} x={x-1.25+i*.31} y={3.53} z={6.55} r={.16} color={i%2?red:'#86424e'}/>)}<Rod from={[x-1.5,3.85,6.55]} to={[x+1.5,3.85,6.55]} r={.035} color={gold}/></group>)}
  {[-1.77,1.77].map(x=><Sconce key={x} x={x} z={6.5}/>)}
  <StreetTree x={-9.1}/><StreetTree x={9.1}/>
  <mesh position={[-5.3,.04,8.35]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.32,.47,20]}/><meshStandardMaterial color="#6c665a" side={THREE.DoubleSide}/></mesh>
  <mesh position={[5.3,.04,8.35]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.32,.47,20]}/><meshStandardMaterial color="#6c665a" side={THREE.DoubleSide}/></mesh>
 </group>}
export function InteriorDetails(){return <group>
  <Arc x={0} y={2.58} z={-5.08} rx={2.94} ry={1.28} color={wood} r={.17}/>
  <Arc x={0} y={2.58} z={-4.97} rx={2.72} ry={1.1} color={gold} r={.028}/>
  {[-2.55,2.55].map(x=><Sconce key={x} x={x} z={-4.98}/>)}
  {[-5.9,5.9].map(x=><group key={x}><mesh position={[x,3.2,0]}><boxGeometry args={[.13,1.35,1.8]}/><meshStandardMaterial color={wood}/></mesh><mesh position={[x,3.2,0]}><boxGeometry args={[.14,1.15,1.5]}/><meshStandardMaterial color={cream}/></mesh></group>)}
  <mesh position={[-6.37,.65,.15]}><boxGeometry args={[.48,1.3,2.2]}/><meshStandardMaterial color={wood}/></mesh>
  <mesh position={[-6.1,1.22,.15]}><boxGeometry args={[.12,.12,2.35]}/><meshStandardMaterial color={gold} metalness={.6}/></mesh>
  <Rod from={[-6.1,1.2,-.85]} to={[-6.1,2.6,-.85]} color={wood} r={.08}/><Rod from={[-6.1,1.2,1.15]} to={[-6.1,2.6,1.15]} color={wood} r={.08}/>
  <Arc x={-6.1} y={2.5} z={.15} rx={1} ry={.5} color={gold} r={.055}/>
 </group>}
