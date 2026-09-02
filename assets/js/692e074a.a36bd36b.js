"use strict";(self.webpackChunkapi_onlyoffice_com=self.webpackChunkapi_onlyoffice_com||[]).push([[395833],{236143:(e,t,r)=>{r.d(t,{A:()=>o});let o={container:"container_unb8",toolbar:"toolbar_w0De",toolbarGroup:"toolbarGroup_Wb9C",toolbarGroupRight:"toolbarGroupRight_p7eS",label:"label_tEpc",selectTrigger:"selectTrigger_Huge",selectContent:"selectContent_yBi6",selectPopup:"selectPopup_ZN3T",selectOption:"selectOption_rLvl",selectIcon:"selectIcon_MQZf",notice:"notice_UIJS",desktopContent:"desktopContent_Az4M",resizeHandle:"resizeHandle_YPVe",resizeHandleGrip:"resizeHandleGrip_c2TW",tabsRoot:"tabsRoot_Bes3",tabsList:"tabsList_jX4U",tabPanel:"tabPanel_FBYA",tab:"tab_Mbpn",editorContainer:"editorContainer_s0wW",runButton:"runButton_tifg",preview:"preview_m4HJ"}},625578:(e,t,r)=>{r.d(t,{v:()=>l});var o=r(474848),c=r(296540);let s="https://docspace-duv4mw.onlyoffice.com",i="johnsmith.testing2026@gmail.com",a="0455101f3594b2d0b353ce477735cbe13782b021484f1c8764f5c42e5ef9b1b4",n={manager:"initManager","public-room":"initPublicRoom",viewer:"initViewer",editor:"initEditor","room-selector":"initRoomSelector","file-selector":"initFileSelector",system:"initSystem",frame:"initFrame"},l=(0,c.forwardRef)(({mode:e,theme:t,id:r,requestToken:i,className:a,style:l,autoInit:d=!0},p)=>{let m=(0,c.useRef)(null),h=(0,c.useId)(),f=(0,c.useRef)(`ds-frame-${h.replace(/:/g,"")}`),S=(0,c.useCallback)(()=>{try{let e="u">typeof DocSpace&&DocSpace.SDK?.frames?.[f.current];e?.destroyFrame&&e.destroyFrame()}catch{}},[]),g=(0,c.useCallback)(()=>{let e=m.current;if(!e)return null;S(),e.innerHTML="";let t=document.createElement("div");return t.id=f.current,t.style.width="100%",t.style.height="100%",e.appendChild(t),t},[S]),b=(0,c.useCallback)(e=>{let t=m.current?.querySelector(`#${CSS.escape(f.current)}`);t&&(t.style.cssText="display:flex;align-items:center;justify-content:center;color:#888;font-size:14px;width:100%;height:100%;",t.textContent=e)},[]),x=(0,c.useCallback)(e=>{if(!g())return;let r=f.current,o="dark"===t;try{let t=DocSpace.SDK,c=new Proxy(t,{get(e,t){let c=e[t];return"function"==typeof c&&("init"===t||String(t).startsWith("init"))?t=>{let i=t.src&&"https://your-docspace.com"!==t.src?t.src:s,a={...t,src:i,frameId:r,width:"100%",height:"100%",checkCSP:!1,theme:o?"Dark":"Base"};return c.call(e,a)}:c}});Function("DocSpace",e)({SDK:c})}catch(e){b("Script error: "+(e?.message??e))}},[t,g,b]),y=(0,c.useCallback)(e=>{u().then(()=>x(e)).catch(e=>b(String(e)))},[x,b]);return(0,c.useImperativeHandle)(p,()=>({runScript:y}),[y]),(0,c.useEffect)(()=>{if(!d)return u().catch(()=>{}),S;if(!g())return;let o=f.current;return u().then(()=>(function(){if("u"<typeof DocSpace||!DocSpace.SDK)return void b("DocSpace SDK unavailable.");let c="dark"===t,a={frameId:o,src:s,width:"100%",height:"100%",checkCSP:!1,theme:c?"Dark":"Base",events:{onAppReady(){let e=DocSpace.SDK.frames[o];e?.setConfig&&e.setConfig({theme:c?"Dark":"Base"})},onAppError(e){b("DocSpace error: "+(e?.message??e))}}};if(void 0!==r&&(a.id=r),void 0!==i&&(a.requestToken=i),"public-room"===e){a.mode="public-room",a.rootPath="/rooms/share",DocSpace.SDK.init(a);return}let l=n[e]||"initManager";"function"!=typeof DocSpace.SDK[l]?b(`SDK method "${l}" is not available.`):DocSpace.SDK[l](a)})()).catch(()=>b("Failed to load DocSpace SDK.")),S},[d,e,t,r,i]),(0,o.jsx)("div",{className:a,style:l,ref:m})}),d=null;function u(){return d||(d=new Promise((e,t)=>{function r(){if(!i||!a)return void e();let t="ds-system-login",r=document.createElement("div");r.id=t,r.style.display="none",document.body.appendChild(r),DocSpace.SDK.initSystem({frameId:t,src:s,events:{async onAppReady(){let o=DocSpace.SDK.frames[t];try{await o.login(i,a)}catch{}finally{o.destroyFrame(),r.remove(),e()}},onAppError(){r.remove(),e()}}})}if("u">typeof DocSpace&&DocSpace.SDK)r();else{let e=document.createElement("script");e.src=`${s}/static/scripts/sdk/2.0.0/api.js?src=${encodeURIComponent(s)}`,e.onload=()=>r(),e.onerror=()=>t("Failed to load DocSpace SDK."),document.head.appendChild(e)}}))}},277615:(e,t,r)=>{r.r(t),r.d(t,{default:()=>y});var o=r(474848),c=r(733257),s=r(335527),i=r(603248),a=r(965354),n=r(296540),l=r(423475),d=r(962534),u=r(4811);let p={manager:"Manager",editor:"Editor",viewer:"Viewer","room-selector":"Room selector","file-selector":"File selector",frame:"Frame",system:"System","public-room":"Public room"},m={manager:`const config = {
    src: "https://your-docspace.com",
    mode: "manager",
    width: "100%",
    height: "100%",
    frameId: "ds-frame",
    showHeader: true,
    showTitle: true,
    showMenu: false,
    showFilter: true,
    disableActionButton: false, // Requires user with appropriate permissions
    infoPanelVisible: true, // Requires user with appropriate permissions
    init: true,
    filter: {
        count: 100,
        page: 1,
        sortorder: "descending",
        sortby: "DateAndTime",
        search: ""
    }
};

DocSpace.SDK.initManager(config);`,editor:`const config = {
    src: "https://your-docspace.com",
    mode: "editor",
    width: "100%",
    height: "100%",
    frameId: "ds-frame",
    init: false,
    id: 3730262 // Replace with your file ID
};

DocSpace.SDK.initEditor(config);`,viewer:`const config = {
    src: "https://your-docspace.com",
    mode: "viewer",
    editorType: "embedded",
    width: "100%",
    height: "100%",
    frameId: "ds-frame",
    init: false,
    id: 3730260 // Replace with your file ID
};

DocSpace.SDK.initViewer(config);`,"room-selector":`const config = {
    src: "https://your-docspace.com",
    mode: "room-selector",
    width: "100%",
    height: "100%",
    frameId: "ds-frame",
    init: true,
    showSelectorCancel: true,
    showSelectorHeader: true,
    withSearch: true,
    acceptButtonLabel: "Select",
    cancelButtonLabel: "Cancel",
    isButtonMode: false,

    events: {
        onSelectCallback: null,
        onCloseCallback: null,
        onAppReady: null,
        onAppError: null
    }
};

DocSpace.SDK.initRoomSelector(config);`,"file-selector":`const config = {
    src: "https://your-docspace.com",
    mode: "file-selector",
    width: "100%",
    height: "100%",
    frameId: "ds-frame",
    init: true,
    showSelectorCancel: true,
    showSelectorHeader: true,
    withSearch: true,
    acceptButtonLabel: "Select",
    cancelButtonLabel: "Cancel",
    withSubtitle: true,
    filterParam: "ALL",
    isButtonMode: false,

    events: {
        onSelectCallback: null,
        onCloseCallback: null,
        onAppReady: null,
        onAppError: null
    }
};

DocSpace.SDK.initFileSelector(config);`,frame:`const config = {
    src: "https://your-docspace.com",
    mode: "manager",
    width: "100%",
    height: "100%",
    frameId: "ds-frame",
    init: true
};

DocSpace.SDK.initFrame(config);`,system:`const config = {
    src: "https://your-docspace.com",
    mode: "system",
    width: "100%",
    height: "100%",
    frameId: "ds-frame",
    init: true,
    events: {
        onAppReady: null,
        onAppError: null
    }
};

DocSpace.SDK.initSystem(config);`,"public-room":`const config = {
    src: "https://your-docspace.com",
    mode: "public-room",
    width: "100%",
    height: "100%",
    frameId: "ds-frame",
    showHeader: true,
    showTitle: true,
    showMenu: false,
    showFilter: true,
    disableActionButton: false,
    infoPanelVisible: false,
    init: true,
    filter: {
        count: 100,
        page: 1,
        sortorder: "descending",
        sortby: "DateAndTime",
        search: "",
        withSubfolders: false
    },
    id: 2613800, // Replace with your room ID
    requestToken: "ZjIrNGhZM2tDbmFnbzRHMmxKODE4Umx5SHdXOUx4OXVpc3BpaTlyN1ZIOD0_IjEzZmQ4MmRkLTVkNTAtNDM0ZC1iZTE0LWM2M2ZkNDJkMDFhNCI", // Replace with your request token
    rootPath: "/rooms/share"
};

DocSpace.SDK.init(config);`};var h=r(625578),f=r(236143);let S=(0,n.lazy)(()=>Promise.all([r.e(668553),r.e(53083)]).then(r.bind(r,53083)).then(e=>({default:e.DocSpaceEditor}))),g=({initialMode:e="manager"})=>{let[t,r]=(0,n.useState)(e),[s,i]=(0,n.useState)(m[e]),{colorMode:a,setColorMode:l}=(0,c.G)(),d=(0,n.useRef)(null),u=(0,n.useRef)(!1);(0,n.useEffect)(()=>{u.current||(u.current=!0,d.current?.runScript(s))},[]);let p=(0,n.useRef)(a);(0,n.useEffect)(()=>{p.current!==a&&(p.current=a,d.current?.runScript(s))},[a]);let h=(0,n.useCallback)(e=>{r(e);let t=m[e];i(t),d.current?.runScript(t)},[]),S=(0,n.useCallback)(()=>{d.current?.runScript(s)},[s]);return(0,o.jsxs)("div",{className:f.A.container,children:[(0,o.jsx)(b,{mode:t,onModeChange:h,theme:a,onThemeChange:l}),(0,o.jsx)("div",{className:f.A.notice,children:"This playground may not work in Safari or incognito/private browsing mode due to third-party cookie restrictions."}),(0,o.jsx)(x,{script:s,onScriptChange:i,onRun:S,previewRef:d,mode:t,theme:a})]})},b=({mode:e,onModeChange:t,theme:r,onThemeChange:c})=>(0,o.jsxs)("div",{className:f.A.toolbar,children:[(0,o.jsxs)("div",{className:f.A.toolbarGroup,children:[(0,o.jsx)("div",{className:f.A.label,children:"Mode:"}),(0,o.jsxs)(l.bL,{value:e,onValueChange:e=>t(e),children:[(0,o.jsxs)(l.l9,{className:f.A.selectTrigger,children:[(0,o.jsx)(l.WT,{}),(0,o.jsx)(l.In,{asChild:!0,children:(0,o.jsx)("div",{className:f.A.selectIcon})})]}),(0,o.jsx)(l.ZL,{children:(0,o.jsx)(l.UC,{className:f.A.selectContent,position:"popper",children:(0,o.jsx)(l.LM,{className:f.A.selectPopup,children:Object.keys(p).map(e=>(0,o.jsx)(l.q7,{value:e,className:f.A.selectOption,children:(0,o.jsx)(l.p4,{children:p[e]})},e))})})})]})]}),(0,o.jsxs)("div",{className:`${f.A.toolbarGroup} ${f.A.toolbarGroupRight}`,children:[(0,o.jsx)("div",{className:f.A.label,children:"Theme:"}),(0,o.jsxs)(l.bL,{value:r,onValueChange:e=>c(e),children:[(0,o.jsxs)(l.l9,{className:f.A.selectTrigger,children:[(0,o.jsx)(l.WT,{}),(0,o.jsx)(l.In,{asChild:!0,children:(0,o.jsx)("div",{className:f.A.selectIcon})})]}),(0,o.jsx)(l.ZL,{children:(0,o.jsx)(l.UC,{className:f.A.selectContent,position:"popper",children:(0,o.jsxs)(l.LM,{className:f.A.selectPopup,children:[(0,o.jsx)(l.q7,{value:"light",className:f.A.selectOption,children:(0,o.jsx)(l.p4,{children:"Light"})}),(0,o.jsx)(l.q7,{value:"dark",className:f.A.selectOption,children:(0,o.jsx)(l.p4,{children:"Dark"})})]})})})]})]})]}),x=({script:e,onScriptChange:t,onRun:r,previewRef:c,mode:s,theme:i})=>!function(e="(max-width: 767px)"){let[t,r]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{let t=window.matchMedia(e);r(t.matches);let o=e=>r(e.matches);return t.addEventListener("change",o),()=>t.removeEventListener("change",o)},[e]),t}()?(0,o.jsxs)(u.YZ,{direction:"horizontal",className:f.A.desktopContent,children:[(0,o.jsx)(u.Zk,{minSize:20,defaultSize:40,children:(0,o.jsx)(n.Suspense,{children:(0,o.jsx)(S,{value:e,onChange:t,onRun:r,theme:i})})}),(0,o.jsx)(u.TW,{className:f.A.resizeHandle,children:(0,o.jsx)("div",{className:f.A.resizeHandleGrip,children:(0,o.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("circle",{cx:"9",cy:"12",r:"1"}),(0,o.jsx)("circle",{cx:"9",cy:"5",r:"1"}),(0,o.jsx)("circle",{cx:"9",cy:"19",r:"1"}),(0,o.jsx)("circle",{cx:"15",cy:"12",r:"1"}),(0,o.jsx)("circle",{cx:"15",cy:"5",r:"1"}),(0,o.jsx)("circle",{cx:"15",cy:"19",r:"1"})]})})}),(0,o.jsx)(u.Zk,{minSize:20,defaultSize:60,children:(0,o.jsx)(h.v,{ref:c,mode:s,theme:i,autoInit:!1,className:f.A.preview})})]}):(0,o.jsxs)(d.bL,{className:f.A.tabsRoot,defaultValue:"editor",children:[(0,o.jsxs)(d.B8,{className:f.A.tabsList,children:[(0,o.jsx)(d.l9,{value:"editor",className:f.A.tab,children:"Editor"}),(0,o.jsx)(d.l9,{value:"preview",className:f.A.tab,children:"Preview"})]}),(0,o.jsx)(d.UC,{value:"editor",className:f.A.tabPanel,children:(0,o.jsx)(n.Suspense,{children:(0,o.jsx)(S,{value:e,onChange:t,onRun:r,theme:i})})}),(0,o.jsx)(d.UC,{value:"preview",className:f.A.tabPanel,children:(0,o.jsx)(h.v,{ref:c,mode:s,theme:i,autoInit:!1,className:f.A.preview})})]}),y=()=>{let e=new URLSearchParams((0,s.zy)().search).get("mode")??void 0;return(0,o.jsxs)(c.a,{children:[(0,o.jsxs)(i.A,{children:[(0,o.jsx)("title",{children:"DocSpace SDK Playground | ONLYOFFICE"}),(0,o.jsx)("meta",{name:"description",content:"An interactive platform to explore and test ONLYOFFICE DocSpace SDK embedding modes \u2014 manager, editor, viewer, selectors, and more."}),(0,o.jsx)("meta",{property:"og:title",content:"DocSpace SDK Playground | ONLYOFFICE"}),(0,o.jsx)("meta",{property:"og:description",content:"An interactive platform to explore and test ONLYOFFICE DocSpace SDK embedding modes \u2014 manager, editor, viewer, selectors, and more."})]}),(0,o.jsx)(a.default,{children:()=>(0,o.jsx)(g,{initialMode:e})})]})}}}]);