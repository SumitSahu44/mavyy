(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[966],{4727:function(e,t,s){Promise.resolve().then(s.bind(s,537))},9376:function(e,t,s){"use strict";var r=s(5475);s.o(r,"useRouter")&&s.d(t,{useRouter:function(){return r.useRouter}}),s.o(r,"useSearchParams")&&s.d(t,{useSearchParams:function(){return r.useSearchParams}})},537:function(e,t,s){"use strict";s.r(t);var r=s(7437),n=s(2265),a=s(9376);s(5137);let i=()=>{let e=(0,a.useSearchParams)(),t=e?e.get("pid"):null,[s,i]=(0,n.useState)(""),[u,c]=(0,n.useState)(""),[l,o]=(0,n.useState)(""),[d,h]=(0,n.useState)(!1),p=(0,a.useRouter)(),m=async e=>{if(e.preventDefault(),!d){alert("You must agree to the terms and conditions.");return}try{let e=await fetch("https://mavy-pxtx.onrender.com/user/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:s,email:u,password:l}),credentials:"include"}),r=await e.json();console.log("data"+e),e.ok?(alert("User registered successfully!"),p.push(t?"/buy?pid=".concat(t):"/")):alert(r.message||"Error during registration.")}catch(e){console.error("Error:",e),alert("Error occurred while registering the user.")}};return(0,r.jsx)("div",{children:(0,r.jsxs)("div",{className:"signup-container",children:[(0,r.jsx)("div",{className:"signup-header",children:(0,r.jsx)("header",{children:"Sign Up"})}),(0,r.jsxs)("form",{onSubmit:m,children:[(0,r.jsx)("div",{className:"input-box",children:(0,r.jsx)("input",{type:"text",className:"input-field",placeholder:"Username",value:s,onChange:e=>i(e.target.value),autoComplete:"off",required:!0})}),(0,r.jsx)("div",{className:"input-box",children:(0,r.jsx)("input",{type:"email",className:"input-field",placeholder:"Email",value:u,onChange:e=>c(e.target.value),autoComplete:"off",required:!0})}),(0,r.jsx)("div",{className:"input-box",children:(0,r.jsx)("input",{type:"password",className:"input-field",placeholder:"Password",value:l,onChange:e=>o(e.target.value),autoComplete:"off",required:!0})}),(0,r.jsx)("div",{children:(0,r.jsxs)("section",{children:[(0,r.jsx)("input",{type:"checkbox",id:"check",checked:d,onChange:()=>h(!d)}),(0,r.jsx)("label",{htmlFor:"check",children:"Agree to terms & conditions"})]})}),(0,r.jsx)("div",{className:"input-submit",children:(0,r.jsx)("button",{className:"submit-btn",id:"submit-btn",type:"submit",children:"Sign Up"})})]})]})})};t.default=()=>(0,r.jsx)(n.Suspense,{fallback:(0,r.jsx)("div",{children:"Loading..."}),children:(0,r.jsx)(i,{})})},5137:function(){}},function(e){e.O(0,[573,971,117,744],function(){return e(e.s=4727)}),_N_E=e.O()}]);