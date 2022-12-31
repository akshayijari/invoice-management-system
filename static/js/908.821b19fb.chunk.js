"use strict";(self.webpackChunkinvoicer=self.webpackChunkinvoicer||[]).push([[908],{3791:function(e,n,t){t.d(n,{Z:function(){return C}});var r=t(1413),i=t(9439),s=t(4554),o=t(493),l=t(4852),a=t(6259),c=t(4395),d=t(4663),u=t(890),x=t(3400),h=t(9953),m=t(2791),f=t(2279);var p=function(e){var n=e.children,t=e.window,r=(0,f.Z)({disableHysteresis:!0,threshold:0,target:t?t():void 0});return m.cloneElement(n,{elevation:r?4:0})},j=t(8008),v=t(9031),b=t(3967),g=t(5193),w=t(6030),y=t(1087),k=t(7201),N=t(7689),Z=t(184),C=function(e){var n=(0,v.Z)(),t=(0,m.useState)(!1),f=(0,i.Z)(t,2),C=f[0],I=f[1],S=(0,m.useState)(!1),F=(0,i.Z)(S,2),L=F[0],B=F[1],H=(0,w.v9)((function(e){return e.user.user})),G=(0,N.s0)(),M=function(e){return function(n){("keydown"!==n.type||"Tab"!==n.key&&"Shift"!==n.key)&&I(e)}};(0,m.useEffect)((function(){H.id?B(!0):B(!1)}),[H.id]);var W=function(){window.location.reload(!1),(0,k.CF)("success","Goodbye!\ud83d\udc4b")},D=(0,b.Z)(),P=(0,g.Z)(D.breakpoints.down("sm"));return(0,Z.jsx)(s.Z,{sx:{marginBottom:"70px"},children:(0,Z.jsx)(p,(0,r.Z)((0,r.Z)({},e),{},{children:(0,Z.jsx)(c.Z,{children:(0,Z.jsxs)(d.Z,{className:n.toolBar,children:[L?(0,Z.jsx)(y.rU,{to:"/dashboard",children:(0,Z.jsx)(u.Z,{variant:"h6",className:n.logo,children:"Invoicer"})}):(0,Z.jsx)(y.rU,{to:"/",children:(0,Z.jsx)(u.Z,{variant:"h6",className:n.logo,children:"Invoicer"})}),P?(0,Z.jsxs)(s.Z,{children:[(0,Z.jsx)(x.Z,{size:"large",edge:"end",color:"inherit","aria-label":"menu",onClick:M(!0),children:(0,Z.jsx)(j.Z,{className:n.menuIcon,fontSize:"large"})}),(0,Z.jsx)(h.ZP,{anchor:"right",open:C,onClose:M(!1),children:(0,Z.jsx)(s.Z,{sx:{width:250},role:"presentation",onClick:M(!1),onKeyDown:M(!1),children:(0,Z.jsx)(o.Z,{children:L?(0,Z.jsx)(l.ZP,{button:!0,onClick:function(){return W()},children:(0,Z.jsx)(a.Z,{primary:"Sign Out"})}):(0,Z.jsx)(y.rU,{to:"/login",children:(0,Z.jsx)(l.ZP,{button:!0,children:(0,Z.jsx)(a.Z,{primary:"Log in"})})})})})})]}):(0,Z.jsx)(s.Z,{sx:{display:"flex",justifyContent:"space-between",flexGrow:"0.05"},children:L?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(u.Z,{className:n.link,onClick:function(){G("/dashboard")},children:"Home"}),(0,Z.jsx)(u.Z,{className:n.link,onClick:function(){G("/profile",{state:{source:"from_dashboard"}})},children:"Profile"}),(0,Z.jsx)(u.Z,{className:n.link,onClick:function(){return W()},children:"Sign Out"})]}):(0,Z.jsx)(y.rU,{to:"/login",children:(0,Z.jsx)(u.Z,{className:n.link,children:"Log in"})})})]})})}))})}},7908:function(e,n,t){t.r(n),t.d(n,{default:function(){return j}});var r=t(9439),i=t(2791),s=t(3791),o=t(4165),l=t(5861),a=t(7689),c=(t(1978),t(996)),d=t(7201),u=t(184),x=function(e){var n=e.invoiceId,t=(0,a.s0)();function s(){return(s=(0,l.Z)((0,o.Z)().mark((function e(n){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{m(!h),(0,d.CF)("success","Deleted successfully!\ud83d\ude80")}catch(n){(0,d.CF)("error","Failed, Try again!\ud83d\ude2d")}case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var c=i.useState(!1),x=(0,r.Z)(c,2),h=x[0],m=x[1];return(0,u.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,u.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 text-blue-500 cursor-pointer",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,onClick:function(){return t("/view/invoice/".concat(n))},children:(0,u.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"})}),(0,u.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 text-red-500 cursor-pointer",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,onClick:function(){m(!h)},children:(0,u.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})}),(0,u.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 text-blue-500 cursor-pointer",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,onClick:function(){return t("/edit/invoice/".concat(n))},children:(0,u.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"})}),h?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("div",{className:"justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none",children:(0,u.jsx)("div",{className:"relative w-2/3 my-6 mx-auto max-w-3xl",children:(0,u.jsxs)("div",{className:"border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none",children:[(0,u.jsx)("div",{className:"flex items-start justify-center items-center p-5 border-b border-solid border-slate-200 rounded-t",children:(0,u.jsx)("h3",{className:"text-3xl font-semibold text-red-500",children:"!!! Warning !!!"})}),(0,u.jsx)("div",{className:"relative p-6 flex-auto",children:(0,u.jsx)("p",{className:"my-4 text-slate-500 text-lg leading-relaxed",children:"Are you sure do you want to delete this entry?"})}),(0,u.jsxs)("div",{className:"flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b",children:[(0,u.jsx)("button",{className:"background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150",type:"button",onClick:function(){return m(!1)},children:"Close"}),(0,u.jsx)("button",{className:"bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150",type:"button",onClick:function(){return function(e){return s.apply(this,arguments)}(n)},children:"Delete"})]})]})})}),(0,u.jsx)("div",{className:"opacity-25 fixed inset-0 z-40 bg-black"})]}):null]})},h=function(e){var n=e.invoices;return console.log("invoices",n),(0,u.jsxs)("div",{className:"w-full overflow-auto",children:[(0,u.jsx)("h3",{className:"text-xl text-blue-700 font-semibold",children:"Recent Invoices "}),(0,u.jsxs)("table",{children:[(0,u.jsx)("thead",{children:(0,u.jsxs)("tr",{children:[(0,u.jsx)("th",{className:"text-blue-600",children:"Customer"}),(0,u.jsx)("th",{className:"text-blue-600",children:"Invoice No."}),(0,u.jsx)("th",{className:"text-blue-600",children:"City"}),(0,u.jsx)("th",{className:"text-blue-600",children:"GSTN"}),(0,u.jsx)("th",{className:"text-blue-600",children:"Actions"})]})}),(0,u.jsx)("tbody",{children:n.map((function(e){return(0,u.jsxs)("tr",{children:[(0,u.jsx)("td",{className:"text-sm",children:e.data.customerName}),(0,u.jsx)("td",{className:"text-sm",children:e.data.invoiceNo}),(0,u.jsx)("td",{className:"text-sm",children:e.data.customerCity}),(0,u.jsx)("td",{className:"text-sm",children:e.data.customerGSTN}),(0,u.jsx)("td",{children:(0,u.jsx)(x,{invoiceId:e.id})})]},e.id)}))})]})]})},m=t(6030),f=t(9692),p=t(9388),j=function(){var e=(0,a.s0)(),n=(0,m.v9)((function(e){return e.user.user})),t=(0,i.useState)([]),o=(0,r.Z)(t,2),l=o[0],d=o[1],x=(0,i.useState)(!0),j=(0,r.Z)(x,2),v=j[0],b=j[1];return(0,i.useEffect)((function(){if(!n.id)return e("/login");try{var t=(0,f.IO)((0,f.hJ)(c.ZP,"invoices"),(0,f.ar)("user_id","==",n.id)),r=(0,f.cf)(t,(function(e){var n=[];return e.forEach((function(e){n.push({data:e.data(),id:e.id})})),d(n),b(!1),function(){return r()}}))}catch(i){console.log(i)}}),[e,n.id]),(0,u.jsx)(u.Fragment,{children:v?(0,u.jsx)(p.Z,{}):(0,u.jsxs)("div",{className:"w-full",children:[(0,u.jsx)(s.Z,{}),(0,u.jsxs)("div",{className:"sm:p-6 flex items-center flex-col p-3 justify-center",children:[(0,u.jsxs)("h3",{className:"p-12 text-slate-800",children:["Welcome, ",(0,u.jsx)("span",{className:"text-blue-800",children:n.email})]}),(0,u.jsx)("button",{className:" h-36 py-6 px-12 border-t-8 border-blue-800 shadow-md rounded hover:bg-slate-200 hover:border-red-500 bg-slate-50 cursor-pointer mb-[100px] mt-[50px] text-blue-700",onClick:function(){return e("/new/invoice")},children:(0,u.jsx)("p",{children:"Create an invoice"})}),0!==l.length&&(0,u.jsx)(h,{invoices:l})]})]})})}},9031:function(e,n,t){var r=t(4942),i=(0,t(2455).Z)((function(e){return{toolBar:{height:"10vh",display:"flex",justifyContent:"space-between",padding:"20px",backgroundColor:"white"},logo:{color:"#041562",cursor:"pointer"},inputField:{marginBottom:"20px !important",width:"100%"},link:{color:"#000",cursor:"pointer"},menuIcon:{color:"#000"},heroContainer:{width:"100%",minHeight:"80vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center"},heroText:{marginBottom:"20px !important",fontWeight:"bolder",color:"#041562"},heroSubtitle:{marginBottom:"30px !important",color:"#11468F",opacity:"0.8"},authGridContainer:{width:"100%",height:"100%"},authGridImage:(0,r.Z)({backgroundColor:"#11468F",display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:"5px"},e.breakpoints.between("xs","md"),{display:"none"}),authSvg:{width:"100%"},authForm:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column !important"},authFormContainer:(0,r.Z)({padding:"10px 15px 0px 15px"},e.breakpoints.between("xs","sm"),{padding:"10px 15px 0px 15px"})}}));n.Z=i}}]);
//# sourceMappingURL=908.821b19fb.chunk.js.map