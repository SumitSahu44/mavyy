(()=>{var e={};e.id=565,e.ids=[565],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},3032:(e,r,s)=>{"use strict";s.r(r),s.d(r,{GlobalError:()=>t.a,__next_app__:()=>x,originalPathname:()=>h,pages:()=>o,routeModule:()=>j,tree:()=>d}),s(5912),s(6765),s(996);var i=s(170),n=s(5002),a=s(3876),t=s.n(a),l=s(6299),c={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>l[e]);s.d(r,c);let d=["",{children:["cart",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,5912)),"C:\\Users\\harsh\\Downloads\\mavyy-main (1)\\mavyy-main\\Frontend\\src\\app\\cart\\page.js"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,6765)),"C:\\Users\\harsh\\Downloads\\mavyy-main (1)\\mavyy-main\\Frontend\\src\\app\\layout.js"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,996,23)),"next/dist/client/components/not-found-error"]}],o=["C:\\Users\\harsh\\Downloads\\mavyy-main (1)\\mavyy-main\\Frontend\\src\\app\\cart\\page.js"],h="/cart/page",x={require:s,loadChunk:()=>Promise.resolve()},j=new i.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/cart/page",pathname:"/cart",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},2398:(e,r,s)=>{Promise.resolve().then(s.t.bind(s,3642,23)),Promise.resolve().then(s.t.bind(s,7586,23)),Promise.resolve().then(s.t.bind(s,7838,23)),Promise.resolve().then(s.t.bind(s,8057,23)),Promise.resolve().then(s.t.bind(s,7741,23)),Promise.resolve().then(s.t.bind(s,3118,23))},6496:()=>{},7112:(e,r,s)=>{Promise.resolve().then(s.bind(s,804))},804:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>d});var i=s(7247);s(3343),s(7631),s(7477);var n=s(8964),a=s(8028),t=s(285),l=s(5479),c=s(8043);function d(){let[e,r]=(0,n.useState)(null),[s,d]=(0,n.useState)([]),[o,h]=(0,n.useState)([]),[x,j]=(0,n.useState)(!0),[m,u]=(0,n.useState)(null);(0,a.V)(()=>{let e=document.querySelector("#nav i"),r=document.querySelector("#full i"),s=t.p8.timeline();s.to("#full",{right:0,duration:.5}),s.from("#full h4",{x:150,duration:.6,stagger:.2,opacity:0}),s.from("#full i",{opacity:0}),s.pause(),e.addEventListener("click",function(){s.play()}),r.addEventListener("click",function(){s.reverse()})});let p=async()=>{try{let r=await fetch("https://mavy-pxtx.onrender.com/user/checkout",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({userId:e,cartItems:s,totalBill:m})}),i=await r.json();if(i.url?window.location.href=i.url:console.error("Error creating Stripe Checkout session"),r.ok){let r=await fetch(`https://mavy-pxtx.onrender.com/user/cartDelete/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json"},credentials:"include"});r.ok?(console.log("Cart items cleared successfully."),d([])):console.error("Error clearing the cart:",await r.json())}else alert(i.message||"Error during checkout...")}catch(e){console.error("Error during checkout:::",e),alert("Error occurred while placing the order.")}};return(0,i.jsxs)("div",{children:[i.jsx("header",{children:(0,i.jsxs)("div",{className:"navbar",children:[(0,i.jsxs)("div",{id:"nav",children:[i.jsx("img",{src:"img/qt=q_95.jpeg",alt:""}),i.jsx("i",{children:i.jsx(l.dQh,{})})]}),(0,i.jsxs)("div",{id:"full",children:[i.jsx("a",{href:"/",children:i.jsx("h4",{children:"Home"})}),i.jsx("a",{href:"./about",children:i.jsx("h4",{children:"About"})}),i.jsx("a",{href:"./product",children:i.jsx("h4",{children:"Products"})}),i.jsx("a",{href:"#",children:i.jsx("h4",{children:"Cart"})}),i.jsx("a",{href:"./login",children:i.jsx("h4",{children:"Profile"})}),i.jsx("i",{children:i.jsx(c.QAE,{})})]})]})}),(0,i.jsxs)("div",{className:"cart-container",children:[i.jsx("div",{className:"cart-heading",children:i.jsx("h1",{children:"My Cart"})}),(0,i.jsxs)("div",{className:"cart-item",children:[i.jsx("div",{className:"cart-left",children:x?i.jsx("p",{children:"Loading your cart..."}):0===o.length?i.jsx("p",{children:"Your cart is empty."}):o.map((e,r)=>(0,i.jsxs)("div",{className:"item",children:[i.jsx("div",{className:"item-img",children:i.jsx("img",{src:e.productDetails.imageUrl?`img/${e.productDetails.imageUrl}`:"img/abena.jpeg",alt:e.productDetails.imageUrl||"Fallback image"})}),(0,i.jsxs)("div",{className:"item-info",children:[i.jsx("h3",{children:e.productDetails.name}),i.jsx("p",{children:e.productDetails.description}),(0,i.jsxs)("p",{children:["$",e.productDetails.price]}),(0,i.jsxs)("form",{action:"#",children:[i.jsx("label",{children:"Qty:"}),i.jsx("input",{type:"number",min:"1",value:e.quantity,onChange:e=>console.log("Handle quantity change")})]})]}),i.jsx("div",{className:"close",children:i.jsx("i",{className:"ri-close-line"})})]},r))}),(0,i.jsxs)("div",{className:"cart-right",children:[i.jsx("h2",{children:"Cart Total"}),(0,i.jsxs)("div",{className:"c-info",children:[i.jsx("div",{className:"c-r-info",children:(0,i.jsxs)("div",{children:[i.jsx("p",{children:"Cost Subtotal"}),i.jsx("p",{children:"Shipping Cost"}),i.jsx("p",{children:"Discount"}),i.jsx("h4",{children:"Total Cost"})]})}),i.jsx("div",{className:"c-l-info",children:(0,i.jsxs)("div",{children:[(0,i.jsxs)("p",{children:["$",m]}),i.jsx("p",{children:"$9"}),i.jsx("p",{children:"N/A"}),(0,i.jsxs)("h4",{children:["$",m+9]})]})})]}),i.jsx("div",{className:"order-btn",children:i.jsx("button",{onClick:p,children:"Place Order"})})]})]})]}),i.jsx("footer",{children:i.jsx("div",{className:"footer-cont",children:(0,i.jsxs)("div",{className:"footer",children:[i.jsx("div",{className:"company",children:i.jsx("img",{src:"img/qt=q_95.jpeg",alt:""})}),(0,i.jsxs)("div",{className:"cust-care",children:[i.jsx("h3",{children:"Customer Care"}),(0,i.jsxs)("ul",{children:[i.jsx("li",{children:i.jsx("a",{href:"#",children:"Contact Us"})}),i.jsx("li",{children:"Call +91 123 456 789"}),i.jsx("li",{children:i.jsx("a",{href:"#",children:"FAQ"})})]})]}),(0,i.jsxs)("div",{className:"link",children:[i.jsx("h3",{children:"Links"}),(0,i.jsxs)("ul",{children:[i.jsx("li",{children:i.jsx("a",{href:"#",children:"Home"})}),i.jsx("li",{children:i.jsx("a",{href:"#",children:"About"})}),i.jsx("li",{children:i.jsx("a",{href:"#",children:"Product"})})]})]}),(0,i.jsxs)("div",{className:"social",children:[i.jsx("h3",{children:"Follow Us"}),(0,i.jsxs)("ul",{children:[i.jsx("li",{children:i.jsx("a",{href:"#",children:"Instagram"})}),i.jsx("li",{children:i.jsx("a",{href:"#",children:"Facebook"})}),i.jsx("li",{children:i.jsx("a",{href:"#",children:"Twitter"})})]})]})]})})})]})}},5912:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>i});let i=(0,s(5347).createProxy)(String.raw`C:\Users\harsh\Downloads\mavyy-main (1)\mavyy-main\Frontend\src\app\cart\page.js#default`)},6765:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>d,metadata:()=>c});var i=s(2051),n=s(3383),a=s.n(n),t=s(7806),l=s.n(t);s(5023);let c={title:"Create Next App",description:"Generated by create next app"};function d({children:e}){return i.jsx("html",{lang:"en",children:i.jsx("body",{className:`${a().variable} ${l().variable} antialiased`,children:e})})}},3343:()=>{},5023:()=>{},7631:()=>{},7477:()=>{}};var r=require("../../webpack-runtime.js");r.C(e);var s=e=>r(r.s=e),i=r.X(0,[180,489],()=>s(3032));module.exports=i})();