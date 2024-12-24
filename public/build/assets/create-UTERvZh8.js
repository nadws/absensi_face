import{W as k,r as f,j as e,Y as N,a as b}from"./app-CiIjs87f.js";import{A as w}from"./AuthenticatedLayout-CYWgaMy9.js";import{I as t}from"./InputError-BTQr0I49.js";import{I as o}from"./InputLabel-CHk8Hkm1.js";import{P as C}from"./PrimaryButton-BqPydoo4.js";import{T as l}from"./TextInput-C_3tdyaD.js";import{S as _}from"./Select2box-CeT3EzSk.js";import{S as y}from"./SecondaryButton-D217Hqms.js";import{z as F}from"./transition-DMHq376H.js";import"./ApplicationLogo-teLAV2Ub.js";import"./Dropdown-Bdj_O1g3.js";function z({auth:c,kd_produk:u,kategori:n}){const{data:i,setData:s,post:h,errors:r,processing:x,recentlySuccessful:g}=k({nama_produk:"",kd_produk:u,kategori:"",harga:"",harga_beli:"",stok:"",foto:"image.png"}),p=a=>{a.preventDefault(),h(route("products.store"),{preserveScroll:!0,onSuccess:()=>{alert("Product new Created")},onError:m=>{alert("Product not created")}})},[d,j]=f.useState(null),v=a=>{const m=a.target.files[0];m&&(j(URL.createObjectURL(m)),s("foto",m))};return e.jsxs(w,{user:c.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Create"}),children:[e.jsx(N,{title:"Produk"}),e.jsx("div",{className:"py-12 w-full ",children:e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e.jsx("div",{className:"bg-white overflow-hidden shadow-sm h-screen",children:e.jsx("div",{className:"p-6 text-gray-900",children:e.jsxs("section",{className:"",children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Create Products"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Create a new products."})]}),e.jsxs("form",{onSubmit:p,className:"mt-6 grid grid-cols-2 gap-4  ",children:[e.jsxs("div",{className:"col-span-2",children:[e.jsx(o,{htmlFor:"foto",value:"foto"}),d===null?e.jsx("div",{className:"mt-4",children:e.jsx("img",{src:"/image/image.png",alt:"Preview",className:"w-32 h-32 mb-4 object-cover rounded"})}):e.jsx("div",{className:"mt-4",children:e.jsx("img",{src:d,alt:"Preview",className:"w-32 h-32 mb-4 object-cover rounded"})}),e.jsx(l,{id:"foto",type:"file",className:"mt-5 block w-full",onChange:v,isFocused:!0,autoComplete:"foto"}),e.jsx(t,{className:"mt-2",message:r.foto})]}),e.jsxs("div",{children:[e.jsx(o,{htmlFor:"kd_produk",value:"Kode Produk"}),e.jsx(l,{id:"kd_produk",className:"mt-1 block w-full",value:i.kd_produk,onChange:a=>s("kd_produk",a.target.value),required:!0,isFocused:!0,autoComplete:"kd_produk",readOnly:!0}),e.jsx(t,{className:"mt-2",message:r.kd_produk})]}),e.jsxs("div",{children:[e.jsx(o,{htmlFor:"nama_produk",value:"Nama Produk"}),e.jsx(l,{id:"nama_produk",className:"mt-1 block w-full",value:i.nama_produk,onChange:a=>s("nama_produk",a.target.value),required:!0,isFocused:!0,autoComplete:"nama_produk"}),e.jsx(t,{className:"mt-2",message:r.nama_produk})]}),e.jsxs("div",{children:[e.jsx(o,{htmlFor:"harga_beli",value:"Harga Beli"}),e.jsx(l,{id:"harga_beli",type:"number",className:"mt-1 block w-full",value:i.harga_beli,onChange:a=>s("harga_beli",a.target.value),required:!0,autoComplete:"harga_beli"}),e.jsx(t,{className:"mt-2",message:r.harga_beli})]}),e.jsxs("div",{children:[e.jsx(o,{htmlFor:"harga",value:"Harga Jual"}),e.jsx(l,{id:"harga",type:"number",className:"mt-1 block w-full",value:i.harga,onChange:a=>s("harga",a.target.value),required:!0,autoComplete:"harga"}),e.jsx(t,{className:"mt-2",message:r.harga})]}),e.jsxs("div",{children:[e.jsx(o,{htmlFor:"kategori",value:"Kategori"}),e.jsx(_,{onChange:a=>s("kategori",a),id:"kategori",currentValue:"kategori",options:n,className:"w-full",placeholder:"Pilih Kategori ..."}),e.jsx(t,{className:"mt-2",message:r.kategori})]}),e.jsxs("div",{children:[e.jsx(o,{htmlFor:"stok",value:"Stok"}),e.jsx(l,{id:"stok",value:i.stok,onChange:a=>s("stok",a.target.value),type:"number",className:"mt-1 block w-full",autoComplete:"stok"}),e.jsx(t,{message:r.stok,className:"mt-2"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(C,{disabled:x,children:"Save"}),e.jsx(b,{rel:"stylesheet",href:route("products"),children:e.jsx(y,{children:"Cancel"})}),e.jsx(F,{show:g,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:e.jsx("p",{className:"text-sm text-gray-600",children:"Saved."})})]})]})]})})})})})]})}export{z as default};
