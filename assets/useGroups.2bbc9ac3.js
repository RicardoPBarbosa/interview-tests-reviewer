import{u as f,f as G,h as r}from"./index.df05a218.js";function g(){const{groups:u,metrics:m,addItem:i,editItem:o,removeItem:s}=f(({groups:e,metrics:t,addItem:I,editItem:a,removeItem:c})=>({groups:e,metrics:t,addItem:I,editItem:a,removeItem:c}));function d(e){const t={id:G(),name:e};return i(r.GROUP,t),t.id}function n(e){o(r.GROUP,e)}function p(e){m.filter(t=>t.groupId===e).forEach(t=>o(r.METRIC,{...t,groupId:void 0})),s(r.GROUP,e)}return{groups:u,insertGroup:d,editGroup:n,removeGroup:p}}export{g as u};
