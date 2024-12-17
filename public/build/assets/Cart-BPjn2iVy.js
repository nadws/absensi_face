import{j as t}from"./app-D_wm_7PJ.js";import{n as r}from"./numeral-Dt-834Eo.js";function h({cardItems:a,removeFromCards:n}){const l=e=>{e.target.onerror=null,e.target.src="/image/image.png"};return t.jsxs("div",{className:"overflow-hidden bg-white shadow-sm sm:rounded-lg mr-10 col-span-2",children:[t.jsxs("div",{className:"w-full max-w-2xl bg-white rounded-lg p-6 ",children:[t.jsx("h1",{className:"text-2xl font-semibold mb-4 font-mona",children:"Shopping Cart"}),t.jsx("div",{className:"h-96 overflow-y-scroll",children:a.length===0?t.jsxs(t.Fragment,{children:[t.jsx("hr",{className:"border-t border-gray-300"}),t.jsx("img",{src:"/logo/cart.png",className:"w-full h-full object-contain p-3 rounded",alt:""})]}):t.jsx("div",{className:"space-y-4 p-4",children:a.map(e=>t.jsxs("div",{className:"flex items-center border-b pb-4 ",children:[t.jsx("img",{src:`/image/${e.foto}`,alt:"Product Image",className:"w-20 h-20 object-cover rounded",onError:l}),t.jsxs("div",{className:"ml-4 flex-1",children:[t.jsx("h2",{className:"text-lg font-semibold font-mona",children:e.nama_produk}),t.jsxs("p",{className:"text-sm text-[#F46700] font-mona",children:["Rp.",r(e.harga).format("0,0")]})]}),t.jsxs("div",{className:"flex items-center space-x-2",children:[t.jsx("button",{className:"px-2 py-1 bg-gray-200 rounded",children:"-"}),t.jsx("span",{children:"1"}),t.jsx("button",{className:"px-2 py-1 bg-gray-200 rounded",children:"+"}),t.jsx("button",{className:"px-2 py-1 bg-red-400 rounded text-white",onClick:s=>{s.preventDefault(),n(e,s)},children:t.jsx("i",{className:"fa fa-trash"})})]})]},e.id))})})]}),t.jsxs("div",{className:"mt-6 border-t pt-4 bg-white  rounded-lg p-6",children:[t.jsx("table",{width:"100%",children:t.jsxs("thead",{children:[t.jsxs("tr",{children:[t.jsx("th",{className:"text-left font-mona",width:"70%",children:"Sub Total"}),t.jsx("th",{className:"text-right font-mona",width:"2%",children:"Rp"}),t.jsxs("th",{className:"text-right font-mona",width:"28%",children:["Rp.",r(a.reduce((e,s)=>e+s.harga,0)).format("0,0")]})]}),t.jsxs("tr",{children:[t.jsx("th",{className:"text-left font-thin text-sm font-mona",width:"70%",children:"Tax(10%)"}),t.jsx("th",{className:"text-right font-thin font-mona",width:"2%",children:"Rp"}),t.jsxs("th",{className:"text-right font-thin text-sm font-mona",width:"28%",children:["Rp.",r(a.reduce((e,s)=>e+s.harga*.1,0)).format("0,0")]})]}),t.jsx("tr",{children:t.jsx("th",{colSpan:3,className:"border-t pt-4 mt-2"})}),t.jsxs("tr",{children:[t.jsx("th",{className:"text-left font-mona",width:"70%",children:"Total"}),t.jsx("th",{className:"text-right font-mona",width:"2%",children:"Rp"}),t.jsxs("th",{className:"text-right font-mona",width:"28%",children:["Rp.",r(a.reduce((e,s)=>e+s.harga+s.harga*.1,0)).format("0,0")]})]})]})}),t.jsx("button",{className:"w-full mt-4 font-mona bg-[#F46700] text-white py-3 rounded-md hover:bg-[#f8b88a]",children:"Continue to Payment"})]})]})}export{h as default};
