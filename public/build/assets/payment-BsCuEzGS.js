import{r as a,j as e,Y as c}from"./app-XR_pgjEk.js";import"./Dropdown-608JCDQq.js";import"./TextInput-d6esTCzC.js";import{n as d}from"./numeral-ChZ2u864.js";import"./transition-BhjAJ0jM.js";function g({no_invoice:r}){const[t,o]=a.useState([]);a.useEffect(()=>{const s=localStorage.getItem("cardItems");if(s){const n=JSON.parse(s);o(n)}},[]);const m=s=>{s.target.onerror=null,s.target.src="/image/image.png"};return e.jsxs("div",{className:"bg-[#F8F8F8] py-40 px-80 h-screen",children:[e.jsx(c,{title:"POS Payment"}),e.jsxs("div",{className:"w-3/4",children:[e.jsx("div",{className:"border border-gray-500 p-7 rounded-md",children:e.jsxs("h5",{className:"font-mona font-bold text-gray-700",children:["Payment",e.jsxs("span",{className:"float-right",children:["#",r]})]})}),e.jsx("div",{className:"space-y-4 p-4",children:t.map(s=>e.jsxs("div",{className:"flex items-center border-b pb-4 ",children:[e.jsx("img",{src:`/image/${s.foto}`,alt:"Product Image",className:"w-20 h-20 object-cover rounded",onError:m}),e.jsxs("div",{className:"ml-4 flex-1",children:[e.jsx("h2",{className:"text-lg font-semibold font-mona",children:s.nama_produk}),e.jsxs("p",{className:"text-sm text-[#F46700] font-mona",children:["Rp.",d(s.harga).format("0,0")]})]})]},s.id))})]})]})}export{g as default};
