import{j as e,a as f}from"./app-C0pH-kjp.js";import{n as d}from"./numeral-BcIraJbz.js";function u({isOpen:i,toggleSidebar:x,cardItems:n,removeFromCards:r,updateQtyInLocalStorage:o,setCardItems:c,showSwal:h}){const m=t=>{t.target.onerror=null,t.target.src="/image/image.png"};return e.jsxs("div",{className:`fixed top-0 right-0 h-full w-80 bg-white  shadow-lg transform z-50 ${i?"translate-x-0":"translate-x-full"} transition-transform duration-300 ease-in-out`,children:[e.jsx("button",{onClick:x,className:"absolute top-3 right-4 text-[#F46700] text-2xl font-bold",children:e.jsx("i",{className:"fa-solid fa-xmark"})}),e.jsx("div",{className:"p-4",children:e.jsx("h2",{className:"text-xl font-bold",children:"Shopping Cart"})}),e.jsx("ul",{className:"mt-4",children:n.length===0?e.jsxs(e.Fragment,{children:[e.jsx("img",{src:"/logo/cart.png",className:"w-full h-full object-contain p-3 mt-28 rounded",alt:""}),e.jsx("h5",{className:"text-center font-mona",children:"Keranjang Kosong"})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"space-y-4 p-4 h-96 overflow-y-scroll",children:n.map(t=>e.jsxs("div",{className:"flex items-center border-b pb-4 ",children:[e.jsx("img",{src:`/image/${t.foto}`,alt:"Product Image",className:"w-10 h-10 object-cover rounded",onError:m}),e.jsxs("div",{className:"ml-4 flex-1",children:[e.jsx("h2",{className:"text-base font-semibold font-mona",children:t.nama_produk}),e.jsxs("p",{className:"text-sm text-[#F46700] font-mona",children:["Rp.",d(t.harga).format("0,0")]})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("button",{className:"px-2 py-1 bg-gray-200 rounded",onClick:s=>{s.preventDefault();const a=t.qty-1;if(a<=0)r(t,s);else{const l=o(t.id,a);c(l)}},children:"-"}),e.jsx("span",{children:t.qty}),e.jsx("button",{className:"px-2 py-1 bg-gray-200 rounded",onClick:s=>{s.preventDefault();const a=t.qty+1;if(a>t.stok)h();else{const l=o(t.id,a);c(l)}},children:"+"}),e.jsx("button",{className:"px-2 py-1 bg-red-400 rounded text-white",onClick:s=>{s.preventDefault(),r(t,s)},children:e.jsx("i",{className:"fa fa-trash"})})]})]},t.id))}),e.jsxs("div",{className:"mt-6 border-t pt-4 bg-white  rounded-lg p-6",children:[e.jsx("table",{width:"100%",children:e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-left font-mona",width:"70%",children:"Total"}),e.jsx("th",{className:"text-right font-mona",width:"2%",children:"Rp"}),e.jsxs("th",{className:"text-right font-mona",width:"28%",children:["Rp.",d(n.reduce((t,s)=>t+s.ttl_rp,0)).format("0,0")]})]})})}),e.jsx(f,{href:route("pos.payment"),className:"w-full mt-4 font-mona bg-[#F46700] text-white py-3 rounded-md hover:bg-[#f8b88a] text-center block",children:"Continue to Payment"})]})]})})]})}export{u as default};
