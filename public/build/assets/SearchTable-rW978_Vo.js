import{j as a,a as x,r as i,y as p}from"./app-XR_pgjEk.js";import{T as g}from"./TextInput-d6esTCzC.js";function j({links:r,searchQuery:t="",paginate:s=10,url:n=""}){const l=t&&t!=="null"?t:"";return a.jsx("div",{className:"flex flex-wrap justify-center mt-8 space-x-2 px-5",children:r.map((e,o)=>a.jsx(x,{href:e.url?`${e.url}${e.url.includes("?")?"&":"?"}search=${l}&paginate=${s}&${n}`:"",className:e.active?"bg-[#F46700] text-white px-4 py-2 border border-[#F46700] rounded-md":"text-[#F46700] hover:bg-[#F46700] hover:text-white px-4 py-2 border rounded-md",dangerouslySetInnerHTML:{__html:e.label}},o))})}function v({className:r="",options:t=[],currentValue:s="",...n}){return a.jsx("select",{...n,defaultValue:s,className:"border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block  "+r,children:t.map((l,e)=>a.jsx("option",{value:l.value,children:l.label},e))})}const b=[{value:"10",label:"10"},{value:"25",label:"25"},{value:"50",label:"50"},{value:"100",label:"100"}];function y({filters:r,routes:t,paging:s,placeholder:n="Search...",className:l=""}){const[e,o]=i.useState(r.search||""),[c,h]=i.useState(null),m=u=>{const d=u.target.value;o(d),c&&clearTimeout(c),h(setTimeout(()=>{p.get(route(t,{search:d}),{},{preserveState:!0,preserveScroll:!0})},200))};return a.jsxs(a.Fragment,{children:[a.jsx("div",{className:l,children:a.jsx(g,{id:"search",className:"w-full mb-4 px-4 py-2 border rounded",value:e,onChange:m,autoComplete:"search",placeholder:n})}),s&&a.jsx(v,{onChange:u=>p.get(route(t),{paginate:u.target.value},{preserveState:!0}),currentValue:r.paginate,options:b})]})}export{j as P,y as S};
