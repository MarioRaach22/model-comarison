/* Headless verification of the cube's rotation logic.
   Mirrors the exact matrices / move definitions used in index.html. */
"use strict";

const FACES = {
  R:{axis:"x", layer: 1, sign: 1},
  L:{axis:"x", layer:-1, sign:-1},
  U:{axis:"y", layer:-1, sign:-1},
  D:{axis:"y", layer: 1, sign: 1},
  F:{axis:"z", layer: 1, sign: 1},
  B:{axis:"z", layer:-1, sign:-1},
};
const AXIS_IDX = {x:0, y:1, z:2};
const I = [[1,0,0],[0,1,0],[0,0,1]];

function rotMat(axis, sign){
  if(axis==="x") return sign>0 ? [[1,0,0],[0,0,-1],[0,1,0]]
                               : [[1,0,0],[0,0,1],[0,-1,0]];
  if(axis==="y") return sign>0 ? [[0,0,1],[0,1,0],[-1,0,0]]
                               : [[0,0,-1],[0,1,0],[1,0,0]];
  return sign>0 ? [[0,-1,0],[1,0,0],[0,0,1]]
               : [[0,1,0],[-1,0,0],[0,0,1]];
}
function matMul(A,B){
  const r=[[0,0,0],[0,0,0],[0,0,0]];
  for(let i=0;i<3;i++) for(let j=0;j<3;j++){
    let s=0; for(let k=0;k<3;k++) s+=A[i][k]*B[k][j]; r[i][j]=s;
  }
  return r;
}
function matVec(M,v){ return [ M[0][0]*v[0]+M[0][1]*v[1]+M[0][2]*v[2],
                               M[1][0]*v[0]+M[1][1]*v[1]+M[1][2]*v[2],
                               M[2][0]*v[0]+M[2][1]*v[1]+M[2][2]*v[2] ]; }

// build 26 cubies
function makeCube(){
  const c=[];
  for(let x=-1;x<=1;x++) for(let y=-1;y<=1;y++) for(let z=-1;z<=1;z++){
    if(!x&&!y&&!z) continue;
    c.push({initPos:[x,y,z], pos:[x,y,z], R:I.map(r=>r.slice())});
  }
  return c;
}
function apply(cubies, mv){
  const def=FACES[mv.face], axis=def.axis, layer=def.layer;
  const Rot=rotMat(axis, mv.sign), ai=AXIS_IDX[axis];
  for(const c of cubies) if(c.pos[ai]===layer){
    c.pos=matVec(Rot,c.pos);
    c.R  =matMul(Rot,c.R);
  }
}
function isSolved(cubies){
  return cubies.every(c =>
    c.pos[0]===c.initPos[0] && c.pos[1]===c.initPos[1] && c.pos[2]===c.initPos[2] &&
    c.R[0][0]===I[0][0]&&c.R[1][1]===1&&c.R[2][2]===1 &&
    c.R[0][1]===0&&c.R[0][2]===0&&c.R[1][0]===0&&c.R[1][2]===0&&
    c.R[2][0]===0&&c.R[2][1]===0);
}
function eqMat(A,B){ for(let i=0;i<3;i++)for(let j=0;j<3;j++) if(A[i][j]!==B[i][j]) return false; return true; }
function isSolvedStrict(cubies){
  return cubies.every(c => c.pos.every((v,i)=>v===c.initPos[i]) && eqMat(c.R, I));
}

const names=Object.keys(FACES);
function randMove(prevAxis){
  let mv;
  do{ mv={face:names[(Math.random()*names.length)|0], sign:Math.random()<.5?1:-1}; }
  while(FACES[mv.face].axis===prevAxis);
  return mv;
}

let ok=0, fail=0;
const TRIALS=2000;
for(let t=0;t<TRIALS;t++){
  const cubies=makeCube();
  const hist=[];
  let prevAxis=null;
  const N=1+((Math.random()*30)|0);
  for(let i=0;i<N;i++){ const mv=randMove(prevAxis); prevAxis=FACES[mv.face].axis; hist.push(mv); apply(cubies,mv); }
  // solve = inverse in reverse
  while(hist.length){ const mv=hist.pop(); apply(cubies,{face:mv.face,sign:-mv.sign}); }
  if(isSolvedStrict(cubies)) ok++; else { fail++; if(fail<=3) console.log("FAIL trial",t); }
}
console.log(`scramble->solve restore: ${ok}/${TRIALS} ok, ${fail} failed`);

// extra: rotations keep state exact integers & positions in {-1,0,1}
let bad=0;
for(let t=0;t<500;t++){
  const cubies=makeCube(); let prevAxis=null;
  for(let i=0;i<40;i++){ const mv=randMove(prevAxis); prevAxis=FACES[mv.face].axis; apply(cubies,mv); }
  for(const c of cubies){
    if(!c.pos.every(v=>v===-1||v===0||v===1)) bad++;
    if(!c.R.flat().every(v=>v===-1||v===0||v===1)) bad++;
  }
}
console.log(`integer-state invariants violated: ${bad}`);
console.log(ok===TRIALS && bad===0 ? "ALL CHECKS PASSED ✓" : "CHECKS FAILED ✗");
process.exit(ok===TRIALS && bad===0 ? 0 : 1);
