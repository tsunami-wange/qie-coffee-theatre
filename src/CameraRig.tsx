import {useEffect,useMemo,useRef} from 'react';
import {useFrame,useThree} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import type {ComponentRef} from 'react';
import * as THREE from 'three';
import {areas,type AreaId} from './config';
import {moveWithCollision,changeHeight} from './movement';
export function CameraRig({area,mode,open,depthOffset,onPosition}:{area:AreaId;mode:'orbit'|'walk';open:boolean;depthOffset:number;onPosition:(x:number,y:number,z:number,a:number)=>void}){
 const {camera,gl}=useThree();const controls=useRef<ComponentRef<typeof OrbitControls>>(null);
 const destination=useRef(new THREE.Vector3());const transitioning=useRef(false);
 const lastReport=useRef(0),keys=useRef(new Set<string>()),yaw=useRef(0),pitch=useRef(0),dragging=useRef(false);
 const orbitTarget=useMemo(()=>new THREE.Vector3(...areas.find(a=>a.id===area)!.target),[area,mode,depthOffset]);
 useEffect(()=>{const a=areas.find(a=>a.id===area)!;destination.current.set(...a.position);if(window.innerWidth<760){if(area==='exterior')destination.current.z=25.5;if(area==='overview')destination.current.set(0,25,9)}if(mode==='orbit')destination.current.z+=depthOffset;else destination.current.y=1.7;transitioning.current=true;keys.current.clear();yaw.current=Math.atan2(a.target[0]-a.position[0],-(a.target[2]-a.position[2]));pitch.current=0},[area,mode,depthOffset]);
 useEffect(()=>{
  const canvas=gl.domElement;canvas.tabIndex=0;canvas.setAttribute('aria-label','三维场景：空格抬高视角，Shift 降低视角');
  const accepted=new Set(['Space','ShiftLeft','ShiftRight','KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight']);
  const reset=()=>{keys.current.clear();dragging.current=false};
  const down=(e:KeyboardEvent)=>{if(!accepted.has(e.code)||e.ctrlKey||e.metaKey||e.altKey)return;const el=e.target as HTMLElement;if(document.querySelector('.modal-shade')||el.closest?.('input,textarea,select,button,a,[contenteditable="true"]'))return;e.preventDefault();keys.current.add(e.code)};
  const up=(e:KeyboardEvent)=>keys.current.delete(e.code);
  const start=()=>{canvas.focus({preventScroll:true});dragging.current=true};const end=()=>dragging.current=false;
  const move=(e:PointerEvent)=>{if(mode==='walk'&&dragging.current){yaw.current-=e.movementX*.003;pitch.current=THREE.MathUtils.clamp(pitch.current-e.movementY*.002,-.9,.9)}};
  window.addEventListener('keydown',down);window.addEventListener('keyup',up);window.addEventListener('blur',reset);document.addEventListener('visibilitychange',reset);canvas.addEventListener('pointerdown',start);window.addEventListener('pointerup',end);window.addEventListener('pointermove',move);
  return()=>{reset();window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);window.removeEventListener('blur',reset);document.removeEventListener('visibilitychange',reset);canvas.removeEventListener('pointerdown',start);window.removeEventListener('pointerup',end);window.removeEventListener('pointermove',move)};
 },[gl,mode]);
 useFrame(({clock},delta)=>{
  const dt=Math.min(delta,.05);if(document.querySelector('.modal-shade'))keys.current.clear();const k=keys.current;
  const vertical=Number(k.has('Space'))-Number(k.has('ShiftLeft')||k.has('ShiftRight'));
  if(vertical){transitioning.current=false;const newY=changeHeight(camera.position.y,vertical,dt,area==='overview'?28:area==='exterior'?12:4.1);const dy=newY-camera.position.y;camera.position.y=newY;if(mode==='orbit'&&controls.current)controls.current.target.y+=dy}
  if(transitioning.current){camera.position.lerp(destination.current,Math.min(1,dt*3));if(camera.position.distanceTo(destination.current)<.04)transitioning.current=false}
  if(mode==='walk'){
   if(!transitioning.current){const f=Number(k.has('KeyW')||k.has('ArrowUp'))-Number(k.has('KeyS')||k.has('ArrowDown'));const side=Number(k.has('KeyD')||k.has('ArrowRight'))-Number(k.has('KeyA')||k.has('ArrowLeft'));if(f||side){const v=new THREE.Vector3(Math.sin(yaw.current)*f+Math.cos(yaw.current)*side,0,-Math.cos(yaw.current)*f+Math.sin(yaw.current)*side).normalize().multiplyScalar(dt*2.6);const p=moveWithCollision(camera.position.x,camera.position.z,v.x,v.z,open);camera.position.x=p.x;camera.position.z=p.z}}
   const direction=new THREE.Vector3(Math.sin(yaw.current)*Math.cos(pitch.current),Math.sin(pitch.current),-Math.cos(yaw.current)*Math.cos(pitch.current));camera.lookAt(camera.position.clone().add(direction));
  }
  if(clock.elapsedTime-lastReport.current>.12){lastReport.current=clock.elapsedTime;onPosition(camera.position.x,camera.position.y,camera.position.z,yaw.current)}
 });
 return mode==='orbit'?<OrbitControls ref={controls} makeDefault enableDamping dampingFactor={.08} target={orbitTarget} minDistance={2} maxDistance={28} maxPolarAngle={Math.PI*.49} onStart={()=>transitioning.current=false}/>:null;
}
