import{W as c,j as e,Y as d,a as x}from"./app-B4Ukg5N5.js";import{A as p}from"./AuthenticatedLayout-DvSSbvKk.js";import{I as u}from"./InputError-CHLpTAny.js";import{I as h}from"./InputLabel-CaE_ILmH.js";import{P as j}from"./PrimaryButton-Dd1WpMyz.js";import{T as g}from"./TextInput-1KVYgPtR.js";import{S as f}from"./SecondaryButton-CfRIIcuX.js";import{z as v}from"./transition-QjNedhhF.js";import"./ApplicationLogo-CaCHNWwF.js";import"./index-DMIup_xY.js";function P({auth:s}){const{data:r,setData:a,post:i,errors:l,processing:o,recentlySuccessful:m}=c({pemilik:""}),n=t=>{t.preventDefault(),i(route("pemilik.store"),{preserveScroll:!0,onSuccess:()=>{alert("Kategori Created")},onError:y=>{alert("Kategori not created")}})};return e.jsxs(p,{user:s.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Create"}),children:[e.jsx(d,{title:"Users"}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e.jsx("div",{className:"bg-white overflow-hidden shadow-sm",children:e.jsx("div",{className:"p-6 text-gray-900",children:e.jsxs("section",{className:"max-w-xl",children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Create Kategori"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Create a new Kategori."})]}),e.jsxs("form",{onSubmit:n,className:"mt-6 space-y-6",children:[e.jsxs("div",{children:[e.jsx(h,{htmlFor:"kategori",value:"Kategori"}),e.jsx(g,{id:"pemilik",className:"mt-1 block w-full",value:r.pemilik,onChange:t=>a("pemilik",t.target.value),required:!0,isFocused:!0,autoComplete:"pemilik"}),e.jsx(u,{className:"mt-2",message:l.pemilik})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(j,{disabled:o,children:"Save"}),e.jsx(x,{rel:"stylesheet",href:route("pemilik"),children:e.jsx(f,{children:"Cancel"})}),e.jsx(v,{show:m,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:e.jsx("p",{className:"text-sm text-gray-600",children:"Saved."})})]})]})]})})})})})]})}export{P as default};
