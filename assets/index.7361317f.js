const d="No group";function a(o,e){return[...o.sort((r,c)=>r.name.localeCompare(c.name)).map(r=>({groupName:r.name,metrics:e.filter(c=>c.groupId===r.id)})),{groupName:d,metrics:e.filter(r=>!r.groupId)}]}function t(o,e){return new Date(e.updatedAt).getTime()-new Date(o.updatedAt).getTime()}function n(o){switch(o){case 1:return{backgroundColor:"#fda4af",color:"#be123c",borderColor:"#be123c"};case 2:return{backgroundColor:"#f9a8d4",color:"#be185d",borderColor:"#be185d"};case 3:return{backgroundColor:"#c4b5fd",color:"#6d28d9",borderColor:"#6d28d9"};case 4:return{backgroundColor:"#fdba74",color:"#c2410c",borderColor:"#c2410c"};case 5:return{backgroundColor:"#fde047",color:"#a16207",borderColor:"#a16207"};case 6:return{backgroundColor:"#93c5fd",color:"#1d4ed8",borderColor:"#1d4ed8"};case 7:return{backgroundColor:"#67e8f9",color:"#0e7490",borderColor:"#0e7490"};case 8:return{backgroundColor:"#bef264",color:"#4d7c0f",borderColor:"#4d7c0f"};case 9:return{backgroundColor:"#86efac",color:"#15803d",borderColor:"#15803d"};case 10:return{backgroundColor:"#6ee7b7",color:"#047857",borderColor:"#047857"};default:return{}}}function l(o){const e=new Blob([JSON.stringify(o,null,2)],{type:"application/json"});return(window.URL||window.webkitURL).createObjectURL(e)}export{a,l as b,n as g,t as s};