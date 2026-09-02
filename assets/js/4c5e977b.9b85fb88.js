(self.webpackChunkapi_onlyoffice_com=self.webpackChunkapi_onlyoffice_com||[]).push([[106473],{801690:(e,t,o)=>{"use strict";o.d(t,{A:()=>l});var n=o(474848),c=o(296540),a=o(890062),i=o(733257);async function r(e,t){if(!t)return null;let o=e=>btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,""),n=o(JSON.stringify({typ:"JWT",alg:"HS256"})),c=o(JSON.stringify(e)),a=new TextEncoder,i={name:"HMAC",hash:"SHA-256"},r=await crypto.subtle.importKey("raw",a.encode(t),i,!1,["sign","verify"]),s=a.encode(`${n}.${c}`),d=o(String.fromCharCode(...new Uint8Array(await crypto.subtle.sign(i.name,r,s))));return`${n}.${c}.${d}`}let s="editorScript",d=async(e,t,o,n,c,a,i,d,l=!1,u=!1)=>{let m=document.createElement("script");m.id=s,m.type="text/javascript";let p=((e,t,o,n=!1,c=!1)=>({fileType:e,key:`doc-${Date.now()}`,title:o||`Example Document.${e}`,url:t||`https://static.onlyoffice.com/assets/docs/samples/${((e,t=!1,o=!1)=>t?o?"demo-invoice":"demo":"pdf"!==e||o?"new":"blank")(e,n,c)}.${e}`}))(t,c,i?.document?.title,l,u);i?.editorConfig?.customization?.logo?.image&&(i.editorConfig.customization.logo.image=new URL("/assets/images/try-docs/example-logo.png",window.location.origin).href),i?.editorConfig?.customization?.customer?.logo&&(i.editorConfig.customization.customer.logo=new URL("/assets/images/try-docs/example-logo-big.png",window.location.origin).href);let f=function e(t,...o){let n={...t};for(let t of o)for(let o in t){let c=n[o],a=t[o];a&&"object"==typeof a&&!Array.isArray(a)?n[o]=e(c&&"object"==typeof c?c:{},a):n[o]=a}return n}(i||{},{document:p,documentType:(e=>{switch(e){case"xlsx":case"xls":case"ods":case"csv":return"cell";case"pptx":case"ppsx":case"ppt":case"odp":return"slide";case"pdf":return"pdf";default:return"word"}})(t),editorConfig:{callbackUrl:"",customization:{anonymous:{request:!1},uiTheme:"dark"===n?"default-dark":"default-light",features:{featuresTips:!1},zoom:a}}}),g=await r(f,e);m.innerHTML=`
    if (window.connector) {
      try {
        window.connector.disconnect?.();
      } catch (error) {
        console.warn("Failed to disconnect connector:", error);
      }
      window.connector = null;
    }

    if (window.docEditor) {
      window.docEditor.destroyEditor();
      window.docEditor = null;
    }

    (() => {
      ${d?.beforeDocumentReady}
      window.onDocumentReady = function() {
        window.connector = docEditor.createConnector();
        connector.callCommand(() => {
          ${o}
        }, () => {
        });
        ${d?.onDocumentReady}
      };

      const config = ${JSON.stringify(f)};
      config.token = "${g}";
      config.events = {
        onDocumentReady: window.onDocumentReady,
      };

      window.docEditor = new DocsAPI.DocEditor("placeholder", config);
      ${d?.otherFunctional}
    })();
  `,document.body.appendChild(m)},l=({fileType:e,code:t,height:o="700px",templateUrl:r,zoom:l,config:u,isDemo:m=!1,isForm:p=!1,externalScript:f={beforeDocumentReady:"",onDocumentReady:"",otherFunctional:""}})=>{let{siteConfig:{customFields:g}}=(0,a.default)(),{colorMode:w}=(0,i.G)(),y=g.documentServer,x=g.documentServerSecret;return(0,c.useEffect)(()=>{if("1"!==document.documentElement.getAttribute("data-script-api-state"))if("2"!==document.documentElement.getAttribute("data-script-api-state")){let o=new URL("/web-apps/apps/api/documents/api.js",y),n=document.createElement("script");n.type="text/javascript",n.src=o.toString(),n.onerror=()=>{console.error("Failed to load OnlyOffice API script.")},n.onload=()=>{document.documentElement.setAttribute("data-script-api-state","2"),d(x,e,t,w,r,l,u,f,m,p)},document.documentElement.setAttribute("data-script-api-state","1"),document.body.appendChild(n)}else d(x,e,t,w,r,l,u,f,m,p);return()=>{document.getElementById(s).remove()}},[]),(0,n.jsx)("div",{style:{height:o},children:(0,n.jsx)("div",{id:"placeholder"})})}},631582:(e,t,o)=>{"use strict";o.d(t,{A:()=>i});var n=o(474848);o(296540);var c=o(634164),a=o(771625);function i({children:e,className:t}){return(0,n.jsx)(a.A,{as:"pre",tabIndex:0,className:(0,c.A)("codeBlockStandalone_zC50","thin-scrollbar",t),children:(0,n.jsx)("code",{className:"codeBlockLines_p187",children:e})})}},77880:(e,t,o)=>{"use strict";o.d(t,{A:()=>m});var n=o(474848);o(296540);var c=o(553114),a=o(587511),i=o(555205),r=o(81491),s=o(962534),d=o(801690);let l="TabsItem_H6ZP",u={docx:"word",pptx:"slide",xlsx:"cell",pdf:"pdf"};function m({children:e,className:t="",metastring:o,title:p,showLineNumbers:f,language:g}){let w,y,x=function(e){let{prism:t}=(0,c.p)();return(0,a.mU)({code:e.children,className:e.className,metastring:e.metastring,magicComments:t.magicComments,defaultLanguage:t.defaultLanguage,language:e.language,title:e.title,showLineNumbers:e.showLineNumbers})}({children:e,className:t,metastring:o,title:p,showLineNumbers:f,language:g}),h=(0,i.f)(),b=!1,C=!1;if(o){let e=o.includes("editor-docx")&&"docx",t=o.includes("editor-xlsx")&&"xlsx",n=o.includes("editor-pptx")&&"pptx",c=/editor-(?:pdf|forms)/.test(o)&&"pdf";C=o.includes("editor-forms"),b=e||t||n||c;let a=o.match(/zoom=(\d+)\s*/);w=a?Number(a[1]):void 0,y=(a=o.match(/templateUrl=([^\s]+)/))?a[1]:void 0}return(0,n.jsx)(a.l8,{metadata:x,wordWrap:h,children:b?(0,n.jsxs)(s.bL,{defaultValue:"code",children:[(0,n.jsxs)(s.B8,{className:"TabsList_ai01",children:[(0,n.jsx)(s.l9,{className:l,value:"code",children:"Code"}),(0,n.jsx)(s.l9,{className:l,value:"result",children:"Result"}),(0,n.jsx)("button",{className:l,onClick:()=>{let e=new URLSearchParams({code:x.code,editor:C?"form":u[b],script:"office-js-api"});y&&e.set("templateUrl",y),window.open(`/playground/?${e}`,"_blank")},type:"button",children:"Playground"})]}),(0,n.jsx)(s.UC,{value:"code",forceMount:!0,className:"TabsContent_OVEz",children:(0,n.jsx)(r.A,{})}),(0,n.jsx)(s.UC,{value:"result",children:(0,n.jsx)(d.A,{code:x.code,fileType:b,templateUrl:y,zoom:w,isForm:C,config:{editorConfig:{customization:{compactToolbar:!0}}}})})]}):(0,n.jsx)(r.A,{})})}},650477:()=>{},516403:()=>{},242634:()=>{},596452:()=>{},620217:()=>{},849730:()=>{}}]);