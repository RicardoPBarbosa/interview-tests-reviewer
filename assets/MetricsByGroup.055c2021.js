import{d as E,r as t,j as d,a,e as N,_ as f}from"./index.df05a218.js";import{a as y}from"./index.7361317f.js";import{u as G}from"./useGroups.2bbc9ac3.js";const R=t.exports.lazy(()=>f(()=>import("./MetricItem.02a0b208.js"),["assets/MetricItem.02a0b208.js","assets/index.7361317f.js","assets/index.df05a218.js","assets/index.263e92b2.css"])),S=t.exports.lazy(()=>f(()=>import("./FinalScore.1915c0e1.js"),["assets/FinalScore.1915c0e1.js","assets/MetricItem.02a0b208.js","assets/index.7361317f.js","assets/index.df05a218.js","assets/index.263e92b2.css"])),c="Erased metrics";function j({finalScore:m,setFinalScore:g,candidateMetrics:s,setCandidateMetrics:u}){const{groups:i}=G(),{metrics:n}=E(),x=t.exports.useMemo(()=>y(i,n),[i,n]),_=s.filter(e=>!n.find(r=>r.id===e.id)),h=s.length?s.reduce((e,r)=>e+(r.value||0),0)/s.length:0;function v(e,r){const l=s.find(o=>o.id===e.id);u(l?o=>o.map(p=>p.id===e.id?{...p,value:r}:p):o=>[...o,{...e,value:r}])}return d("div",{className:"flex flex-col gap-5",children:[[...x,{groupName:c,metrics:_}].map(e=>!!e.metrics.length&&d("div",{className:"flex flex-col gap-2",children:[a("h2",{className:`font-medium bg-slate-200 py-2 px-3 rounded-md${e.groupName===c?" bg-red-100":""}`,children:e.groupName}),a("div",{className:"flex flex-col gap-4 px-3 pt-2",children:e.metrics.map(r=>{var l;return a(t.exports.Suspense,{fallback:a(N,{}),children:a(R,{metric:r,onChange:v,value:(l=s.find(o=>o.id===r.id))==null?void 0:l.value})},r.id)})})]},e.groupName)),a(S,{average:Math.round(h),finalScore:m,setFinalScore:g})]})}export{j as default};