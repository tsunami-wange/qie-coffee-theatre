import {useEffect,useRef,useState} from 'react';
import type {PointerEvent as ReactPointerEvent} from 'react';
export const mobileWalk={x:0,y:0,height:0};
const radius=46;
export function MobileWalkControls({onExit}:{onExit:()=>void}){
 const pad=useRef<HTMLDivElement>(null);const active=useRef<number|null>(null);const [stick,setStick]=useState({x:0,y:0});
 const reset=()=>{active.current=null;mobileWalk.x=0;mobileWalk.y=0;mobileWalk.height=0;setStick({x:0,y:0})};
 useEffect(()=>{const stop=()=>reset();window.addEventListener('blur',stop);document.addEventListener('visibilitychange',stop);return()=>{stop();window.removeEventListener('blur',stop);document.removeEventListener('visibilitychange',stop)}},[]);
 const move=(e:ReactPointerEvent<HTMLDivElement>)=>{if(active.current!==e.pointerId||!pad.current)return;const b=pad.current.getBoundingClientRect();let x=(e.clientX-b.left-b.width/2)/radius,y=(e.clientY-b.top-b.height/2)/radius;const d=Math.hypot(x,y);if(d>1){x/=d;y/=d}mobileWalk.x=Math.abs(x)<.08?0:x;mobileWalk.y=Math.abs(y)<.08?0:y;setStick({x:mobileWalk.x,y:mobileWalk.y})};
 const start=(e:ReactPointerEvent<HTMLDivElement>)=>{e.preventDefault();active.current=e.pointerId;e.currentTarget.setPointerCapture(e.pointerId);move(e)};
 const stop=(e:ReactPointerEvent<HTMLDivElement>)=>{if(active.current!==e.pointerId)return;reset()};
 return <div className="mobile-walk-controls" aria-label="手机漫游控制">
  <div className="walk-pad" ref={pad} role="group" aria-label="移动摇杆" onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={stop}><span className="pad-guides">✣</span><span className="walk-stick" style={{transform:`translate(${stick.x*radius}px,${stick.y*radius}px)`}}/><span className="pad-label">移动</span></div>
  <div className="walk-right"><span className="look-instruction">右侧拖动<br/>转动视角</span><div className="height-buttons"><button aria-label="抬高视角" onPointerDown={e=>{e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);mobileWalk.height=1}} onPointerUp={()=>mobileWalk.height=0} onPointerCancel={()=>mobileWalk.height=0} onLostPointerCapture={()=>mobileWalk.height=0}>↑<small>升高</small></button><button aria-label="降低视角" onPointerDown={e=>{e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);mobileWalk.height=-1}} onPointerUp={()=>mobileWalk.height=0} onPointerCancel={()=>mobileWalk.height=0} onLostPointerCapture={()=>mobileWalk.height=0}>↓<small>降低</small></button></div><button className="exit-walk" onClick={onExit}>退出漫游</button></div>
 </div>
}
