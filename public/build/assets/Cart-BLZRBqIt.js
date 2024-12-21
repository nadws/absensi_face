import{j as e,a as x}from"./app-Ct2QMwEp.js";import{n as c}from"./numeral-CF9V8mZJ.js";function f({cardItems:l,removeFromCards:r,updateQtyInLocalStorage:o,setCardItems:d,showSwal:i}){const h=s=>{s.target.onerror=null,s.target.src="/image/image.png"};return e.jsxs("div",{className:"overflow-hidden bg-white shadow-sm  mr-10 col-span-2 hidden lg:block",children:[e.jsxs("div",{className:"w-full max-w-2xl bg-white rounded-lg p-6 ",children:[e.jsx("h1",{className:"text-2xl font-semibold mb-4 font-mona",children:"Shopping Cart"}),e.jsx("div",{className:"h-96 overflow-y-scroll",children:l.length===0?e.jsxs(e.Fragment,{children:[e.jsx("hr",{className:"border-t border-gray-300"}),e.jsx("img",{src:"/logo/cart.png",className:"w-full h-full object-contain p-3 rounded",alt:""})]}):e.jsx("div",{className:"space-y-4 p-4",children:l.map(s=>e.jsxs("div",{className:"flex items-center border-b pb-4 ",children:[e.jsx("img",{src:`/image/${s.foto}`,alt:"Product Image",className:"w-20 h-20 object-cover rounded",onError:h}),e.jsxs("div",{className:"ml-4 flex-1",children:[e.jsx("h2",{className:"text-lg font-semibold font-mona",children:s.nama_produk}),e.jsxs("p",{className:"text-sm text-[#F46700] font-mona",children:["Rp.",c(s.harga).format("0,0")]})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("button",{className:"px-2 py-1 bg-gray-200 rounded",onClick:t=>{t.preventDefault();const a=s.qty-1;if(a<=0)r(s,t);else{const n=o(s.id,a);d(n)}},children:"-"}),e.jsx("span",{children:s.qty}),e.jsx("button",{className:"px-2 py-1 bg-gray-200 rounded",onClick:t=>{t.preventDefault();const a=s.qty+1;if(a>s.stok)i();else{const n=o(s.id,a);d(n)}},children:"+"}),e.jsx("button",{className:"px-2 py-1 bg-red-400 rounded text-white",onClick:t=>{t.preventDefault(),r(s,t)},children:e.jsx("i",{className:"fa fa-trash"})})]})]},s.id))})})]}),e.jsxs("div",{className:"mt-6 border-t pt-4 bg-white  rounded-lg p-6",children:[e.jsx("table",{width:"100%",children:e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-left font-mona",width:"70%",children:"Total"}),e.jsx("th",{className:"text-right font-mona",width:"2%",children:"Rp"}),e.jsx("th",{className:"text-right font-mona",width:"28%",children:c(l.reduce((s,t)=>s+t.ttl_rp,0)).format("0,0")})]})})}),e.jsx(x,{href:route("pos.payment"),className:"w-full mt-4 font-mona bg-[#F46700] text-white py-3 rounded-md hover:bg-[#f8b88a] text-center block",children:"Continue to Payment"})]})]})}export{f as default};