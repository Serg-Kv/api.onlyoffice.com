"use strict";(self.webpackChunkapi_onlyoffice_com=self.webpackChunkapi_onlyoffice_com||[]).push([[91266],{148405:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>r,default:()=>p,frontMatter:()=>l,metadata:()=>a,toc:()=>d});let a=JSON.parse('{"id":"docs/docs-api/samples/automation-api/changing-text-in-pdf","title":"Changing text in PDF","description":"Find and replace text in a PDF using the Automation API.","source":"@site/site/docs/docs-api/samples/automation-api/changing-text-in-pdf.md","sourceDirName":"docs/docs-api/samples/automation-api","slug":"/docs/docs-api/samples/automation-api/changing-text-in-pdf","permalink":"/api.onlyoffice.com/docs/docs-api/samples/automation-api/changing-text-in-pdf","draft":false,"unlisted":false,"editUrl":"https://github.com/ONLYOFFICE/api.onlyoffice.com/tree/master/site/docs/docs-api/samples/automation-api/changing-text-in-pdf.md","tags":[{"inline":true,"label":"PDF","permalink":"/api.onlyoffice.com/tags/pdf"},{"inline":true,"label":"Integration","permalink":"/api.onlyoffice.com/tags/integration"},{"inline":true,"label":"External access","permalink":"/api.onlyoffice.com/tags/external-access"},{"inline":true,"label":"Automation API","permalink":"/api.onlyoffice.com/tags/automation-api"}],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3,"hide_table_of_contents":true,"description":"Find and replace text in a PDF using the Automation API.","tags":["PDF","Integration","External access","Automation API"]},"sidebar":"docsDocs","previous":{"title":"Redacting in PDF","permalink":"/api.onlyoffice.com/docs/docs-api/samples/automation-api/redacting-in-pdf"},"next":{"title":"DocEditor","permalink":"/api.onlyoffice.com/docs/docs-api/usage-api/doceditor"}}');var o=n(474848),s=n(28453),c=n(233898);let l={sidebar_position:3,hide_table_of_contents:!0,description:"Find and replace text in a PDF using the Automation API.",tags:["PDF","Integration","External access","Automation API"]},r="Changing text in PDF",i={},d=[{value:"How it works",id:"how-it-works",level:2}];function m(e){let t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"changing-text-in-pdf",children:"Changing text in PDF"})}),"\n",(0,o.jsx)(t.p,{children:"Use the Automation API to find and replace text in a PDF document from an external interface \u2014 enter a search term, specify replacement text, and apply changes across all pages."}),"\n",(0,o.jsx)(t.admonition,{type:"info",children:(0,o.jsxs)(t.p,{children:["The document opens as a PDF. Your code calls ",(0,o.jsx)(t.code,{children:"connector.callCommand()"})," to execute Document Builder API methods that recognize page content, iterate through text objects, and replace matching text."]})}),"\n",(0,o.jsx)(c.o4,{}),"\n",(0,o.jsx)(t.h2,{id:"how-it-works",children:"How it works"}),"\n",(0,o.jsxs)(t.ol,{children:["\n",(0,o.jsxs)(t.li,{children:["\n",(0,o.jsxs)(t.p,{children:["When the user enters a search term and replacement text, then clicks ",(0,o.jsx)(t.strong,{children:"Replace all"}),", the ",(0,o.jsx)(t.code,{children:"connector.callCommand()"})," method is used to execute Document Builder API code inside the editor. The code iterates through all pages using ",(0,o.jsx)(t.a,{href:"/api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/GetPagesCount",children:"GetPagesCount"})," and ",(0,o.jsx)(t.a,{href:"/api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/GetPage",children:"GetPage"}),", and calls ",(0,o.jsx)(t.a,{href:"/api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPage/Methods/RecognizeContent",children:"RecognizeContent"})," on each page to get all drawing objects. For each shape, it retrieves the inner content with ",(0,o.jsx)(t.a,{href:"/api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShape/Methods/GetContent",children:"GetContent"}),", iterates through paragraphs using ",(0,o.jsx)(t.a,{href:"/api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/GetElementsCount",children:"GetElementsCount"})," and ",(0,o.jsx)(t.a,{href:"/api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/GetElement",children:"GetElement"}),", reads text with ",(0,o.jsx)(t.a,{href:"/api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/GetText",children:"GetText"}),", and replaces it with ",(0,o.jsx)(t.a,{href:"/api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/SetText",children:"SetText"}),":"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:'Asc.scope.replaceParams = { findText, replaceWith, matchCase };\r\n\r\nconnector.callCommand(() => {\r\n  const params = Asc.scope.replaceParams;\r\n  const regex = new RegExp(\r\n    params.findText.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&"),\r\n    params.matchCase ? "g" : "gi",\r\n  );\r\n  const doc = Api.GetDocument();\r\n  const pageCount = doc.GetPagesCount();\r\n  const results = [];\r\n\r\n  for (let i = 0; i < pageCount; i++) {\r\n    const page = doc.GetPage(i);\r\n    const drawings = page.RecognizeContent();\r\n    let pageReplacements = 0;\r\n\r\n    for (let d = 0; d < drawings.length; d++) {\r\n      const drawing = drawings[d];\r\n      if (drawing.GetClassType() === "shape") {\r\n        const content = drawing.GetContent();\r\n        const elemCount = content.GetElementsCount();\r\n        for (let e = 0; e < elemCount; e++) {\r\n          const elem = content.GetElement(e);\r\n          if (elem.GetClassType() === "paragraph") {\r\n            const text = elem.GetText();\r\n            const matches = text.match(regex);\r\n            if (matches) {\r\n              elem.SetText(text.replace(regex, params.replaceWith));\r\n              pageReplacements += matches.length;\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    if (pageReplacements > 0) {\r\n      results.push({ pageIndex: i, count: pageReplacements });\r\n    }\r\n  }\r\n\r\n  return results;\r\n}, (results) => {\r\n  // Display the replacement results in the external panel\r\n});\n'})}),"\n"]}),"\n",(0,o.jsxs)(t.li,{children:["\n",(0,o.jsx)(t.p,{children:"The external panel displays the number of replacements per page. Each result shows how many occurrences were replaced and on which page they were found."}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(t.admonition,{type:"note",children:[(0,o.jsxs)(t.p,{children:["Please note that the connector is available only for ",(0,o.jsx)(t.strong,{children:"ONLYOFFICE Docs Developer"}),"."]}),(0,o.jsxs)(t.p,{children:["The connector is a premium feature available at an extra cost. See ",(0,o.jsx)(t.a,{href:"https://www.onlyoffice.com/developer-edition-prices?from=api",children:"ONLYOFFICE Docs Developer"})," for pricing details, or contact our sales team at ",(0,o.jsx)(t.a,{href:"mailto:sales@onlyoffice.com",children:"sales@onlyoffice.com"})," to request a quote."]})]})]})}function p(e={}){let{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}},801690:(e,t,n)=>{n.d(t,{A:()=>d});var a=n(474848),o=n(296540),s=n(890062),c=n(733257);async function l(e,t){if(!t)return null;let n=e=>btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,""),a=n(JSON.stringify({typ:"JWT",alg:"HS256"})),o=n(JSON.stringify(e)),s=new TextEncoder,c={name:"HMAC",hash:"SHA-256"},l=await crypto.subtle.importKey("raw",s.encode(t),c,!1,["sign","verify"]),r=s.encode(`${a}.${o}`),i=n(String.fromCharCode(...new Uint8Array(await crypto.subtle.sign(c.name,l,r))));return`${a}.${o}.${i}`}let r="editorScript",i=async(e,t,n,a,o,s,c,i,d=!1,m=!1)=>{let p=document.createElement("script");p.id=r,p.type="text/javascript";let u=((e,t,n,a=!1,o=!1)=>({fileType:e,key:`doc-${Date.now()}`,title:n||`Example Document.${e}`,url:t||`https://static.onlyoffice.com/assets/docs/samples/${((e,t=!1,n=!1)=>t?n?"demo-invoice":"demo":"pdf"!==e||n?"new":"blank")(e,a,o)}.${e}`}))(t,o,c?.document?.title,d,m);c?.editorConfig?.customization?.logo?.image&&(c.editorConfig.customization.logo.image=new URL("/assets/images/try-docs/example-logo.png",window.location.origin).href),c?.editorConfig?.customization?.customer?.logo&&(c.editorConfig.customization.customer.logo=new URL("/assets/images/try-docs/example-logo-big.png",window.location.origin).href);let h=function e(t,...n){let a={...t};for(let t of n)for(let n in t){let o=a[n],s=t[n];s&&"object"==typeof s&&!Array.isArray(s)?a[n]=e(o&&"object"==typeof o?o:{},s):a[n]=s}return a}(c||{},{document:u,documentType:(e=>{switch(e){case"xlsx":case"xls":case"ods":case"csv":return"cell";case"pptx":case"ppsx":case"ppt":case"odp":return"slide";case"pdf":return"pdf";default:return"word"}})(t),editorConfig:{callbackUrl:"",customization:{anonymous:{request:!1},uiTheme:"dark"===a?"default-dark":"default-light",features:{featuresTips:!1},zoom:s}}}),g=await l(h,e);p.innerHTML=`
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
      ${i?.beforeDocumentReady}
      window.onDocumentReady = function() {
        window.connector = docEditor.createConnector();
        connector.callCommand(() => {
          ${n}
        }, () => {
        });
        ${i?.onDocumentReady}
      };

      const config = ${JSON.stringify(h)};
      config.token = "${g}";
      config.events = {
        onDocumentReady: window.onDocumentReady,
      };

      window.docEditor = new DocsAPI.DocEditor("placeholder", config);
      ${i?.otherFunctional}
    })();
  `,document.body.appendChild(p)},d=({fileType:e,code:t,height:n="700px",templateUrl:l,zoom:d,config:m,isDemo:p=!1,isForm:u=!1,externalScript:h={beforeDocumentReady:"",onDocumentReady:"",otherFunctional:""}})=>{let{siteConfig:{customFields:g}}=(0,s.default)(),{colorMode:x}=(0,c.G)(),y=g.documentServer,C=g.documentServerSecret;return(0,o.useEffect)(()=>{if("1"!==document.documentElement.getAttribute("data-script-api-state"))if("2"!==document.documentElement.getAttribute("data-script-api-state")){let n=new URL("/web-apps/apps/api/documents/api.js",y),a=document.createElement("script");a.type="text/javascript",a.src=n.toString(),a.onerror=()=>{console.error("Failed to load OnlyOffice API script.")},a.onload=()=>{document.documentElement.setAttribute("data-script-api-state","2"),i(C,e,t,x,l,d,m,h,p,u)},document.documentElement.setAttribute("data-script-api-state","1"),document.body.appendChild(a)}else i(C,e,t,x,l,d,m,h,p,u);return()=>{document.getElementById(r).remove()}},[]),(0,a.jsx)("div",{style:{height:n},children:(0,a.jsx)("div",{id:"placeholder"})})}},233898:(e,t,n)=>{n.d(t,{o4:()=>K,bY:()=>g,a1:()=>T,DW:()=>r,YK:()=>a.A,EN:()=>J,Yr:()=>C,tg:()=>M});var a=n(801690),o=n(474848);let s=JSON.parse('[{"Title":"Miss","LastName":"Robinson","FirstName":"Isabella","MiddleName":"Pierre","DateOfBirth":"14121987","Sex":"Female","Phone":"(972)234-8261","Email":"Isabella.Robinson@email.com","Number/street":"625 Hartin Cir","City":"Irving","PostalCode":"75061","Country":"U.S.A.","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Smith","FirstName":"Emma","MiddleName":"Summerscale","DateOfBirth":"23021978","Sex":"Female","Phone":"(972)321-8512","Email":"Emma.Smith@email.com","Number/street":"1502 Betsy Ln","City":"New York","PostalCode":"11225","Country":"U.S.A.","DateOfCompletion":"23052025"},{"Title":"Mrs","LastName":"Williams","FirstName":"Emily","MiddleName":"Marie","DateOfBirth":"07121998","Sex":"Female","Phone":"(972)343-5341","Email":"Emily.Williams@email.com","Number/street":"M\xf6ckernstra\xdfe 73A","City":"Berlin","PostalCode":"10965","Country":"Germany","DateOfCompletion":"23052025"},{"Title":"Miss","LastName":"Brown","FirstName":"Sophia","MiddleName":"Rike","DateOfBirth":"25022003","Sex":"Female","Phone":"(972)324-1532","Email":"Sophia.Brown@email.com","Number/street":"810 Julie Ave","City":"Fort Worth","PostalCode":"76116","Country":"U.S.A.","DateOfCompletion":"23052025"},{"Title":"Dr","LastName":"Davis","FirstName":"Olivia","MiddleName":"Heidi","DateOfBirth":"28071963","Sex":"Female","Phone":"(972)123-5231","Email":"Olivia.Davis@email.com","Number/street":"1908 Nelson Ave","City":"Las Vegas","PostalCode":"89032","Country":"U.S.A.","DateOfCompletion":"23052025"},{"Title":"Mrs","LastName":"Jones","FirstName":"Abigail","MiddleName":"Raffaela","DateOfBirth":"04101983","Sex":"Female","Phone":"(972)642-6223","Email":"Abigail.Jones@email.com","Number/street":"321 Exhibition Rd","City":"London","PostalCode":"SW7 2BX","Country":"United Kingdom","DateOfCompletion":"23052025"},{"Title":"Dr","LastName":"Hannah","FirstName":"Davis","MiddleName":"Lucas","DateOfBirth":"05011969","Sex":"Male","Phone":"(972)732-3532","Email":"Hannah.Davis@email.com","Number/street":"89 Paul Couturier","City":"Paris","PostalCode":"94250","Country":"France","DateOfCompletion":"23052025"},{"Title":"Mrs","LastName":"Smith","FirstName":"Samantha","MiddleName":"Sylvie","DateOfBirth":"20011988","Sex":"Female","Phone":"(972)531-6578","Email":"Samantha.Smith@email.com","Number/street":"50 Main St","City":"Centerfield","PostalCode":"84622","Country":"U.S.A.","DateOfCompletion":"23052025"},{"Title":"Miss","LastName":"Davis","FirstName":"Mia","MiddleName":"Maximilian","DateOfBirth":"24052000","Sex":"Female","Phone":"(972)928-8278","Email":"Mia.Davis@email.com","Number/street":"10 Rue du N","City":"Le Mans","PostalCode":"72100","Country":"France","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Taylor","FirstName":"Madison","MiddleName":"Gabriel","DateOfBirth":"30081998","Sex":"Male","Phone":"(972)098-6421","Email":"Madison.Taylor@email.com","Number/street":"322 Dickenson Rd","City":"Manchester","PostalCode":"M13 0WG","Country":"United Kingdom","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Brown","FirstName":"Jacob","MiddleName":"Hugo","DateOfBirth":"13121991","Sex":"Male","Phone":"(972)543-8465","Email":"Jacob.Brown@email.com","Number/street":"13 Hardman St","City":"Liverpool","PostalCode":"L1 9AS","Country":"United Kingdom","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Davis","FirstName":"Jason","MiddleName":"James","DateOfBirth":"04121987","Sex":"Male","Phone":"(972)543-9876","Email":"Jason.Davis@email.com","Number/street":"Richard-Wagner 32","City":"Frankfurt","PostalCode":"63069","Country":"Germany","DateOfCompletion":"23052025"},{"Title":"Dr","LastName":"Williams","FirstName":"Michael","MiddleName":"Elias","DateOfBirth":"11091981","Sex":"Male","Phone":"(972)123-7543","Email":"Michael.Williams@email.com","Number/street":"9 Cit\xe9 Roguet","City":"Toulouse","PostalCode":"31300","Country":"France","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Johnson","FirstName":"Christopher","MiddleName":"Jules","DateOfBirth":"16081983","Sex":"Male","Phone":"(972)763-5352","Email":"Christopher.Johnson@email.com","Number/street":"350 Grand Ave","City":"Los Angeles","PostalCode":"90071","Country":"U.S.A.","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Taylor","FirstName":"Ethan","MiddleName":"Edward","DateOfBirth":"31111997","Sex":"Male","Phone":"(972)234-6745","Email":"Ethan.Taylor@email.com","Number/street":"Heisterstra\xdfe 1","City":"N\xfcrnberg","PostalCode":"90441","Country":"Germany","DateOfCompletion":"23052025"},{"Title":"Miss","LastName":"Wright","FirstName":"Daniel","MiddleName":"Marie","DateOfBirth":"19042002","Sex":"Female","Phone":"(972)877-7687","Email":"Daniel.Wright@email.com","Number/street":"21 Rte de Capestang","City":"B\xe9ziers","PostalCode":"34500","Country":"France","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Jones","FirstName":"Matthew","MiddleName":"Henry","DateOfBirth":"04101983","Sex":"Male","Phone":"(972)546-8754","Email":"Matthew.Jones@email.com","Number/street":"Caspar-Voght 44","City":"Hamburg","PostalCode":"20535","Country":"Germany","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Wilson","FirstName":"Andrew","MiddleName":"Adelheid","DateOfBirth":"23041988","Sex":"Male","Phone":"(972)343-8675","Email":"Andrew.Wilson@email.com","Number/street":"925 Dickinson St,","City":"Philadelphia","PostalCode":"19147","Country":"U.S.A.","DateOfCompletion":"23052025"},{"Title":"Dr","LastName":"Robinson","FirstName":"William","MiddleName":"Leon","DateOfBirth":"15031975","Sex":"Male","Phone":"(972)301-5646","Email":"William.Robinson@email.com","Number/street":"98 Market Pl","City":"Romford","PostalCode":"RM1 3ER","Country":"United Kingdom","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Johnson","FirstName":"Joshua","MiddleName":"Felix","DateOfBirth":"18061993","Sex":"Male","Phone":"(972)345-3453","Email":"Joshua.Johnson@email.com","Number/street":"21 Rond-point du Grand","City":"Montpellier","PostalCode":"34300","Country":"France","DateOfCompletion":"23052025"}]'),c={"demo-section":"demo-section_wLDO","demo-layout":"demo-layout_kwZw","form-panel":"form-panel_KRVe","panel-header":"panel-header_CJGM","panel-title":"panel-title_TkNF","panel-body":"panel-body_MS9Q","select-label":"select-label_c0Q7",persons:"persons_zwCI",controlsBlock:"controlsBlock_LXov","field-group":"field-group_aoaJ","field-label":"field-label_HbbG","field-input":"field-input_hUpl","radio-group":"radio-group_jbH0","radio-label":"radio-label_G3ui","radio-input":"radio-input_ddFG","editor-column":"editor-column_ZJfL"},l=JSON.stringify(s),r=()=>(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("div",{className:c["demo-section"],children:(0,o.jsxs)("div",{className:c["demo-layout"],children:[(0,o.jsxs)("div",{className:c["form-panel"],children:[(0,o.jsx)("div",{className:c["panel-header"],children:(0,o.jsx)("span",{className:c["panel-title"],children:"FORM FIELDS"})}),(0,o.jsxs)("div",{className:c["panel-body"],children:[(0,o.jsx)("label",{className:c["select-label"],children:"Fill from template"}),(0,o.jsxs)("select",{id:c.persons,name:"persons",defaultValue:"defaultValue",required:!0,disabled:!0,children:[(0,o.jsx)("option",{value:"defaultValue",disabled:!0,children:"Choose Example"}),(0,o.jsx)("option",{value:"75061",children:"Isabella Robinson"}),(0,o.jsx)("option",{value:"11225",children:"Emma Smith"}),(0,o.jsx)("option",{value:"10965",children:"Emily Williams"}),(0,o.jsx)("option",{value:"76116",children:"Sophia Brown"}),(0,o.jsx)("option",{value:"89032",children:"Olivia Davis"}),(0,o.jsx)("option",{value:"SW7 2BX",children:"Abigail Jones"}),(0,o.jsx)("option",{value:"94250",children:"Davis Hannah"}),(0,o.jsx)("option",{value:"84622",children:"Samantha Smith"}),(0,o.jsx)("option",{value:"72100",children:"Mia Davis"}),(0,o.jsx)("option",{value:"M13 0WG",children:"Madison Taylor"}),(0,o.jsx)("option",{value:"L1 9AS",children:"Jacob Brown"}),(0,o.jsx)("option",{value:"63069",children:"Jason Davis"}),(0,o.jsx)("option",{value:"31300",children:"Michael Williams"}),(0,o.jsx)("option",{value:"90071",children:"Christopher Johnson"}),(0,o.jsx)("option",{value:"90441",children:"Ethan Taylor"}),(0,o.jsx)("option",{value:"34500",children:"Daniel Wright"}),(0,o.jsx)("option",{value:"20535",children:"Matthew Jones"}),(0,o.jsx)("option",{value:"19147",children:"Andrew Wilson"}),(0,o.jsx)("option",{value:"RM1 3ER",children:"William Robinson"}),(0,o.jsx)("option",{value:"34300",children:"Joshua Johnson"})]}),(0,o.jsx)("div",{id:c.controlsBlock,className:c["controls-grid"],hidden:!0})]})]}),(0,o.jsx)("div",{className:c["editor-column"],children:(0,o.jsx)(a.A,{fileType:"pdf",code:"",height:"100%",templateUrl:"https://static.onlyoffice.com/assets/docs/samples/withtags.pdf",isDemo:!0,config:{document:{permissions:{edit:!1,fillForms:!0}},editorConfig:{customization:{compactToolbar:!0}}},externalScript:{beforeDocumentReady:`
                  let contentControls = [];
                  const settingFormIds = new Map();
                `,onDocumentReady:`
                  connector.executeMethod("GetAllContentControls", null, (data) => {
                    for (let i = 0; i < data.length; i++) {
                      switch (data[i].Tag) {
                        case "Male":
                        case "Female":
                          data[i].GroupKey = "Sex";
                          data[i].Type = "radio";
                          break;
                        default:
                          data[i].Type = "input";
                      }
                      connector.executeMethod("GetFormValue", [data[i]["InternalId"]], (value) => {
                        data[i].Value = value || "";
                        if (i === data.length - 1) {
                          contentControls.push(...preparingArrayContentControls(data));
                          renderForm();
                        }
                      });
                    }
                  });
                  connector.attachEvent("onChangeContentControl", onChangeContentControl);
                `,otherFunctional:`
                  document.getElementById("${c.persons}").addEventListener("change", (e) => {
                    const person = ${l}.find((p) => p["PostalCode"] === e.target.value);
                    for (const key in person) {
                      const value = person[key];
                      if (key === "Sex") {
                        setFormValue(value, true);
                      } else {
                        setFormValue(key, value);
                      }
                    }
                  });

                  const setFormValue = (tag, value) => {
                    connector.executeMethod("GetFormsByTag", [tag], (forms) => {
                      const id = forms[0]["InternalId"];
                      settingFormIds.set(id, (settingFormIds.get(id) || 0) + 1);
                      connector.executeMethod("SetFormValue", [id, value], () => {
                        settingFormIds.set(id, settingFormIds.get(id) - 1);
                        onChangeContentControl({ InternalId: id, FormValue: value });
                      });
                    });
                  };

                  const renderForm = () => {
                    const container = document.getElementById("${c.controlsBlock}");

                    if (contentControls.length !== 0) {
                      container.removeAttribute("hidden");
                      document.getElementById("${c.persons}").removeAttribute("disabled");
                    }

                    contentControls.forEach((control) => {
                      const labelText = control["Tag"].replace(/([a-z])([A-Z])/g, "$1 $2");

                      if (control.Type === "input") {
                        const group = document.createElement("div");
                        group.className = "${c["field-group"]}";
                        const label = document.createElement("label");
                        label.className = "${c["field-label"]}";
                        label.textContent = labelText;
                        group.appendChild(label);
                        const input = document.createElement("input");
                        input.id = control["InternalId"];
                        input.value = control["Value"] || "";
                        input.className = "${c["field-input"]}";
                        group.appendChild(input);
                        container.appendChild(group);
                      } else if (control.Type === "radio") {
                        const group = document.createElement("div");
                        group.className = "${c["field-group"]}";
                        const label = document.createElement("label");
                        label.className = "${c["field-label"]}";
                        label.textContent = labelText;
                        group.appendChild(label);
                        const radios = document.createElement("div");
                        radios.className = "${c["radio-group"]}";
                        control["Value"].forEach((option) => {
                          const wrapper = document.createElement("label");
                          wrapper.className = "${c["radio-label"]}";
                          const radio = document.createElement("input");
                          radio.type = "radio";
                          radio.id = option["InternalId"];
                          radio.checked = option["checked"] === true;
                          radio.name = control["Tag"];
                          radio.className = "${c["radio-input"]}";
                          wrapper.appendChild(radio);
                          const span = document.createElement("span");
                          span.textContent = option["Tag"].replace(/([a-z])([A-Z])/g, "$1 $2");
                          wrapper.appendChild(span);
                          radios.appendChild(wrapper);
                        });
                        group.appendChild(radios);
                        container.appendChild(group);
                      }
                    });

                    document.querySelectorAll(".${c["field-input"]}").forEach((input) => {
                      input.addEventListener("keyup", updateContent);
                    });
                    document.querySelectorAll(".${c["radio-input"]}").forEach((radio) => {
                      radio.addEventListener("change", updateContent);
                    });
                  };

                  const updateContent = (e) => {
                    const { id } = e.target;
                    const value = e.target.classList.contains("${c["radio-input"]}") ? true : e.target.value;
                    settingFormIds.set(id, (settingFormIds.get(id) || 0) + 1);
                    connector.executeMethod("SetFormValue", [id, value], () => {
                      settingFormIds.set(id, settingFormIds.get(id) - 1);
                    });
                  };

                  const onChangeContentControl = (e) => {
                    if (settingFormIds.get(e["InternalId"])) return;
                    const element = document.getElementById(e["InternalId"]);
                    if (element.classList.contains("${c["radio-input"]}")) {
                      element.checked = !!e["FormValue"];
                    } else {
                      element.value = e["FormValue"] || "";
                    }
                  };

                  const preparingArrayContentControls = (data) => {
                    const filtered = data.filter((el) => el["Tag"] !== "");

                    const groups = filtered
                      .filter((c) => c["Type"] === "radio")
                      .reduce((acc, c) => {
                        acc[c["GroupKey"]] = acc[c["GroupKey"]] || [];
                        acc[c["GroupKey"]].push({
                          Tag: c["Tag"],
                          checked: c["Value"],
                          InternalId: c["InternalId"],
                        });
                        return acc;
                      }, {});

                    const result = [];
                    const seen = new Set();
                    for (const item of filtered) {
                      if (item["GroupKey"] && groups[item["GroupKey"]]) {
                        if (!seen.has(item["GroupKey"])) {
                          seen.add(item["GroupKey"]);
                          result.push({
                            ...item,
                            Tag: item["GroupKey"],
                            Value: groups[item["GroupKey"]],
                          });
                        }
                      } else {
                        result.push(item);
                      }
                    }
                    return result;
                  };
                `}})})]})})}),i="nav-btn_W50x",d="disabled_Vz7c",m="card-message_spo8",p="textarea_rSj1",u="btn_RNC4",h="active_Im1X",g=()=>(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("div",{className:"demo-section_E8Lg",children:(0,o.jsxs)("div",{className:"demo-layout_v1jf",children:[(0,o.jsx)("div",{className:"editor-column_gmu0",children:(0,o.jsx)(a.A,{fileType:"docx",code:"",height:"100%",templateUrl:"https://static.onlyoffice.com/assets/docs/samples/withcomments.docx",config:{editorConfig:{customization:{compactToolbar:!0}}},externalScript:{beforeDocumentReady:`
                  let comments = [];
                  let indexComment = 0;
                `,onDocumentReady:`
                  const getCommentIndex = (targetComment) =>
                    comments.findIndex((c) => c["Id"] === targetComment["Id"]);

                  connector.executeMethod("GetAllComments", null, (data) => {
                    comments.push(...data);
                    renderComments();
                  });

                  connector.attachEvent("onAddComment", (targetComment) => {
                    if (getCommentIndex(targetComment) === -1) {
                      comments.unshift(targetComment);
                    }
                    indexComment = 0;
                    renderComments();
                  });

                  connector.attachEvent("onRemoveComment", (targetComment) => {
                    const index = getCommentIndex(targetComment);
                    if (index !== -1) {
                      comments.splice(index, 1);
                    }
                    if (indexComment >= comments.length && indexComment !== 0) {
                      indexComment--;
                    }
                    renderComments();
                  });

                  connector.attachEvent("onChangeCommentData", (targetComment) => {
                    const index = getCommentIndex(targetComment);
                    if (index !== -1) {
                      indexComment = index;
                      comments[index]["Data"] = targetComment["Data"];
                      renderComments();
                    }
                  });
                `,otherFunctional:`
                  const avatarColors = ["#E8915B", "#7BB892", "#D4B44C", "#6B9BD2", "#C47DB5"];

                  const getAvatarColor = (name) => {
                    let hash = 0;
                    for (let i = 0; i < name.length; i++) {
                      hash = name.charCodeAt(i) + ((hash << 5) - hash);
                    }
                    return avatarColors[Math.abs(hash) % avatarColors.length];
                  };

                  const getInitials = (name) =>
                    name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase();

                  const formatDate = (time) => {
                    const d = new Date(parseInt(time, 10));
                    return d.toLocaleDateString(undefined, { month: "numeric", day: "numeric", year: "numeric" });
                  };

                  const createAvatar = (name) => {
                    const el = document.createElement("div");
                    el.className = "avatar_PvLe";
                    el.style.backgroundColor = getAvatarColor(name);
                    el.textContent = getInitials(name);
                    return el;
                  };

                  const createCardHeader = (name, time) => {
                    const header = document.createElement("div");
                    header.className = "card-header_kDTw";
                    header.appendChild(createAvatar(name));
                    const nameEl = document.createElement("span");
                    nameEl.className = "card-name_UNOp";
                    nameEl.textContent = name;
                    header.appendChild(nameEl);
                    const dateEl = document.createElement("span");
                    dateEl.className = "card-date_Fdno";
                    dateEl.textContent = formatDate(time);
                    header.appendChild(dateEl);
                    return header;
                  };

                  const renderComments = () => {
                    const list = document.getElementById("commentsList");
                    const countEl = document.getElementById("commentCount");
                    const emptyEl = document.getElementById("emptyComments");
                    const prevBtn = document.getElementById("prevComment");
                    const nextBtn = document.getElementById("nextComment");
                    const deleteBtn = document.getElementById("deleteComment");
                    const addReplyBtn = document.getElementById("addReply");

                    list.innerHTML = "";
                    countEl.textContent = comments.length;

                    if (comments.length === 0) {
                      emptyEl.style.display = "block";
                      prevBtn.classList.add("${d}");
                      nextBtn.classList.add("${d}");
                      deleteBtn.classList.add("${d}");
                      addReplyBtn.classList.add("${d}");
                      return;
                    }

                    emptyEl.style.display = "none";
                    deleteBtn.classList.remove("${d}");
                    addReplyBtn.classList.remove("${d}");

                    if (indexComment <= 0) {
                      prevBtn.classList.add("${d}");
                    } else {
                      prevBtn.classList.remove("${d}");
                    }
                    if (indexComment >= comments.length - 1) {
                      nextBtn.classList.add("${d}");
                    } else {
                      nextBtn.classList.remove("${d}");
                    }

                    comments.forEach((comment, idx) => {
                      const card = document.createElement("div");
                      card.className = "card_QwK2" + (idx === indexComment ? " card-active_RUXz" : "");
                      card.addEventListener("click", () => {
                        indexComment = idx;
                        renderComments();
                        connector.executeMethod("MoveToComment", [comments[idx]["Id"]]);
                      });

                      card.appendChild(createCardHeader(comment["Data"]["UserName"], comment["Data"]["Time"]));

                      const msg = document.createElement("div");
                      msg.className = "${m}";
                      msg.textContent = comment["Data"]["Text"];
                      card.appendChild(msg);

                      if (comment["Data"]["Replies"]?.length > 0) {
                        comment["Data"]["Replies"].forEach((reply) => {
                          const replyCard = document.createElement("div");
                          replyCard.className = "reply-card_n2OI";
                          replyCard.appendChild(createCardHeader(reply["UserName"], reply["Time"]));
                          const replyMsg = document.createElement("div");
                          replyMsg.className = "${m}";
                          replyMsg.textContent = reply["Text"];
                          replyCard.appendChild(replyMsg);
                          card.appendChild(replyCard);
                        });
                      }

                      list.appendChild(card);
                    });

                    connector.executeMethod("MoveToComment", [comments[indexComment]["Id"]]);
                  };

                  document.getElementById("prevComment").addEventListener("click", (e) => {
                    if (e.currentTarget.classList.contains("${d}")) return;
                    if (indexComment > 0) indexComment--;
                    renderComments();
                  });

                  document.getElementById("nextComment").addEventListener("click", (e) => {
                    if (e.currentTarget.classList.contains("${d}")) return;
                    if (indexComment < comments.length - 1) indexComment++;
                    renderComments();
                  });

                  document.getElementById("addReply").addEventListener("click", (e) => {
                    const btn = e.currentTarget;
                    if (btn.classList.contains("${d}")) return;
                    const area = document.getElementById("addReplyArea");
                    if (btn.classList.contains("${h}")) {
                      const reply = area.value;
                      if (reply) {
                        const datetime = \`\${Date.now()}\`;
                        comments[indexComment]["Data"]["Replies"].push({
                          Text: reply,
                          Time: datetime,
                          UserName: "John Smith"
                        });
                        connector.executeMethod("ChangeComment", [comments[indexComment]["Id"], comments[indexComment]["Data"]]);
                        area.value = "";
                      }
                      btn.classList.remove("${h}");
                      area.style.display = "none";
                    } else {
                      btn.classList.add("${h}");
                      area.style.display = "block";
                    }
                  });

                  document.getElementById("addComment").addEventListener("click", (e) => {
                    const btn = e.currentTarget;
                    const area = document.getElementById("addCommentArea");
                    if (btn.classList.contains("${h}")) {
                      const comment = area.value;
                      if (comment) {
                        const datetime = \`\${Date.now()}\`;
                        connector.executeMethod("AddComment", [{ Text: comment, UserName: "John Smith", Time: datetime }]);
                        area.value = "";
                      }
                      btn.classList.remove("${h}");
                      area.style.display = "none";
                    } else {
                      btn.classList.add("${h}");
                      area.style.display = "block";
                    }
                  });

                  document.getElementById("deleteComment").addEventListener("click", (e) => {
                    if (e.currentTarget.classList.contains("${d}")) return;
                    connector.executeMethod("RemoveComments", [[comments[indexComment]["Id"]]]);
                    renderComments();
                  });
                `}})}),(0,o.jsxs)("div",{className:"comments-panel_l5qV",children:[(0,o.jsxs)("div",{className:"panel-header_W1_K",children:[(0,o.jsxs)("span",{className:"panel-title_tUwt",children:["COMMENTS (",(0,o.jsx)("span",{id:"commentCount",children:"0"}),")"]}),(0,o.jsxs)("div",{className:"panel-nav_LVqD",children:[(0,o.jsx)("button",{id:"prevComment",className:`${i} ${d}`,children:"\u2039"}),(0,o.jsx)("button",{id:"nextComment",className:`${i} ${d}`,children:"\u203A"})]})]}),(0,o.jsx)("div",{id:"commentsList",className:"comments-list_dkIo"}),(0,o.jsx)("div",{id:"emptyComments",className:"empty-state_uJPB",style:{display:"none"},children:"There are no comments in the document."}),(0,o.jsx)("textarea",{id:"addReplyArea",className:p,placeholder:"Enter your reply here",style:{display:"none"}}),(0,o.jsx)("textarea",{id:"addCommentArea",className:p,placeholder:"Enter your comment here",style:{display:"none"}}),(0,o.jsxs)("div",{className:"panel-actions_EcIr",children:[(0,o.jsx)("button",{id:"addReply",className:`${u} ${d}`,children:"Add Reply"}),(0,o.jsx)("button",{id:"deleteComment",className:`${u} ${d}`,children:"Delete"}),(0,o.jsx)("button",{id:"addComment",className:u,children:"Add Comment"})]})]})]})})}),x="btn_ORPJ",y="disabled_N_dM",C=()=>(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{className:"demo-section_edJM",children:(0,o.jsxs)("div",{className:"controls-row_pLmK",children:[(0,o.jsx)("span",{className:"controls-label_VdaO",children:"External controls"}),(0,o.jsx)("button",{id:"accept",className:`${x} ${y}`,children:"\u2713 Accept"}),(0,o.jsx)("button",{id:"reject",className:`${x} ${y}`,children:"\u2718 Reject"}),(0,o.jsx)("button",{id:"prev",className:`${x} ${y}`,children:"\u2039 Prev"}),(0,o.jsx)("button",{id:"next",className:`${x} ${y}`,children:"Next \u203A"}),(0,o.jsx)("span",{id:"reviewCounter",className:"review-counter_ppte"})]})}),(0,o.jsx)(a.A,{fileType:"docx",code:"",height:"550px",templateUrl:"https://static.onlyoffice.com/assets/docs/samples/review.docx",config:{editorConfig:{customization:{compactToolbar:!0}}},externalScript:{beforeDocumentReady:`
            let reviewCount = 0;
            let reviewIndex = 0;
          `,onDocumentReady:`
            connector.callCommand(() => {
              const doc = Api.GetDocument();
              const report = doc.GetReviewReport();
              let total = 0;
              for (const user in report) {
                total += report[user].length;
              }
              return total;
            }, (total) => {
              reviewCount = total;
              reviewIndex = total > 0 ? 1 : 0;
              updateCounter();
            });

            document.querySelectorAll(".${x}").forEach((btn) => {
              btn.classList.remove("${y}");
            });
          `,otherFunctional:`
            const updateCounter = () => {
              const el = document.getElementById("reviewCounter");
              if (el) {
                el.textContent = reviewCount > 0
                  ? \`Change \${reviewIndex} of \${reviewCount}\`
                  : "";
              }
              const prevBtn = document.getElementById("prev");
              const nextBtn = document.getElementById("next");
              const acceptBtn = document.getElementById("accept");
              const rejectBtn = document.getElementById("reject");
              if (reviewCount === 0) {
                acceptBtn.classList.add("${y}");
                rejectBtn.classList.add("${y}");
                prevBtn.classList.add("${y}");
                nextBtn.classList.add("${y}");
              } else {
                acceptBtn.classList.remove("${y}");
                rejectBtn.classList.remove("${y}");
                if (reviewIndex <= 1) {
                  prevBtn.classList.add("${y}");
                } else {
                  prevBtn.classList.remove("${y}");
                }
                if (reviewIndex >= reviewCount) {
                  nextBtn.classList.add("${y}");
                } else {
                  nextBtn.classList.remove("${y}");
                }
              }
            };

            document.getElementById("accept").addEventListener("click", () => {
              connector.executeMethod("AcceptReviewChanges", null, () => {
                if (reviewCount > 0) reviewCount--;
                if (reviewIndex > reviewCount) reviewIndex = reviewCount;
                updateCounter();
              });
            });

            document.getElementById("reject").addEventListener("click", () => {
              connector.executeMethod("RejectReviewChanges", null, () => {
                if (reviewCount > 0) reviewCount--;
                if (reviewIndex > reviewCount) reviewIndex = reviewCount;
                updateCounter();
              });
            });

            document.getElementById("prev").addEventListener("click", () => {
              connector.executeMethod("MoveToNextReviewChange", [false]);
              if (reviewIndex > 1) reviewIndex--;
              updateCounter();
            });

            document.getElementById("next").addEventListener("click", () => {
              connector.executeMethod("MoveToNextReviewChange");
              if (reviewIndex < reviewCount) reviewIndex++;
              updateCounter();
            });
          `}})]}),v="panel-list-btn-active_x3xN",f="type-badge_rosP",E="cc-item-label_Njsc",b="prop-row_PWF3",N="prop-label_N5ru",I="prop-input_MsZG",j="prop-select_l7EG",B="color-item_eVrE",w="color-swatch_gBwy",L="color-hint_RH3v",D="btn_X9QN",R="disabled_bHQC",T=()=>(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("div",{className:"demo-section_WaC0",children:(0,o.jsxs)("div",{className:"demo-layout_WWbp",children:[(0,o.jsxs)("div",{className:"panel_glYF",children:[(0,o.jsxs)("div",{className:"panel-header_EwX5",children:[(0,o.jsxs)("div",{className:"panel-header-left_PYVH",children:[(0,o.jsx)("span",{className:"panel-title_hE5c",children:"CONTENT CONTROLS"}),(0,o.jsx)("span",{id:"ccCount",className:"panel-count_ISxe",children:"0"})]}),(0,o.jsxs)("button",{id:"ccListToggle",className:"panel-list-btn__IzV",children:["\u2261"," List"]})]}),(0,o.jsxs)("div",{className:"panel-body_ioD4",children:[(0,o.jsxs)("div",{className:"type-list_Uea1",children:[(0,o.jsx)("button",{"data-type":"block",className:`${f} type-text_rQgZ`,children:"Plain text/Rich text"}),(0,o.jsx)("button",{"data-type":"datePicker",className:`${f} type-date_fLWR`,children:"Date"}),(0,o.jsx)("button",{"data-type":"picture",className:`${f} type-picture_YF_E`,children:"Picture"}),(0,o.jsx)("button",{"data-type":"comboBox",className:`${f} type-combo_yogU`,children:"Combobox/Dropdown list"}),(0,o.jsx)("button",{"data-type":"checkBox",className:`${f} type-checkbox_fD09`,children:"Checkbox"})]}),(0,o.jsx)("div",{id:"ccList",className:"cc-list_MLZN",style:{display:"none"}}),(0,o.jsx)("div",{id:"ccDetails",className:"cc-details_ivda",style:{display:"none"},children:(0,o.jsxs)("div",{className:"details-grid_Sw2S",children:[(0,o.jsxs)("div",{className:"props-section_uSAM",children:[(0,o.jsxs)("div",{className:b,children:[(0,o.jsx)("span",{className:N,children:"Id"}),(0,o.jsx)("input",{id:"ccId",className:I})]}),(0,o.jsxs)("div",{className:b,children:[(0,o.jsx)("span",{className:N,children:"Tag"}),(0,o.jsx)("input",{id:"ccTag",className:I})]}),(0,o.jsxs)("div",{className:b,children:[(0,o.jsx)("span",{className:N,children:"Lock"}),(0,o.jsxs)("select",{id:"ccLock",className:j,children:[(0,o.jsx)("option",{value:"unlocked",children:"unlocked"}),(0,o.jsx)("option",{value:"contentLocked",children:"contentLocked"}),(0,o.jsx)("option",{value:"sdtContentLocked",children:"sdtContentLocked"}),(0,o.jsx)("option",{value:"sdtLocked",children:"sdtLocked"})]})]}),(0,o.jsxs)("div",{className:b,children:[(0,o.jsx)("span",{className:N,children:"Appearance"}),(0,o.jsxs)("select",{id:"ccAppearance",className:j,children:[(0,o.jsx)("option",{value:"boundingBox",children:"boundingBox"}),(0,o.jsx)("option",{value:"hidden",children:"hidden"})]})]}),(0,o.jsxs)("div",{className:b,children:[(0,o.jsx)("span",{className:N,children:"Colors"}),(0,o.jsxs)("span",{className:"color-group_nGnX",children:[(0,o.jsxs)("span",{className:B,children:[(0,o.jsx)("span",{id:"ccBgColor",className:w,"data-target":"bg"}),(0,o.jsx)("span",{className:L,children:"BG"})]}),(0,o.jsxs)("span",{className:B,children:[(0,o.jsx)("span",{id:"ccBorderColor",className:w,"data-target":"border"}),(0,o.jsx)("span",{className:L,children:"Border"})]})]})]}),(0,o.jsx)("input",{id:"ccColorInput",type:"color",className:"color-picker-hidden_gyF_",defaultValue:"#DCDCDC"})]}),(0,o.jsx)("button",{id:"ccApply",className:`${D} btn-apply_Qw44`,children:"Apply changes"}),(0,o.jsx)("pre",{id:"ccJson",className:"json-preview_Zp9u"})]})}),(0,o.jsx)("div",{id:"ccEmpty",className:"empty-state_K43Z",children:"Click a type above to add it, then click a content control in the editor to inspect it."})]}),(0,o.jsx)("div",{className:"panel-actions_Ztnt",children:(0,o.jsx)("button",{id:"ccRemove",className:`${D} ${R}`,children:"Remove"})})]}),(0,o.jsx)("div",{className:"editor-column_OR3e",children:(0,o.jsx)(a.A,{fileType:"docx",code:"",height:"100%",config:{editorConfig:{customization:{compactToolbar:!0}}},externalScript:{beforeDocumentReady:`
                  let allControls = [];
                  let selectedId = null;
                  let currentProps = null;
                `,onDocumentReady:`
                  connector.executeMethod("GetAllContentControls", null, (data) => {
                    allControls = data;
                    renderList();
                  });

                  connector.attachEvent("onFocusContentControl", (control) => {
                    if (control && control["InternalId"]) {
                      selectedId = control["InternalId"];
                      loadProperties();
                      renderList();
                    }
                  });

                  connector.attachEvent("onBlurContentControl", () => {
                    selectedId = null;
                    currentProps = null;
                    document.getElementById("ccDetails").style.display = "none";
                    document.getElementById("ccEmpty").style.display = "block";
                    document.getElementById("ccRemove").classList.add("${R}");
                    renderList();
                  });

                  connector.attachEvent("onChangeContentControl", () => {
                    refreshCount();
                    if (selectedId) loadProperties();
                  });
                `,otherFunctional:`
                  const loadProperties = () => {
                    if (!selectedId) return;
                    connector.executeMethod("GetCurrentContentControlPr", ["none"], (props) => {
                      if (!props) return;
                      currentProps = props;
                      document.getElementById("ccDetails").style.display = "block";
                      document.getElementById("ccEmpty").style.display = "none";
                      document.getElementById("ccRemove").classList.remove("${R}");

                      document.getElementById("ccId").value = props["Id"] || "";
                      document.getElementById("ccTag").value = props["Tag"] || "";
                      const lockMap = { 0: "contentLocked", 1: "sdtContentLocked", 2: "sdtLocked", 3: "unlocked" };
                      document.getElementById("ccLock").value = lockMap[props["Lock"]] || "unlocked";
                      document.getElementById("ccAppearance").value = props["Appearance"] === 2 ? "hidden" : "boundingBox";

                      document.getElementById("ccJson").textContent = JSON.stringify({ commonPr: props }, null, 2);

                      Asc.scope.ccInternalId = selectedId;
                      connector.callCommand(() => {
                        const doc = Api.GetDocument();
                        const controls = doc.GetAllContentControls();
                        for (let i = 0; i < controls.length; i++) {
                          if (controls[i].GetInternalId() === Asc.scope.ccInternalId) {
                            const bg = controls[i].GetBackgroundColor();
                            const border = controls[i].GetBorderColor();
                            return {
                              bg: bg ? bg.GetHex() : null,
                              border: border ? border.GetHex() : null,
                            };
                          }
                        }
                        return null;
                      }, (colors) => {
                        const toHex = (hex) => hex ? "#" + hex : "#DCDCDC";

                        const bgHex = toHex(colors && colors.bg);
                        const bgSwatch = document.getElementById("ccBgColor");
                        bgSwatch.style.backgroundColor = bgHex;
                        bgSwatch.dataset.hex = bgHex;
                        bgSwatch.style.display = "inline-block";

                        const borderHex = toHex(colors && colors.border);
                        const borderSwatch = document.getElementById("ccBorderColor");
                        borderSwatch.style.backgroundColor = borderHex;
                        borderSwatch.dataset.hex = borderHex;
                        borderSwatch.style.display = "inline-block";
                      });
                    });
                  };

                  const renderList = () => {
                    const list = document.getElementById("ccList");
                    list.innerHTML = "";
                    document.getElementById("ccCount").textContent = allControls.length;
                    const btn = document.getElementById("ccListToggle");
                    const isActive = btn.classList.contains("${v}");
                    if (allControls.length === 0) {
                      list.style.display = "none";
                      return;
                    }
                    if (isActive) {
                      list.style.display = "flex";
                    }
                    allControls.forEach((cc) => {
                      const item = document.createElement("div");
                      item.className = "cc-item_nGPI" + (cc["InternalId"] === selectedId ? " cc-item-active_xmw_" : "");
                      item.dataset.id = cc["InternalId"];
                      const tag = cc["Tag"] || "\u{2014}";
                      const lock = cc["Lock"] ?? "";
                      item.innerHTML = '<span class="${E}">Tag: ' + tag + '</span>'
                        + '<span class="${E}">ID: ' + cc["InternalId"] + '</span>';
                      item.addEventListener("click", () => {
                        selectedId = cc["InternalId"];
                        connector.executeMethod("SelectContentControl", [selectedId], () => {
                          loadProperties();
                          renderList();
                        });
                      });
                      list.appendChild(item);
                    });
                  };

                  const refreshCount = () => {
                    connector.executeMethod("GetAllContentControls", null, (data) => {
                      allControls = data;
                      renderList();
                    });
                  };

                  const addByType = (type) => {
                    const commonPr = { Lock: 0 };
                    switch (type) {
                      case "block":
                        connector.executeMethod("AddContentControl", [1, commonPr], refreshCount);
                        break;
                      case "datePicker":
                        connector.executeMethod("AddContentControlDatePicker", [
                          { DateFormat: "DD MMMM YYYY", Date: new Date().toISOString() },
                          commonPr
                        ], refreshCount);
                        break;
                      case "picture":
                        connector.executeMethod("AddContentControlPicture", [commonPr], refreshCount);
                        break;
                      case "comboBox":
                        connector.executeMethod("AddContentControlList", [1,
                          [{ Display: "Option 1", Value: "1" }, { Display: "Option 2", Value: "2" }],
                          commonPr
                        ], refreshCount);
                        break;
                      case "checkBox":
                        connector.executeMethod("AddContentControlCheckBox", [
                          { Checked: false },
                          commonPr
                        ], refreshCount);
                        break;
                    }
                  };

                  document.querySelectorAll(".${f}").forEach((badge) => {
                    badge.addEventListener("click", () => {
                      addByType(badge.dataset.type);
                    });
                  });

                  document.getElementById("ccListToggle").addEventListener("click", () => {
                    const list = document.getElementById("ccList");
                    const btn = document.getElementById("ccListToggle");
                    const isActive = btn.classList.contains("${v}");
                    if (isActive) {
                      list.style.display = "none";
                      btn.classList.remove("${v}");
                    } else {
                      btn.classList.add("${v}");
                      renderList();
                    }
                  });

                  let activeColorTarget = null;

                  document.querySelectorAll(".${w}").forEach((swatch) => {
                    swatch.addEventListener("click", () => {
                      activeColorTarget = swatch;
                      const input = document.getElementById("ccColorInput");
                      input.value = swatch.dataset.hex || "#DCDCDC";
                      input.click();
                    });
                  });

                  document.getElementById("ccColorInput").addEventListener("input", (e) => {
                    if (activeColorTarget) {
                      activeColorTarget.style.backgroundColor = e.target.value;
                      activeColorTarget.dataset.hex = e.target.value;
                    }
                  });

                  document.getElementById("ccApply").addEventListener("click", () => {
                    if (!selectedId || !currentProps) return;
                    const parseHex = (hex) => ({
                      r: parseInt(hex.slice(1, 3), 16),
                      g: parseInt(hex.slice(3, 5), 16),
                      b: parseInt(hex.slice(5, 7), 16),
                    });
                    const bg = parseHex(document.getElementById("ccBgColor").dataset.hex || "#DCDCDC");
                    const border = parseHex(document.getElementById("ccBorderColor").dataset.hex || "#DCDCDC");

                    const id = document.getElementById("ccId").value;
                    const tag = document.getElementById("ccTag").value;
                    const lock = document.getElementById("ccLock").value;
                    const appearance = document.getElementById("ccAppearance").value;
                    const internalId = selectedId;

                    Asc.scope.ccProps = { internalId, id, tag, lock, appearance, bg, border };
                    connector.callCommand(() => {
                      const p = Asc.scope.ccProps;
                      const doc = Api.GetDocument();
                      const controls = doc.GetAllContentControls();
                      for (let i = 0; i < controls.length; i++) {
                        const cc = controls[i];
                        if (cc.GetInternalId() === p.internalId) {
                          cc.SetId(p.id);
                          cc.SetTag(p.tag);
                          cc.SetLock(p.lock);
                          cc.SetAppearance(p.appearance);
                          cc.SetBackgroundColor(Api.RGBA(p.bg.r, p.bg.g, p.bg.b, 255));
                          cc.SetBorderColor(Api.RGBA(p.border.r, p.border.g, p.border.b, 255));
                          break;
                        }
                      }
                    }, () => {
                      loadProperties();
                      refreshCount();
                    });
                  });

                  document.getElementById("ccRemove").addEventListener("click", (e) => {
                    if (e.currentTarget.classList.contains("${R}")) return;
                    if (!selectedId) return;
                    connector.executeMethod("RemoveContentControl", [selectedId], () => {
                      selectedId = null;
                      currentProps = null;
                      refreshCount();
                      document.getElementById("ccDetails").style.display = "none";
                      document.getElementById("ccEmpty").style.display = "block";
                      document.getElementById("ccRemove").classList.add("${R}");
                    });
                  });
                `}})})]})})}),_="nav-btn_Jjtr",S="disabled_lv3a",A="option-label_f0HK",k="empty-state_FwMU",M=()=>(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("div",{className:"demo-section_FZC7",children:(0,o.jsxs)("div",{className:"demo-layout_cfZB",children:[(0,o.jsxs)("div",{className:"search-panel_v_Ob",children:[(0,o.jsxs)("div",{className:"panel-header_Tu6P",children:[(0,o.jsxs)("div",{className:"panel-header-left_ripU",children:[(0,o.jsx)("span",{className:"panel-title_ilB8",children:"SEARCH IN PDF"}),(0,o.jsxs)("span",{id:"resultsBadge",className:"results-badge_dE5J",style:{display:"none"},children:[(0,o.jsx)("span",{id:"totalCount",children:"0"})," results"]})]}),(0,o.jsxs)("div",{className:"panel-nav_jBKK",children:[(0,o.jsx)("button",{id:"prevResult",className:`${_} ${S}`,children:"\u2039"}),(0,o.jsx)("button",{id:"nextResult",className:`${_} ${S}`,children:"\u203A"})]})]}),(0,o.jsxs)("div",{className:"panel-body_TM4M",children:[(0,o.jsxs)("div",{className:"search-row_M1Uf",children:[(0,o.jsx)("input",{id:"searchInput",className:"search-input_RAjC",type:"text",placeholder:"Enter search text..."}),(0,o.jsx)("button",{id:"searchBtn",className:"search-btn_nAHd",children:"Search"})]}),(0,o.jsxs)("div",{className:"options-group_deo8",children:[(0,o.jsxs)("label",{className:A,children:[(0,o.jsx)("input",{id:"matchCase",type:"checkbox"}),"Case sensitive"]}),(0,o.jsxs)("label",{className:A,children:[(0,o.jsx)("input",{id:"wholeWords",type:"checkbox"}),"Whole word"]})]}),(0,o.jsx)("div",{id:"resultsList",className:"results-list_VuOa"}),(0,o.jsx)("div",{id:"emptyState",className:k,style:{display:"none"},children:"No results found."}),(0,o.jsx)("div",{id:"initialState",className:k,children:"Enter a search term and click Search to find and highlight text in the PDF."})]}),(0,o.jsx)("div",{className:"panel-actions_qnDo",children:(0,o.jsx)("button",{id:"clearBtn",className:`btn_uJs_ ${S}`,children:"Clear highlights"})})]}),(0,o.jsx)("div",{className:"editor-column_BXcB",children:(0,o.jsx)(a.A,{fileType:"pdf",code:"",height:"100%",isDemo:!0,config:{editorConfig:{customization:{compactToolbar:!0}}},externalScript:{beforeDocumentReady:`
                  let searchResults = [];
                  let activeIndex = -1;
                `,onDocumentReady:"",otherFunctional:`
                  var navigateToResult = function(index) {
                    if (index < 0 || index >= searchResults.length) return;
                    var result = searchResults[index];
                    Asc.scope.navTarget = { pageIndex: result.pageIndex, quad: result.quad };
                    connector.callCommand(function() {
                      var target = Asc.scope.navTarget;
                      var doc = Api.GetDocument();
                      var page = doc.GetPage(target.pageIndex);
                      var q = target.quad;
                      page.SetSelection({ x: q[0], y: q[1] }, { x: q[2], y: q[3] });
                    });
                  };

                  var renderResults = function() {
                    var list = document.getElementById("resultsList");
                    var badge = document.getElementById("resultsBadge");
                    var empty = document.getElementById("emptyState");
                    var initial = document.getElementById("initialState");
                    var clearBtn = document.getElementById("clearBtn");
                    var prevBtn = document.getElementById("prevResult");
                    var nextBtn = document.getElementById("nextResult");

                    initial.style.display = "none";
                    list.innerHTML = "";

                    if (searchResults.length === 0) {
                      badge.style.display = "none";
                      empty.style.display = "block";
                      clearBtn.classList.add("${S}");
                      prevBtn.classList.add("${S}");
                      nextBtn.classList.add("${S}");
                      return;
                    }

                    badge.style.display = "inline";
                    document.getElementById("totalCount").textContent = searchResults.length;
                    empty.style.display = "none";
                    clearBtn.classList.remove("${S}");

                    if (activeIndex <= 0) {
                      prevBtn.classList.add("${S}");
                    } else {
                      prevBtn.classList.remove("${S}");
                    }
                    if (activeIndex >= searchResults.length - 1) {
                      nextBtn.classList.add("${S}");
                    } else {
                      nextBtn.classList.remove("${S}");
                    }

                    searchResults.forEach(function(result, idx) {
                      var item = document.createElement("div");
                      item.className = "result-item_BEof" + (idx === activeIndex ? " result-item-active_nNXu" : "");
                      item.addEventListener("click", function() {
                        activeIndex = idx;
                        renderResults();
                        navigateToResult(idx);
                      });

                      var indexSpan = document.createElement("span");
                      indexSpan.className = "result-index_QrsN";
                      indexSpan.textContent = "Result " + (idx + 1);
                      item.appendChild(indexSpan);

                      var pageSpan = document.createElement("span");
                      pageSpan.className = "result-page_jXuN";
                      pageSpan.textContent = "Page " + (result.pageIndex + 1);
                      item.appendChild(pageSpan);

                      list.appendChild(item);
                    });
                  };

                  var performSearch = function() {
                    var text = document.getElementById("searchInput").value.trim();
                    if (!text) return;

                    var matchCase = document.getElementById("matchCase").checked;
                    var wholeWords = document.getElementById("wholeWords").checked;

                    Asc.scope.searchParams = { text: text, matchCase: matchCase, wholeWords: wholeWords };

                    connector.callCommand(function() {
                      var params = Asc.scope.searchParams;
                      var doc = Api.GetDocument();
                      var pageCount = doc.GetPagesCount();

                      // Clear existing search highlights
                      for (var i = 0; i < pageCount; i++) {
                        var page = doc.GetPage(i);
                        var annots = page.GetAllAnnots();
                        for (var j = annots.length - 1; j >= 0; j--) {
                          try {
                            if (annots[j].GetAuthorName() === "__search_demo__") {
                              annots[j].Delete();
                            }
                          } catch(e) {}
                        }
                      }

                      // Perform search and highlight
                      var results = [];
                      for (var i = 0; i < pageCount; i++) {
                        var page = doc.GetPage(i);
                        var quads = page.Search({
                          text: params.text,
                          matchCase: params.matchCase,
                          wholeWords: params.wholeWords
                        });

                        if (quads && quads.length > 0) {
                          for (var q = 0; q < quads.length; q++) {
                            var annot = Api.CreateHighlightAnnot([quads[q]]);
                            annot.SetAuthorName("__search_demo__");
                            annot.SetFillColor(Api.RGB(255, 234, 0));
                            page.AddObject(annot);
                            results.push({ pageIndex: i, quad: quads[q] });
                          }
                        }
                      }

                      return results;
                    }, function(results) {
                      searchResults = results || [];
                      activeIndex = searchResults.length > 0 ? 0 : -1;
                      renderResults();
                      if (activeIndex >= 0) {
                        navigateToResult(0);
                      }
                    });
                  };

                  var clearHighlights = function() {
                    connector.callCommand(function() {
                      var doc = Api.GetDocument();
                      var pageCount = doc.GetPagesCount();
                      for (var i = 0; i < pageCount; i++) {
                        var page = doc.GetPage(i);
                        var annots = page.GetAllAnnots();
                        for (var j = annots.length - 1; j >= 0; j--) {
                          try {
                            if (annots[j].GetAuthorName() === "__search_demo__") {
                              annots[j].Delete();
                            }
                          } catch(e) {}
                        }
                      }
                    }, function() {
                      searchResults = [];
                      activeIndex = -1;
                      document.getElementById("resultsBadge").style.display = "none";
                      document.getElementById("resultsList").innerHTML = "";
                      document.getElementById("emptyState").style.display = "none";
                      document.getElementById("initialState").style.display = "block";
                      document.getElementById("clearBtn").classList.add("${S}");
                      document.getElementById("prevResult").classList.add("${S}");
                      document.getElementById("nextResult").classList.add("${S}");
                    });
                  };

                  document.getElementById("searchBtn").addEventListener("click", performSearch);

                  document.getElementById("searchInput").addEventListener("keydown", function(e) {
                    if (e.key === "Enter") {
                      performSearch();
                    }
                  });

                  document.getElementById("prevResult").addEventListener("click", function(e) {
                    if (e.currentTarget.classList.contains("${S}")) return;
                    if (activeIndex > 0) {
                      activeIndex--;
                      renderResults();
                      navigateToResult(activeIndex);
                    }
                  });

                  document.getElementById("nextResult").addEventListener("click", function(e) {
                    if (e.currentTarget.classList.contains("${S}")) return;
                    if (activeIndex < searchResults.length - 1) {
                      activeIndex++;
                      renderResults();
                      navigateToResult(activeIndex);
                    }
                  });

                  document.getElementById("clearBtn").addEventListener("click", function(e) {
                    if (e.currentTarget.classList.contains("${S}")) return;
                    clearHighlights();
                  });
                `}})})]})})}),P="option-label_NGqi",$="result-item_Nsu5",F="result-index_NnoS",G="result-page_JCcy",O="empty-state_jhEe",W="btn_uT6c",H="disabled_izPE",J=()=>(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("div",{className:"demo-section_QfyA",children:(0,o.jsxs)("div",{className:"demo-layout_k0gQ",children:[(0,o.jsxs)("div",{className:"redact-panel_c1wW",children:[(0,o.jsx)("div",{className:"panel-header_QXe7",children:(0,o.jsxs)("div",{className:"panel-header-left_I13V",children:[(0,o.jsx)("span",{className:"panel-title_GVR2",children:"REDACT IN PDF"}),(0,o.jsxs)("span",{id:"redactBadge",className:"results-badge_lMAl",style:{display:"none"},children:[(0,o.jsx)("span",{id:"redactTotalCount",children:"0"})," matches"]})]})}),(0,o.jsxs)("div",{className:"panel-body_ChWk",children:[(0,o.jsxs)("div",{className:"search-row_uFtZ",children:[(0,o.jsx)("input",{id:"redactInput",className:"search-input_Q607",type:"text",placeholder:"Enter text to redact..."}),(0,o.jsx)("button",{id:"redactSearchBtn",className:"search-btn_Se9v",children:"Find"})]}),(0,o.jsxs)("div",{className:"options-group_i9w9",children:[(0,o.jsxs)("label",{className:P,children:[(0,o.jsx)("input",{id:"redactMatchCase",type:"checkbox"}),"Case sensitive"]}),(0,o.jsxs)("label",{className:P,children:[(0,o.jsx)("input",{id:"redactWholeWords",type:"checkbox"}),"Whole word"]})]}),(0,o.jsx)("div",{id:"redactResultsList",className:"results-list_icms"}),(0,o.jsx)("div",{id:"redactEmptyState",className:O,style:{display:"none"},children:"No matches found."}),(0,o.jsx)("div",{id:"redactInitialState",className:O,children:"Enter text and click Find to locate and mark it for redaction in the PDF."})]}),(0,o.jsxs)("div",{className:"panel-actions_aaSi",children:[(0,o.jsx)("button",{id:"applyRedactBtn",className:`${W} btn-danger_hcNC ${H}`,children:"Apply redaction"}),(0,o.jsx)("button",{id:"clearRedactBtn",className:`${W} ${H}`,children:"Clear marks"})]})]}),(0,o.jsx)("div",{className:"editor-column_mE6m",children:(0,o.jsx)(a.A,{fileType:"pdf",code:"",height:"100%",isDemo:!0,config:{editorConfig:{customization:{compactToolbar:!0}}},externalScript:{beforeDocumentReady:`
                  let redactAnnotIds = [];
                  let redactCount = 0;
                `,onDocumentReady:"",otherFunctional:`
                  var renderRedactResults = function() {
                    var list = document.getElementById("redactResultsList");
                    var badge = document.getElementById("redactBadge");
                    var empty = document.getElementById("redactEmptyState");
                    var initial = document.getElementById("redactInitialState");
                    var applyBtn = document.getElementById("applyRedactBtn");
                    var clearBtn = document.getElementById("clearRedactBtn");

                    initial.style.display = "none";
                    list.innerHTML = "";

                    if (redactCount === 0) {
                      badge.style.display = "none";
                      empty.style.display = "block";
                      applyBtn.classList.add("${H}");
                      clearBtn.classList.add("${H}");
                      return;
                    }

                    badge.style.display = "inline";
                    document.getElementById("redactTotalCount").textContent = redactCount;
                    empty.style.display = "none";
                    applyBtn.classList.remove("${H}");
                    clearBtn.classList.remove("${H}");

                    var info = document.createElement("div");
                    info.className = "${$}";

                    var indexSpan = document.createElement("span");
                    indexSpan.className = "${F}";
                    indexSpan.textContent = redactCount + " redaction mark" + (redactCount !== 1 ? "s" : "") + " added";
                    info.appendChild(indexSpan);

                    var statusSpan = document.createElement("span");
                    statusSpan.className = "${G}";
                    statusSpan.textContent = "Pending";
                    info.appendChild(statusSpan);

                    list.appendChild(info);
                  };

                  var performRedactSearch = function() {
                    var text = document.getElementById("redactInput").value.trim();
                    if (!text) return;

                    var matchCase = document.getElementById("redactMatchCase").checked;
                    var wholeWords = document.getElementById("redactWholeWords").checked;

                    Asc.scope.redactParams = { text: text, matchCase: matchCase, wholeWords: wholeWords };

                    connector.callCommand(function() {
                      var params = Asc.scope.redactParams;
                      var doc = Api.GetDocument();
                      var annots = doc.SearchAndRedact({
                        text: params.text,
                        matchCase: params.matchCase,
                        wholeWords: params.wholeWords
                      });
                      var ids = [];
                      if (annots && annots.length > 0) {
                        for (var i = 0; i < annots.length; i++) {
                          ids.push(annots[i].GetInternalId());
                        }
                      }
                      return { count: ids.length, ids: ids };
                    }, function(result) {
                      if (result) {
                        redactCount = result.count;
                        redactAnnotIds = result.ids;
                      } else {
                        redactCount = 0;
                        redactAnnotIds = [];
                      }
                      renderRedactResults();
                    });
                  };

                  var applyRedaction = function() {
                    connector.callCommand(function() {
                      var doc = Api.GetDocument();
                      doc.ApplyRedact();
                      return true;
                    }, function() {
                      redactAnnotIds = [];
                      redactCount = 0;

                      var list = document.getElementById("redactResultsList");
                      list.innerHTML = "";

                      var info = document.createElement("div");
                      info.className = "${$} result-item-applied_tnYB";

                      var indexSpan = document.createElement("span");
                      indexSpan.className = "${F}";
                      indexSpan.textContent = "Redaction applied";
                      info.appendChild(indexSpan);

                      var statusSpan = document.createElement("span");
                      statusSpan.className = "${G}";
                      statusSpan.textContent = "Done";
                      info.appendChild(statusSpan);

                      list.appendChild(info);

                      document.getElementById("redactBadge").style.display = "none";
                      document.getElementById("applyRedactBtn").classList.add("${H}");
                      document.getElementById("clearRedactBtn").classList.add("${H}");
                    });
                  };

                  var clearRedactMarks = function() {
                    Asc.scope.annotIds = redactAnnotIds;
                    connector.callCommand(function() {
                      var ids = Asc.scope.annotIds;
                      var doc = Api.GetDocument();
                      var pageCount = doc.GetPagesCount();
                      for (var i = 0; i < pageCount; i++) {
                        var page = doc.GetPage(i);
                        var annots = page.GetAllAnnots();
                        for (var j = annots.length - 1; j >= 0; j--) {
                          for (var k = 0; k < ids.length; k++) {
                            if (annots[j].GetInternalId() === ids[k]) {
                              annots[j].Delete();
                              break;
                            }
                          }
                        }
                      }
                    }, function() {
                      redactAnnotIds = [];
                      redactCount = 0;
                      document.getElementById("redactBadge").style.display = "none";
                      document.getElementById("redactResultsList").innerHTML = "";
                      document.getElementById("redactEmptyState").style.display = "none";
                      document.getElementById("redactInitialState").style.display = "block";
                      document.getElementById("applyRedactBtn").classList.add("${H}");
                      document.getElementById("clearRedactBtn").classList.add("${H}");
                    });
                  };

                  document.getElementById("redactSearchBtn").addEventListener("click", performRedactSearch);

                  document.getElementById("redactInput").addEventListener("keydown", function(e) {
                    if (e.key === "Enter") {
                      performRedactSearch();
                    }
                  });

                  document.getElementById("applyRedactBtn").addEventListener("click", function(e) {
                    if (e.currentTarget.classList.contains("${H}")) return;
                    applyRedaction();
                  });

                  document.getElementById("clearRedactBtn").addEventListener("click", function(e) {
                    if (e.currentTarget.classList.contains("${H}")) return;
                    clearRedactMarks();
                  });
                `}})})]})})}),U="input-group_KIl4",q="input-label_jkqY",V="text-input_Sl05",z="empty-state_HB6I",K=()=>(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("div",{className:"demo-section_jOEU",children:(0,o.jsxs)("div",{className:"demo-layout_U9v4",children:[(0,o.jsxs)("div",{className:"replace-panel_AaEh",children:[(0,o.jsx)("div",{className:"panel-header_oRm7",children:(0,o.jsxs)("div",{className:"panel-header-left_D15d",children:[(0,o.jsx)("span",{className:"panel-title_F68T",children:"CHANGE TEXT IN PDF"}),(0,o.jsxs)("span",{id:"replaceBadge",className:"results-badge_OojW",style:{display:"none"},children:[(0,o.jsx)("span",{id:"replaceTotalCount",children:"0"})," replaced"]})]})}),(0,o.jsxs)("div",{className:"panel-body_pQUD",children:[(0,o.jsxs)("div",{className:U,children:[(0,o.jsx)("label",{className:q,children:"Find"}),(0,o.jsx)("input",{id:"replaceSearchInput",className:V,type:"text",placeholder:"Enter text to find..."})]}),(0,o.jsxs)("div",{className:U,children:[(0,o.jsx)("label",{className:q,children:"Replace with"}),(0,o.jsx)("input",{id:"replaceWithInput",className:V,type:"text",placeholder:"Enter replacement text..."})]}),(0,o.jsx)("div",{className:"options-group_X2Fz",children:(0,o.jsxs)("label",{className:"option-label_sxI_",children:[(0,o.jsx)("input",{id:"replaceMatchCase",type:"checkbox"}),"Case sensitive"]})}),(0,o.jsx)("div",{id:"replaceResultsList",className:"results-list_q6io"}),(0,o.jsx)("div",{id:"replaceEmptyState",className:z,style:{display:"none"},children:"No matches found."}),(0,o.jsx)("div",{id:"replaceInitialState",className:z,children:"Enter text to find and its replacement, then click Replace all to change text in the PDF."})]}),(0,o.jsx)("div",{className:"panel-actions_J0eU",children:(0,o.jsx)("button",{id:"replaceAllBtn",className:"replace-btn_FwbX",children:"Replace all"})})]}),(0,o.jsx)("div",{className:"editor-column_R86r",children:(0,o.jsx)(a.A,{fileType:"pdf",code:"",height:"100%",isDemo:!0,config:{editorConfig:{customization:{compactToolbar:!0}}},externalScript:{beforeDocumentReady:`
                  let replaceResults = [];
                `,onDocumentReady:"",otherFunctional:`
                  var renderReplaceResults = function() {
                    var list = document.getElementById("replaceResultsList");
                    var badge = document.getElementById("replaceBadge");
                    var empty = document.getElementById("replaceEmptyState");
                    var initial = document.getElementById("replaceInitialState");

                    initial.style.display = "none";
                    list.innerHTML = "";

                    if (replaceResults.length === 0) {
                      badge.style.display = "none";
                      empty.style.display = "block";
                      return;
                    }

                    var totalCount = 0;
                    for (var i = 0; i < replaceResults.length; i++) {
                      totalCount += replaceResults[i].count;
                    }

                    badge.style.display = "inline";
                    document.getElementById("replaceTotalCount").textContent = totalCount;
                    empty.style.display = "none";

                    for (var i = 0; i < replaceResults.length; i++) {
                      var r = replaceResults[i];
                      var item = document.createElement("div");
                      item.className = "result-item_LKf8";

                      var indexSpan = document.createElement("span");
                      indexSpan.className = "result-index_gsaD";
                      indexSpan.textContent = r.count + " replacement" + (r.count !== 1 ? "s" : "");
                      item.appendChild(indexSpan);

                      var pageSpan = document.createElement("span");
                      pageSpan.className = "result-page_JD_w";
                      pageSpan.textContent = "Page " + (r.pageIndex + 1);
                      item.appendChild(pageSpan);

                      list.appendChild(item);
                    }
                  };

                  var performReplaceAll = function() {
                    var findText = document.getElementById("replaceSearchInput").value.trim();
                    var replaceWith = document.getElementById("replaceWithInput").value;
                    if (!findText) return;

                    var matchCase = document.getElementById("replaceMatchCase").checked;

                    Asc.scope.replaceParams = { findText: findText, replaceWith: replaceWith, matchCase: matchCase };

                    connector.callCommand(function() {
                      var params = Asc.scope.replaceParams;
                      var regex = params.matchCase ? null : new RegExp(params.findText.replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&"), "gi");
                      var doc = Api.GetDocument();
                      var pageCount = doc.GetPagesCount();
                      var results = [];

                      for (var i = 0; i < pageCount; i++) {
                        var page = doc.GetPage(i);
                        var drawings = page.RecognizeContent();
                        var pageReplacements = 0;

                        for (var d = 0; d < drawings.length; d++) {
                          var drawing = drawings[d];
                          var classType = drawing.GetClassType();

                          if (classType === "shape") {
                            var content = drawing.GetContent();
                            var elemCount = content.GetElementsCount();
                            for (var e = 0; e < elemCount; e++) {
                              var elem = content.GetElement(e);
                              if (elem.GetClassType() === "paragraph") {
                                var text = elem.GetText();
                                var newText;
                                if (params.matchCase) {
                                  var pos = 0;
                                  var count = 0;
                                  newText = "";
                                  while (pos < text.length) {
                                    var idx = text.indexOf(params.findText, pos);
                                    if (idx === -1) {
                                      newText += text.substring(pos);
                                      break;
                                    }
                                    newText += text.substring(pos, idx) + params.replaceWith;
                                    count++;
                                    pos = idx + params.findText.length;
                                  }
                                  if (count > 0) {
                                    elem.SetText(newText);
                                    pageReplacements += count;
                                  }
                                } else {
                                  var matches = text.match(regex);
                                  if (matches && matches.length > 0) {
                                    newText = text.replace(regex, params.replaceWith);
                                    elem.SetText(newText);
                                    pageReplacements += matches.length;
                                  }
                                }
                              }
                            }
                          } else if (classType === "table") {
                            var rowCount = drawing.GetRowsCount();
                            for (var row = 0; row < rowCount; row++) {
                              var tableRow = drawing.GetRow(row);
                              var cellCount = tableRow.GetCellsCount();
                              for (var cell = 0; cell < cellCount; cell++) {
                                var tableCell = tableRow.GetCell(cell);
                                var cellText = tableCell.GetText();
                                var cellNewText;
                                if (params.matchCase) {
                                  var cPos = 0;
                                  var cCount = 0;
                                  cellNewText = "";
                                  while (cPos < cellText.length) {
                                    var cIdx = cellText.indexOf(params.findText, cPos);
                                    if (cIdx === -1) {
                                      cellNewText += cellText.substring(cPos);
                                      break;
                                    }
                                    cellNewText += cellText.substring(cPos, cIdx) + params.replaceWith;
                                    cCount++;
                                    cPos = cIdx + params.findText.length;
                                  }
                                  if (cCount > 0) {
                                    tableCell.SetText(cellNewText);
                                    pageReplacements += cCount;
                                  }
                                } else {
                                  var cMatches = cellText.match(regex);
                                  if (cMatches && cMatches.length > 0) {
                                    cellNewText = cellText.replace(regex, params.replaceWith);
                                    tableCell.SetText(cellNewText);
                                    pageReplacements += cMatches.length;
                                  }
                                }
                              }
                            }
                          }
                        }

                        if (pageReplacements > 0) {
                          results.push({ pageIndex: i, count: pageReplacements });
                        }
                      }

                      return results;
                    }, function(results) {
                      replaceResults = results || [];
                      renderReplaceResults();
                    });
                  };

                  document.getElementById("replaceAllBtn").addEventListener("click", performReplaceAll);

                  document.getElementById("replaceSearchInput").addEventListener("keydown", function(e) {
                    if (e.key === "Enter") {
                      performReplaceAll();
                    }
                  });

                  document.getElementById("replaceWithInput").addEventListener("keydown", function(e) {
                    if (e.key === "Enter") {
                      performReplaceAll();
                    }
                  });
                `}})})]})})})},28453:(e,t,n)=>{n.d(t,{R:()=>c,x:()=>l});var a=n(296540);let o={},s=a.createContext(o);function c(e){let t=a.useContext(s);return a.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:c(e.components),a.createElement(s.Provider,{value:t},e.children)}}}]);