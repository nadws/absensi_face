import{j as e,Y as d,a as r}from"./app-CiIjs87f.js";import{S as p,P as x}from"./SearchTable-C7BBGOt3.js";import{A as m}from"./AuthenticatedLayout-CYWgaMy9.js";import{T as h}from"./Table-eXlZJbup.js";import"./TextInput-C_3tdyaD.js";import"./ApplicationLogo-teLAV2Ub.js";import"./Dropdown-Bdj_O1g3.js";import"./transition-DMHq376H.js";function v({auth:t,users:s,filters:a}){return e.jsxs(m,{user:t.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Users"}),children:[e.jsx(d,{title:"Users"}),e.jsx("div",{className:"py-12",children:e.jsxs("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:[e.jsxs("div",{className:"flex justify-between items-center mb-2",children:[e.jsxs("label",{className:"font-bold",children:["Total Data User : ",s.total]}),e.jsx(r,{href:route("users.create"),className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",children:"Create User"})]}),e.jsx("div",{className:"bg-white overflow-hidden shadow-sm",children:e.jsxs("div",{className:"p-6 text-gray-900",children:[e.jsx(p,{filters:a,routes:"users",paging:"Y"}),e.jsx(h,{columns:["#","Name","Email","Role","Action"],rows:s.data,renderRow:({id:i,name:n,email:o,role:l},c)=>e.jsxs(e.Fragment,{children:[e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:(s.current_page-1)*s.per_page+c+1}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:n}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:o}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:l}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:e.jsx(r,{className:"inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150",href:route("users.edit",i),children:e.jsx("i",{className:"fa-solid fa-pen-to-square"})})})]})}),e.jsx(x,{links:s.links,searchQuery:a.search,paginate:a.paginate})]})})]})})]})}export{v as default};
