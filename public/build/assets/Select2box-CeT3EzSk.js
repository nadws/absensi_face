import{r as t,j as l}from"./app-CiIjs87f.js";function O({options:r=[],className:c="",onChange:f,currentValue:i,placeholder:h="Pilih salah satu...",...m}){const[n,x]=t.useState(""),[p,o]=t.useState(!1),[d,u]=t.useState(null),a=t.useRef(null);t.useEffect(()=>{const e=r.find(s=>s.value===i);u(e||null)},[i,r]),t.useEffect(()=>{const e=s=>{a.current&&!a.current.contains(s.target)&&o(!1)};return document.addEventListener("click",e),()=>{document.removeEventListener("click",e)}},[]);const g=()=>{o(!0)},v=r.filter(e=>e.label.toLowerCase().includes(n.toLowerCase())),b=e=>{u(e),f(e.value),o(!1)};return l.jsxs("div",{ref:a,className:`relative ${c}`,children:[l.jsx("input",{type:"text",value:d?d.label:n,onChange:e=>x(e.target.value),onFocus:g,placeholder:h,className:"border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1  "+c,...m}),p&&l.jsx("ul",{className:"absolute  mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-y-scroll max-h-48 z-50",children:(n===""?r:v).map((e,s)=>l.jsx("li",{onClick:()=>b(e),className:"cursor-pointer px-4 py-2 hover:bg-indigo-500 hover:text-white",children:e.label},s))})]})}export{O as S};
