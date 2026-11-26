/** Lightweight 2D collision for the concept store. Positions are metres. */
import {screenPositions, seatingPositions} from './layout';
export function moveWithCollision(fromX:number, fromZ:number, dx:number, dz:number, doorOpen:boolean){
  const blocked=(x:number,z:number)=>{
    if(x < -6.48 || x > 6.48 || z < -5.5 || z > 18) return true;
    // The front wall has a 1.6 m doorway. Closed doors block that opening.
    if(z>5.85 && z<6.15 && (!doorOpen || Math.abs(x)>.76)) return true;
    // Guest circulation stays in front of the working counter and display cabinets.
    if(x>-3.05 && x<3.05 && z>-5.58 && z<-3.46) return true;
    if(x>3.62 && z>-4.35 && z<-3.18) return true;
    if(x<-3.72 && z>-5.4 && z<-4.18) return true;
    // Side-wall display and floral screens leave a clear central aisle.
    if(x>5.55 && z>1.95 && z<4.55) return true;
    for(const [sx,sz] of screenPositions)if(Math.abs(x-sx)<1.2&&Math.abs(z-sz)<.17)return true;
    for(const [tx,tz] of seatingPositions){
      if(Math.hypot(x-tx,z-tz)<.76) return true;
      for(const side of [-1,1])if(Math.abs(x-(tx+side*1.22))<.51&&Math.abs(z-tz)<.59)return true;
    }
    if(x>-6.35 && x<-3.05 && z>8.35 && z<9.95) return true;
    return false;
  };
  let x=fromX,z=fromZ;
  if(!blocked(x+dx,z))x+=dx;
  if(!blocked(x,z+dz))z+=dz;
  return {x,z};
}

export function changeHeight(y:number,direction:number,dt:number,max=4.1){return Math.max(.75,Math.min(max,y+direction*Math.min(dt,.05)*1.5))}
