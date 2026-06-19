import{v as Z,r as M,m as S,o as e,R as N}from"./index-Cl-C_3M9.js";function X(){const[a,r]=M.useState({width:window.innerWidth,height:window.innerHeight});return M.useEffect(()=>{const s=()=>r({width:window.innerWidth,height:window.innerHeight});return window.addEventListener("resize",s),()=>window.removeEventListener("resize",s)},[]),a}const R=`
  @keyframes pov-hit {
    0% { transform: translateY(0px) rotateX(0deg) scale(1); }
    30% { transform: translateY(-180px) rotateX(40deg) scale(0.9); }
    100% { transform: translateY(0px) rotateX(0deg) scale(1); }
  }
  @keyframes pov-hit-strong {
    0% { transform: translateY(0px) rotateX(0deg); }
    30% { transform: translateY(-280px) rotateX(60deg); }
    100% { transform: translateY(0px) rotateX(0deg); }
  }
  @keyframes pov-hit-micro {
    0% { transform: translateY(0px) rotateX(0deg); }
    30% { transform: translateY(-60px) rotateX(15deg); }
    100% { transform: translateY(0px) rotateX(0deg); }
  }
  @keyframes pov-hit-weak {
    0% { transform: translateY(0px) rotateX(0deg) scale(1); }
    30% { transform: translateY(-130px) rotateX(25deg) scale(0.95); }
    100% { transform: translateY(0px) rotateX(0deg) scale(1); }
  }
  @keyframes pov-cross-left {
    0% { transform: translateY(0px) rotateZ(0deg); }
    30% { transform: translateY(-150px) rotateZ(16deg); }
    100% { transform: translateY(0px) rotateZ(0deg); }
  }
  @keyframes pov-cross-right {
    0% { transform: translateY(0px) rotateZ(0deg); }
    30% { transform: translateY(-150px) rotateZ(-16deg); }
    100% { transform: translateY(0px) rotateZ(0deg); }
  }
  @keyframes pov-out-left {
    0% { transform: translateY(0px) rotateZ(0deg); }
    30% { transform: translateY(-100px) rotateZ(-16deg); }
    100% { transform: translateY(0px) rotateZ(0deg); }
  }
  @keyframes pov-out-right {
    0% { transform: translateY(0px) rotateZ(0deg); }
    30% { transform: translateY(-100px) rotateZ(16deg); }
    100% { transform: translateY(0px) rotateZ(0deg); }
  }
  @keyframes pov-shake {
    0%, 100% { transform: translateX(0) translateY(0) rotateZ(0deg); }
    25% { transform: translateX(-8px) translateY(-8px) rotateZ(0deg); }
    50% { transform: translateX(8px) translateY(8px) rotateZ(0deg); }
    75% { transform: translateX(-8px) translateY(8px) rotateZ(0deg); }
  }
  @keyframes halo-flash {
    0% { opacity: 0; transform: scale(0.6); }
    30% { opacity: 1; transform: scale(1.05); box-shadow: 0 0 100px rgba(255,255,255,1); }
    100% { opacity: 0; transform: scale(1.2); }
  }

  /* Easing nerveux avec rebond : cubic-bezier(0.1, 2.0, 0.3, 1) */
  .pov-anim-hit { animation: pov-hit 0.35s cubic-bezier(0.1, 2.0, 0.3, 1); }
  .pov-anim-hit-strong { animation: pov-hit-strong 0.35s cubic-bezier(0.1, 2.0, 0.3, 1); }
  .pov-anim-hit-micro { animation: pov-hit-micro 0.35s cubic-bezier(0.1, 2.0, 0.3, 1); }
  .pov-anim-hit-weak { animation: pov-hit-weak 0.35s cubic-bezier(0.1, 2.0, 0.3, 1); }
  
  /* Easing doux et long pour le Gonguê pour donner l'impression de revenir lentement */
  .pov-anim-gongue-hit-strong { animation: pov-hit-strong 0.5s cubic-bezier(0.1, 0.9, 0.2, 1); }
  .pov-anim-gongue-hit-micro { animation: pov-hit-micro 0.5s cubic-bezier(0.1, 0.9, 0.2, 1); }
  
  .pov-anim-cross-left { animation: pov-cross-left 0.4s cubic-bezier(0.1, 2.0, 0.3, 1); }
  .pov-anim-cross-right { animation: pov-cross-right 0.4s cubic-bezier(0.1, 2.0, 0.3, 1); }
  .pov-anim-out-left { animation: pov-out-left 0.4s cubic-bezier(0.1, 2.0, 0.3, 1); }
  .pov-anim-out-right { animation: pov-out-right 0.4s cubic-bezier(0.1, 2.0, 0.3, 1); }
  .pov-anim-shake { animation: pov-shake 0.1s infinite; }
  .pov-anim-fla-left { animation: pov-hit 0.35s cubic-bezier(0.1, 2.0, 0.3, 1); }
  .pov-anim-fla-right { animation: pov-hit 0.35s cubic-bezier(0.1, 2.0, 0.3, 1) 0.05s backwards; }
  .pov-anim-halo { animation: halo-flash 0.4s ease-out; }

  /* Animations pour le Mineiro */
  @keyframes pov-mineiro-push-strong {
    0% { transform: translate(0, 0) scale(1); }
    30% { transform: translate(0, -50px) scale(0.6); }
    100% { transform: translate(0, 0) scale(1); }
  }
  @keyframes pov-mineiro-push-weak {
    0% { transform: translate(0, 0) scale(1); }
    30% { transform: translate(0, -20px) scale(0.85); }
    100% { transform: translate(0, 0) scale(1); }
  }
  @keyframes pov-mineiro-pull-strong {
    0% { transform: translate(0, 0) scale(1); }
    30% { transform: translate(0, 50px) scale(1.6); }
    100% { transform: translate(0, 0) scale(1); }
  }
  @keyframes pov-mineiro-pull-weak {
    0% { transform: translate(0, 0) scale(1); }
    30% { transform: translate(0, 20px) scale(1.2); }
    100% { transform: translate(0, 0) scale(1); }
  }
  @keyframes pov-mineiro-left {
    0% { transform: translate(0, 0) scale(1); }
    30% { transform: translate(-200px, 0) scale(1); }
    100% { transform: translate(0, 0) scale(1); }
  }
  @keyframes pov-mineiro-shake {
    0%, 100% { transform: translate(0, 0) scale(1); }
    10%, 30%, 50%, 70%, 90% { transform: translate(-15px, 0) scale(1); }
    20%, 40%, 60%, 80% { transform: translate(15px, 0) scale(1); }
  }

  .pov-anim-mineiro-push-strong { animation: pov-mineiro-push-strong 0.35s cubic-bezier(0.2, 0.8, 0.4, 1); }
  .pov-anim-mineiro-push-weak { animation: pov-mineiro-push-weak 0.35s cubic-bezier(0.2, 0.8, 0.4, 1); }
  .pov-anim-mineiro-pull-strong { animation: pov-mineiro-pull-strong 0.35s cubic-bezier(0.2, 0.8, 0.4, 1); }
  .pov-anim-mineiro-pull-weak { animation: pov-mineiro-pull-weak 0.35s cubic-bezier(0.2, 0.8, 0.4, 1); }
  .pov-anim-mineiro-left { animation: pov-mineiro-left 0.35s cubic-bezier(0.2, 0.8, 0.4, 1); }
  .pov-anim-mineiro-shake { animation: pov-mineiro-shake 0.35s linear; }

  /* Animations pour l'Agbê (filet dynamique) */
  @keyframes pov-agbe-stretch-x-strong {
    0% { transform: scaleX(1); }
    30% { transform: scaleX(1.15); }
    100% { transform: scaleX(1); }
  }
  @keyframes pov-agbe-stretch-x-weak {
    0% { transform: scaleX(1); }
    30% { transform: scaleX(1.08); }
    100% { transform: scaleX(1); }
  }
  @keyframes pov-agbe-stretch-y-strong {
    0% { transform: scaleY(1); }
    30% { transform: scaleY(1.15); }
    100% { transform: scaleY(1); }
  }
  @keyframes pov-agbe-stretch-y-weak {
    0% { transform: scaleY(1); }
    30% { transform: scaleY(1.08); }
    100% { transform: scaleY(1); }
  }
  @keyframes pov-agbe-shake {
    0%, 100% { transform: translate(0, 0) scale(1); }
    10%, 30%, 50%, 70%, 90% { transform: translate(-10px, -5px) scale(0.98); }
    20%, 40%, 60%, 80% { transform: translate(10px, 5px) scale(1.02); }
  }

  .pov-anim-agbe-secoche-strong { animation: pov-agbe-stretch-y-strong 0.35s cubic-bezier(0.2, 0.8, 0.4, 1); }
  .pov-anim-agbe-secoche-weak { animation: pov-agbe-stretch-y-weak 0.35s cubic-bezier(0.2, 0.8, 0.4, 1); }
  .pov-anim-agbe-ventre-strong { animation: pov-agbe-stretch-y-strong 0.35s cubic-bezier(0.2, 0.8, 0.4, 1); }
  .pov-anim-agbe-ventre-weak { animation: pov-agbe-stretch-y-weak 0.35s cubic-bezier(0.2, 0.8, 0.4, 1); }

  .pov-anim-agbe-dos-strong { animation: pov-agbe-stretch-x-strong 0.35s cubic-bezier(0.2, 0.8, 0.4, 1); }
  .pov-anim-agbe-dos-weak { animation: pov-agbe-stretch-x-weak 0.35s cubic-bezier(0.2, 0.8, 0.4, 1); }
  .pov-anim-agbe-haut-strong { animation: pov-agbe-stretch-x-strong 0.35s cubic-bezier(0.2, 0.8, 0.4, 1); }
  .pov-anim-agbe-haut-weak { animation: pov-agbe-stretch-x-weak 0.35s cubic-bezier(0.2, 0.8, 0.4, 1); }

  .pov-anim-agbe-shake { animation: pov-agbe-shake 0.35s linear; }
`,W=()=>{const[a,r]=M.useState({x:0,y:0});return M.useEffect(()=>{let s,b=-1,v=-1;const w=()=>{const o=document.getElementById("circle-sequencer-panel");if(o){const h=o.getBoundingClientRect(),f=h.left+h.width/2,u=h.top+h.height/2;Math.min(h.width,h.height)/2;const y=f,t=u+20;(Math.abs(y-b)>1||Math.abs(t-v)>1)&&(b=y,v=t,r({x:y,y:t}))}s=requestAnimationFrame(w)};return w(),()=>{cancelAnimationFrame(s)}},[]),a},T=({xOffset:a,target:r,children:s})=>{const{width:b,height:v}=X(),w=b/2+a,o=v+350,h=r.x-w,f=r.y-o,u=Math.atan2(f,h)*(180/Math.PI)+90,y=Math.hypot(h,f);return e.jsx("div",{className:"absolute flex justify-center items-end pointer-events-none",style:{left:w,bottom:"-350px",width:"400px",height:`${y}px`,transform:`translateX(-50%) rotate(${u}deg)`,transformOrigin:"bottom center",zIndex:10},children:N.cloneElement(s,{style:{height:"100%",width:"100%"}})})},C=({target:a,children:r})=>{const{width:s}=X();return e.jsx("div",{className:"absolute flex justify-center items-center pointer-events-none w-[220px] h-[48px] min-[400px]:w-[380px] min-[400px]:h-[80px] sm:w-[550px] sm:h-[120px]",style:{left:a.x,top:a.y-(s<400?50:s<640?80:120),transform:"translate(-50%, -50%)",zIndex:10},children:r})},L=({animClass:a,hitTime:r,style:s})=>e.jsxs("svg",{className:`drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] w-full h-full ${a}`,style:s,viewBox:"0 0 600 120",preserveAspectRatio:"xMidYMid meet",children:[e.jsx("rect",{x:"20",y:"10",width:"560",height:"100",fill:"#B0BEC5",rx:"10"}),e.jsx("rect",{x:"20",y:"30",width:"560",height:"20",fill:"#FFFFFF",opacity:"0.7",rx:"5"}),e.jsx("line",{x1:"20",y1:"20",x2:"580",y2:"20",stroke:"#78909C",strokeWidth:"2",opacity:"0.5"}),e.jsx("line",{x1:"20",y1:"50",x2:"580",y2:"50",stroke:"#78909C",strokeWidth:"2",opacity:"0.5"}),e.jsx("line",{x1:"20",y1:"70",x2:"580",y2:"70",stroke:"#78909C",strokeWidth:"2",opacity:"0.5"}),e.jsx("line",{x1:"20",y1:"90",x2:"580",y2:"90",stroke:"#78909C",strokeWidth:"2",opacity:"0.5"}),e.jsx("rect",{x:"10",y:"5",width:"20",height:"110",fill:"#455A64",rx:"5"}),e.jsx("rect",{x:"570",y:"5",width:"20",height:"110",fill:"#455A64",rx:"5"})]},r),I=({animClass:a,hitTime:r,target:s})=>{const o=[],h=[],f=[];for(let n=0;n<=80;n++){const m=n/80*Math.PI*2,x=(n+.5)/80*Math.PI*2;if(o.push(`${n===0?"M":"L"} ${500+Math.cos(m)*420} ${500+Math.sin(m)*420}`),o.push(`L ${500+Math.cos(x)*480} ${500+Math.sin(x)*480}`),h.push(`${n===0?"M":"L"} ${500+Math.cos(m)*480} ${500+Math.sin(m)*480}`),h.push(`L ${500+Math.cos(x)*420} ${500+Math.sin(x)*420}`),n<80){f.push({cx:500+Math.cos(x)*480,cy:500+Math.sin(x)*480,r:8}),f.push({cx:500+Math.cos(m)*420,cy:500+Math.sin(m)*420,r:8});const j=(n+.25)/80*Math.PI*2;f.push({cx:500+Math.cos(j)*450,cy:500+Math.sin(j)*450,r:10});const k=(n+.75)/80*Math.PI*2;f.push({cx:500+Math.cos(k)*450,cy:500+Math.sin(k)*450,r:10})}}const u=()=>e.jsxs(e.Fragment,{children:[e.jsx("path",{d:o.join(" "),fill:"none",stroke:"#f4ecd8",strokeWidth:"4"}),e.jsx("path",{d:h.join(" "),fill:"none",stroke:"#f4ecd8",strokeWidth:"4"}),f.map((n,m)=>e.jsx("circle",{cx:n.cx,cy:n.cy,r:n.r,fill:"#ea580c"},m))]}),y=a.includes("shake"),t=a.includes("dos")||a.includes("haut"),d=a.includes("secoche")||a.includes("ventre"),A=a.includes("haut")?a:"",l=a.includes("dos")?a:"",c=a.includes("secoche")?a:"",p=a.includes("ventre")?a:"";return e.jsx("div",{className:"absolute w-[240px] h-[240px] min-[400px]:w-[500px] min-[400px]:h-[500px] sm:w-[800px] sm:h-[800px] pointer-events-none z-10",style:{left:s.x,top:s.y,transform:"translate(-50%, -50%)"},children:e.jsxs("svg",{viewBox:"0 0 1000 1000",className:`w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] opacity-90 ${y?a:""}`,children:[y&&u(),t&&e.jsxs(e.Fragment,{children:[e.jsx("g",{className:`origin-[500px_500px] ${A}`,style:{clipPath:"polygon(0 0, 50% 0, 50% 100%, 0 100%)"},children:u()}),e.jsx("g",{className:`origin-[500px_500px] ${l}`,style:{clipPath:"polygon(50% 0, 100% 0, 100% 100%, 50% 100%)"},children:u()})]}),d&&e.jsxs(e.Fragment,{children:[e.jsx("g",{className:`origin-[500px_500px] ${c}`,style:{clipPath:"polygon(0 0, 100% 0, 100% 50%, 0 50%)"},children:u()}),e.jsx("g",{className:`origin-[500px_500px] ${p}`,style:{clipPath:"polygon(0 50%, 100% 50%, 100% 100%, 0 100%)"},children:u()})]}),!y&&!t&&!d&&u()]})},r)},F=({animClass:a,hitTime:r,style:s})=>e.jsxs("svg",{className:`drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] origin-bottom ${a}`,style:s,viewBox:"0 0 100 800",preserveAspectRatio:"xMidYMin meet",children:[e.jsx("rect",{x:"25",y:"45",width:"50",height:"755",fill:"#7A3B12",rx:"20"}),e.jsx("circle",{cx:"50",cy:"45",r:"45",fill:"#D2B48C",stroke:"#5C3A21",strokeWidth:"4"}),e.jsx("line",{x1:"40",y1:"90",x2:"40",y2:"800",stroke:"#5C3A21",strokeWidth:"4",strokeDasharray:"30 20",opacity:"0.4"}),e.jsx("line",{x1:"60",y1:"120",x2:"60",y2:"800",stroke:"#5C3A21",strokeWidth:"2",strokeDasharray:"15 25",opacity:"0.3"})]},r),_=({animClass:a,hitTime:r,style:s})=>e.jsxs("svg",{className:`drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] origin-bottom ${a}`,style:s,viewBox:"0 0 100 800",preserveAspectRatio:"xMidYMin meet",children:[e.jsx("rect",{x:"25",y:"0",width:"50",height:"800",fill:"#DEB887",rx:"10"}),e.jsx("line",{x1:"40",y1:"0",x2:"40",y2:"800",stroke:"#8B4513",strokeWidth:"4",strokeDasharray:"35 15",opacity:"0.3"}),e.jsx("line",{x1:"60",y1:"20",x2:"60",y2:"800",stroke:"#8B4513",strokeWidth:"2",strokeDasharray:"20 20",opacity:"0.2"})]},r),P=({animClass:a,hitTime:r,style:s})=>e.jsxs("svg",{className:`drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] origin-bottom ${a}`,style:s,viewBox:"0 0 100 800",preserveAspectRatio:"xMidYMin meet",children:[e.jsx("rect",{x:"35",y:"20",width:"30",height:"780",fill:"#E6C280",rx:"15"}),e.jsx("rect",{x:"55",y:"20",width:"10",height:"780",fill:"#C49B5A",rx:"5"}),e.jsx("path",{d:"M40 100 Q45 150 40 200 T45 300 T38 400 T42 500 T38 600 T45 700",stroke:"#C49B5A",strokeWidth:"2",fill:"none",opacity:"0.6"}),e.jsx("path",{d:"M50 50 Q55 120 48 180 T52 280 T48 380 T55 480 T49 580 T52 750",stroke:"#D9AE6B",strokeWidth:"2",fill:"none",opacity:"0.5"}),e.jsx("circle",{cx:"50",cy:"20",r:"20",fill:"#E6C280"}),e.jsx("path",{d:"M64 6 A 20 20 0 0 1 50 40 A 20 20 0 0 0 64 6",fill:"#C49B5A"})]},r),D=({animClass:a,hitTime:r,style:s})=>e.jsxs("svg",{className:`drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] origin-bottom ${a}`,style:s,viewBox:"0 0 100 800",preserveAspectRatio:"xMidYMin meet",children:[e.jsx("rect",{x:"30",y:"0",width:"40",height:"800",fill:"#F8F9FA",rx:"4"}),e.jsx("rect",{x:"38",y:"0",width:"10",height:"800",fill:"#FFFFFF",rx:"2"})]},r),$=({show:a,hitTime:r,target:s,yOffset:b=0})=>a?e.jsx("div",{className:"absolute pointer-events-none pov-anim-halo opacity-0",style:{left:s.x,top:s.y+b,transform:"translate(-50%, -50%)",zIndex:5},children:e.jsx("div",{className:"w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border-[8px] border-[#f4ecd8] shadow-[0_0_80px_rgba(255,255,255,1)]"})},r):null,H=()=>{const{activeAoVivoTrackId:a,tracks:r,isLeftHanded:s,activeVariationsRef:b}=Z(),[v,w]=M.useState(null),o=W(),{width:h}=X(),f=M.useRef(-1);if(M.useEffect(()=>{if(a===null)return;const l=r.find(p=>p.id===a);if(!l)return;const c=p=>{const n=p,{step:m,measure:x,maxTicks:j,ratio:k=m/j}=n.detail;if(m<0){f.current=-1,w(null);return}const Y=l.patterns.find(i=>i.measureAssignments[x]);if(!Y){f.current=-1;return}const z=Math.floor(k*Y.steps);if(z!==f.current&&(f.current=z,!l.isMute)){const g=((b==null?void 0:b.current[l.id])||Y.activeSteps)[z];g!==void 0&&g!==0&&g!=="0"&&g!==""&&w({stroke:String(g),time:Date.now()})}};return window.addEventListener("o-girador-tick",c),()=>window.removeEventListener("o-girador-tick",c)},[a,r]),a===null)return null;const u=r.find(l=>l.id===a);if(!u)return null;const y=S[u.instrumentIdx];if(!y)return null;const t=(v==null?void 0:v.stroke)||"",d=(v==null?void 0:v.time)||0,A=()=>{let l="",c="",p="",n="",m=!1,x=0;const j=t==="b"||t==="B";j&&(l="pov-anim-shake",c="pov-anim-shake");const k=Math.min(h*.45,550),Y={x:o.x-160,y:o.y},z={x:o.x+160,y:o.y};switch(y.id){case"marcante":case"meiao":case"repique":return j||(t==="D"?l="pov-anim-hit-strong":t==="d"?l="pov-anim-hit":t==="E"?c="pov-anim-hit-strong":t==="e"?c="pov-anim-hit":t==="i"||t==="I"?c="pov-anim-hit-weak":t==="x"||t==="X"?(p="pov-anim-out-left",n="pov-anim-out-right",m=!0,x=-100):t==="c"||t==="C"?(p="pov-anim-cross-left",n="pov-anim-cross-right",m=!0,x=-150):t&&(l="pov-anim-hit",c="pov-anim-hit")),p||(p=s?l:c),n||(n=s?c:l),e.jsxs(e.Fragment,{children:[e.jsx($,{show:m,hitTime:d,target:o,yOffset:x}),e.jsx(T,{xOffset:-k,target:Y,children:s?e.jsx(F,{animClass:p,hitTime:d}):e.jsx(_,{animClass:p,hitTime:d})}),e.jsx(T,{xOffset:k,target:z,children:s?e.jsx(_,{animClass:n,hitTime:d}):e.jsx(F,{animClass:n,hitTime:d})})]});case"caixa":case"tarol":return j||(t==="D"?l="pov-anim-hit":t==="d"?l="pov-anim-hit-micro":t==="E"?c="pov-anim-hit":t==="e"?c="pov-anim-hit-micro":t==="R"?l="pov-anim-shake":t==="r"?c="pov-anim-shake":t==="f"||t==="F"?(c="pov-anim-fla-left",l="pov-anim-fla-right"):t==="x"||t==="X"?(p="pov-anim-out-left",n="pov-anim-out-right",m=!0,x=-100):t==="c"||t==="C"?(p="pov-anim-cross-left",n="pov-anim-cross-right",m=!0,x=-150):t&&(l="pov-anim-hit-micro",c="pov-anim-hit-micro")),p||(p=s?l:c),n||(n=s?c:l),e.jsxs(e.Fragment,{children:[e.jsx($,{show:m,hitTime:d,target:o,yOffset:x}),e.jsx(T,{xOffset:-k,target:Y,children:e.jsx(P,{animClass:p,hitTime:d})}),e.jsx(T,{xOffset:k,target:z,children:e.jsx(P,{animClass:n,hitTime:d})})]});case"mineiro":{let i="";return t==="P"?i="pov-anim-mineiro-push-strong":t==="p"?i="pov-anim-mineiro-push-weak":t==="T"?i="pov-anim-mineiro-pull-strong":t==="t"?i="pov-anim-mineiro-pull-weak":t==="L"||t==="l"?i="pov-anim-mineiro-left":t==="B"||t==="b"?i="pov-anim-mineiro-shake":t&&(i="pov-anim-mineiro-push-weak"),e.jsx(C,{target:o,children:e.jsx(L,{animClass:i,hitTime:d})})}case"agbe":{let i="";return t==="S"?i="pov-anim-agbe-secoche-strong":t==="s"?i="pov-anim-agbe-secoche-weak":t==="D"?i="pov-anim-agbe-dos-strong":t==="d"?i="pov-anim-agbe-dos-weak":t==="E"?i="pov-anim-agbe-haut-strong":t==="e"?i="pov-anim-agbe-haut-weak":t==="V"?i="pov-anim-agbe-ventre-strong":t==="v"?i="pov-anim-agbe-ventre-weak":t==="B"||t==="b"?i="pov-anim-agbe-shake":t&&(i="pov-anim-agbe-secoche-weak"),e.jsx(I,{animClass:i,hitTime:d,target:o})}case"gongue":{let i="",g={x:o.x,y:o.y};t==="b"||t==="B"?(i="pov-anim-shake",g.y=o.y-30):t==="G"?(i="pov-anim-gongue-hit-strong",g.y=o.y-200):t==="g"?(i="pov-anim-gongue-hit-micro",g.y=o.y-200):t==="A"?(i="pov-anim-gongue-hit-strong",g.y=o.y+120):t==="a"?(i="pov-anim-gongue-hit-micro",g.y=o.y+120):t&&(i="pov-anim-gongue-hit-micro",g.y=o.y-30);const B=s?-k:k;return g.x=o.x+B*.4,e.jsx(T,{xOffset:B,target:g,children:e.jsx(D,{animClass:i,hitTime:d})})}default:return null}};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:R}),e.jsx("div",{className:"absolute inset-0 z-[10] overflow-hidden pointer-events-none perspective-[1000px]",children:A()})]})};export{H as AoVivoOverlay};
