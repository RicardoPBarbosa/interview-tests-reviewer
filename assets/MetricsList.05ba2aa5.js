import{d as m,r as f,a as o,j as a,i as y}from"./index.08c1560b.js";import{a as C}from"./index.7361317f.js";import{u as x}from"./useGroups.3a0e1dea.js";import{C as G}from"./CrudActionButtons.94322444.js";const p="no-group";function w({groupedMetrics:s}){const{groups:r}=x(),{editMetric:n,removeMetric:l}=m(),[i,u]=f.exports.useState();function g({metric:t}){const c=(i==null?void 0:i.id)===t.id;async function h(e){await y("Are you sure you want to delete this metric?")&&l(e)}function v(e){if(e===p)return n({...t,groupId:void 0});n({...t,groupId:e})}const N=c?o("input",{type:"text",placeholder:"Group name",value:i.name,onChange:({target:{value:e}})=>u(d=>d&&{...d,name:e}),autoFocus:!0}):o("span",{className:"flex-1 px-3",children:t.name});return a("div",{className:"flex gap-2 items-center justify-between",children:[N,a("div",{className:"flex items-center gap-2 py-2 pr-2",children:[!c&&a("select",{className:"rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 outline-none text-sm",defaultValue:"",onChange:({target:{value:e}})=>v(e),children:[o("option",{value:"",disabled:!0,children:"swap group"}),r.filter(e=>e.id!==t.groupId).map(e=>o("option",{value:e.id,children:e.name},e.id)),!!t.groupId&&o("option",{value:p,children:"No group"})]}),o(G,{isEditing:c,onSubmitEdit:()=>{c&&(n(i),u(void 0))},onCancelEdit:()=>u(void 0),onSetEditing:()=>u(t),onRequestDelete:()=>h(t.id)})]})]})}return a("div",{className:"flex flex-col gap-1 max-w-4xl w-full mx-auto",children:[o("h2",{className:"font-medium bg-slate-200 py-1 px-3 rounded-md",children:s.groupName}),a("div",{className:"flex flex-col gap-1 divide-y",children:[s.metrics.map(t=>o(g,{metric:t},t.id)),!s.metrics.length&&o("p",{className:"flex-1 p-3 text-slate-500",children:"No metrics for this group"})]})]})}function I(){const{groups:s}=x(),{metrics:r}=m(),n=f.exports.useMemo(()=>C(s,r),[s,r]);return o("div",{className:"flex flex-col gap-2 pb-4",children:n.map(l=>o(w,{groupedMetrics:l},l.groupName))})}export{I as default};