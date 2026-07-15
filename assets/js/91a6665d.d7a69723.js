"use strict";(self.webpackChunkapi_onlyoffice_com=self.webpackChunkapi_onlyoffice_com||[]).push([[723379],{721181:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>d});let o=JSON.parse('{"id":"docs/docs-api/samples/automation-api/working-with-review-changes","title":"Working with review changes","description":"Accept or reject tracked changes from an external UI via the Automation API.","source":"@site/site/docs/docs-api/samples/automation-api/working-with-review-changes.md","sourceDirName":"docs/docs-api/samples/automation-api","slug":"/docs/docs-api/samples/automation-api/working-with-review-changes","permalink":"/api.onlyoffice.com/docs/docs-api/samples/automation-api/working-with-review-changes","draft":false,"unlisted":false,"editUrl":"https://github.com/ONLYOFFICE/api.onlyoffice.com/tree/master/site/docs/docs-api/samples/automation-api/working-with-review-changes.md","tags":[{"inline":true,"label":"Docs","permalink":"/api.onlyoffice.com/tags/docs"},{"inline":true,"label":"Integration","permalink":"/api.onlyoffice.com/tags/integration"},{"inline":true,"label":"External access","permalink":"/api.onlyoffice.com/tags/external-access"},{"inline":true,"label":"Automation API","permalink":"/api.onlyoffice.com/tags/automation-api"}],"version":"current","sidebarPosition":-2,"frontMatter":{"sidebar_position":-2,"hide_table_of_contents":true,"description":"Accept or reject tracked changes from an external UI via the Automation API.","tags":["Docs","Integration","External access","Automation API"]},"sidebar":"docsDocs","previous":{"title":"Working with comments","permalink":"/api.onlyoffice.com/docs/docs-api/samples/automation-api/working-with-comments"},"next":{"title":"Filling out the form","permalink":"/api.onlyoffice.com/docs/docs-api/samples/automation-api/filling-out-the-form"}}');var a=n(474848),c=n(28453),s=n(141543);let i={sidebar_position:-2,hide_table_of_contents:!0,description:"Accept or reject tracked changes from an external UI via the Automation API.",tags:["Docs","Integration","External access","Automation API"]},r="Working with review changes",l={},d=[{value:"How it works",id:"how-it-works",level:2}];function m(e){let t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,c.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"working-with-review-changes",children:"Working with review changes"})}),"\n",(0,a.jsx)(t.p,{children:"Use the Automation API to accept or reject tracked changes from an external UI \u2014 without the user touching the editor directly."}),"\n",(0,a.jsx)(t.admonition,{type:"info",children:(0,a.jsxs)(t.p,{children:["The document opens in ",(0,a.jsx)(t.strong,{children:"Track Changes"})," mode. Your code calls ",(0,a.jsx)(t.code,{children:"connector.executeMethod()"})," to navigate and resolve changes. The editor updates in real time."]})}),"\n",(0,a.jsx)(s.Yr,{}),"\n",(0,a.jsx)(t.h2,{id:"how-it-works",children:"How it works"}),"\n",(0,a.jsxs)(t.ol,{children:["\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsxs)(t.p,{children:["On document ready, the total number of review changes is retrieved using ",(0,a.jsx)(t.a,{href:"/api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetReviewReport",children:"GetReviewReport"})," via ",(0,a.jsx)(t.code,{children:"connector.callCommand"})," and displayed in the counter:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-ts",children:"connector.callCommand(() => {\r\n  const doc = Api.GetDocument();\r\n  const report = doc.GetReviewReport();\r\n  let total = 0;\r\n  for (const user in report) {\r\n    total += report[user].length;\r\n  }\r\n  return total;\r\n}, (total) => {\r\n  reviewCount = total;\r\n  reviewIndex = total > 0 ? 1 : 0;\r\n  updateCounter();\r\n});\n"})}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsxs)(t.p,{children:["When the user clicks the ",(0,a.jsx)(t.strong,{children:"Accept / Reject"})," buttons in the custom interface, the ",(0,a.jsx)(t.a,{href:"/api.onlyoffice.com/docs/plugins/interacting-with-editors/document-api/Methods/AcceptReviewChanges",children:"AcceptReviewChanges"})," / ",(0,a.jsx)(t.a,{href:"/api.onlyoffice.com/docs/plugins/interacting-with-editors/document-api/Methods/RejectReviewChanges",children:"RejectReviewChanges"})," methods are executed to accept / reject the selected change in the editor:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-ts",children:'document.getElementById("accept").addEventListener("click", () => {\r\n  connector.executeMethod("AcceptReviewChanges");\r\n});\r\ndocument.getElementById("reject").addEventListener("click", () => {\r\n  connector.executeMethod("RejectReviewChanges");\r\n});\n'})}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsxs)(t.p,{children:["When the user clicks the ",(0,a.jsx)(t.strong,{children:"Prev / Next"})," buttons in the custom interface, the ",(0,a.jsx)(t.a,{href:"/api.onlyoffice.com/docs/plugins/interacting-with-editors/document-api/Methods/MoveToNextReviewChange",children:"MoveToNextReviewChange"})," method is executed to navigate between review changes:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-ts",children:'document.getElementById("prev").addEventListener("click", () => {\r\n  connector.executeMethod("MoveToNextReviewChange", [false]);\r\n});\r\ndocument.getElementById("next").addEventListener("click", () => {\r\n  connector.executeMethod("MoveToNextReviewChange");\r\n});\n'})}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(t.admonition,{type:"note",children:[(0,a.jsxs)(t.p,{children:["Please note that the connector is available only for ",(0,a.jsx)(t.strong,{children:"ONLYOFFICE Docs Developer"}),"."]}),(0,a.jsxs)(t.p,{children:["The connector is an additional feature not included by default in the ONLYOFFICE Docs Developer and is available at an extra cost. Please contact our sales team at ",(0,a.jsx)(t.a,{href:"mailto:sales@onlyoffice.com",children:"sales@onlyoffice.com"})," to request a quote."]})]})]})}function p(e={}){let{wrapper:t}={...(0,c.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(m,{...e})}):m(e)}},801690:(e,t,n)=>{n.d(t,{A:()=>d});var o=n(474848),a=n(296540),c=n(890062),s=n(733257);async function i(e,t){if(!t)return null;let n=e=>btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,""),o=n(JSON.stringify({typ:"JWT",alg:"HS256"})),a=n(JSON.stringify(e)),c=new TextEncoder,s={name:"HMAC",hash:"SHA-256"},i=await crypto.subtle.importKey("raw",c.encode(t),s,!1,["sign","verify"]),r=c.encode(`${o}.${a}`),l=n(String.fromCharCode(...new Uint8Array(await crypto.subtle.sign(s.name,i,r))));return`${o}.${a}.${l}`}let r="editorScript",l=async(e,t,n,o,a,c,s,l,d=!1,m=!1)=>{let p=document.createElement("script");p.id=r,p.type="text/javascript";let u=((e,t,n,o=!1,a=!1)=>({fileType:e,key:`doc-${Date.now()}`,title:n||`Example Document.${e}`,url:t||`https://static.onlyoffice.com/assets/docs/samples/${((e,t=!1,n=!1)=>t?n?"demo-invoice":"demo":"pdf"!==e||n?"new":"blank")(e,o,a)}.${e}`}))(t,a,s?.document?.title,d,m);s?.editorConfig?.customization?.logo?.image&&(s.editorConfig.customization.logo.image=new URL("/assets/images/try-docs/example-logo.png",window.location.origin).href),s?.editorConfig?.customization?.customer?.logo&&(s.editorConfig.customization.customer.logo=new URL("/assets/images/try-docs/example-logo-big.png",window.location.origin).href);let h=function e(t,...n){let o={...t};for(let t of n)for(let n in t){let a=o[n],c=t[n];c&&"object"==typeof c&&!Array.isArray(c)?o[n]=e(a&&"object"==typeof a?a:{},c):o[n]=c}return o}(s||{},{document:u,documentType:(e=>{switch(e){case"xlsx":case"xls":case"ods":case"csv":return"cell";case"pptx":case"ppsx":case"ppt":case"odp":return"slide";case"pdf":return"pdf";default:return"word"}})(t),editorConfig:{callbackUrl:"",customization:{anonymous:{request:!1},uiTheme:"dark"===o?"default-dark":"default-light",features:{featuresTips:!1},zoom:c}}}),g=await i(h,e);p.innerHTML=`
    if (window.docEditor) {
      window.docEditor.destroyEditor();
      window.docEditor = null;
    }

    (() => {
      ${l?.beforeDocumentReady}
      window.onDocumentReady = function() {
        window.connector = docEditor.createConnector();
        connector.callCommand(() => {
          ${n}
        }, () => {
        });
        ${l?.onDocumentReady}
      };

      const config = ${JSON.stringify(h)};
      config.token = "${g}";
      config.events = {
        onDocumentReady: window.onDocumentReady,
      };

      window.docEditor = new DocsAPI.DocEditor("placeholder", config);
      ${l?.otherFunctional}
    })();
  `,document.body.appendChild(p)},d=({fileType:e,code:t,height:n="700px",templateUrl:i,zoom:d,config:m,isDemo:p=!1,isForm:u=!1,externalScript:h={beforeDocumentReady:"",onDocumentReady:"",otherFunctional:""}})=>{let{siteConfig:{customFields:g}}=(0,c.default)(),{colorMode:C}=(0,s.G)(),x=g.documentServer,y=g.documentServerSecret;return(0,a.useEffect)(()=>{if("1"!==document.documentElement.getAttribute("data-script-api-state"))if("2"!==document.documentElement.getAttribute("data-script-api-state")){let n=new URL("/web-apps/apps/api/documents/api.js",x),o=document.createElement("script");o.type="text/javascript",o.src=n.toString(),o.onerror=()=>{console.error("Failed to load OnlyOffice API script.")},o.onload=()=>{document.documentElement.setAttribute("data-script-api-state","2"),l(y,e,t,C,i,d,m,h,p,u)},document.documentElement.setAttribute("data-script-api-state","1"),document.body.appendChild(o)}else l(y,e,t,C,i,d,m,h,p,u);return()=>{document.getElementById(r).remove()}},[]),(0,o.jsx)("div",{style:{height:n},children:(0,o.jsx)("div",{id:"placeholder"})})}},141543:(e,t,n)=>{n.d(t,{bY:()=>g,a1:()=>M,DW:()=>r,YK:()=>o.A,Yr:()=>y});var o=n(801690),a=n(474848);let c=JSON.parse('[{"Title":"Miss","LastName":"Robinson","FirstName":"Isabella","MiddleName":"Pierre","DateOfBirth":"14121987","Sex":"Female","Phone":"(972)234-8261","Email":"Isabella.Robinson@email.com","Number/street":"625 Hartin Cir","City":"Irving","PostalCode":"75061","Country":"U.S.A.","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Smith","FirstName":"Emma","MiddleName":"Summerscale","DateOfBirth":"23021978","Sex":"Female","Phone":"(972)321-8512","Email":"Emma.Smith@email.com","Number/street":"1502 Betsy Ln","City":"New York","PostalCode":"11225","Country":"U.S.A.","DateOfCompletion":"23052025"},{"Title":"Mrs","LastName":"Williams","FirstName":"Emily","MiddleName":"Marie","DateOfBirth":"07121998","Sex":"Female","Phone":"(972)343-5341","Email":"Emily.Williams@email.com","Number/street":"M\xf6ckernstra\xdfe 73A","City":"Berlin","PostalCode":"10965","Country":"Germany","DateOfCompletion":"23052025"},{"Title":"Miss","LastName":"Brown","FirstName":"Sophia","MiddleName":"Rike","DateOfBirth":"25022003","Sex":"Female","Phone":"(972)324-1532","Email":"Sophia.Brown@email.com","Number/street":"810 Julie Ave","City":"Fort Worth","PostalCode":"76116","Country":"U.S.A.","DateOfCompletion":"23052025"},{"Title":"Dr","LastName":"Davis","FirstName":"Olivia","MiddleName":"Heidi","DateOfBirth":"28071963","Sex":"Female","Phone":"(972)123-5231","Email":"Olivia.Davis@email.com","Number/street":"1908 Nelson Ave","City":"Las Vegas","PostalCode":"89032","Country":"U.S.A.","DateOfCompletion":"23052025"},{"Title":"Mrs","LastName":"Jones","FirstName":"Abigail","MiddleName":"Raffaela","DateOfBirth":"04101983","Sex":"Female","Phone":"(972)642-6223","Email":"Abigail.Jones@email.com","Number/street":"321 Exhibition Rd","City":"London","PostalCode":"SW7 2BX","Country":"United Kingdom","DateOfCompletion":"23052025"},{"Title":"Dr","LastName":"Hannah","FirstName":"Davis","MiddleName":"Lucas","DateOfBirth":"05011969","Sex":"Male","Phone":"(972)732-3532","Email":"Hannah.Davis@email.com","Number/street":"89 Paul Couturier","City":"Paris","PostalCode":"94250","Country":"France","DateOfCompletion":"23052025"},{"Title":"Mrs","LastName":"Smith","FirstName":"Samantha","MiddleName":"Sylvie","DateOfBirth":"20011988","Sex":"Female","Phone":"(972)531-6578","Email":"Samantha.Smith@email.com","Number/street":"50 Main St","City":"Centerfield","PostalCode":"84622","Country":"U.S.A.","DateOfCompletion":"23052025"},{"Title":"Miss","LastName":"Davis","FirstName":"Mia","MiddleName":"Maximilian","DateOfBirth":"24052000","Sex":"Female","Phone":"(972)928-8278","Email":"Mia.Davis@email.com","Number/street":"10 Rue du N","City":"Le Mans","PostalCode":"72100","Country":"France","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Taylor","FirstName":"Madison","MiddleName":"Gabriel","DateOfBirth":"30081998","Sex":"Male","Phone":"(972)098-6421","Email":"Madison.Taylor@email.com","Number/street":"322 Dickenson Rd","City":"Manchester","PostalCode":"M13 0WG","Country":"United Kingdom","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Brown","FirstName":"Jacob","MiddleName":"Hugo","DateOfBirth":"13121991","Sex":"Male","Phone":"(972)543-8465","Email":"Jacob.Brown@email.com","Number/street":"13 Hardman St","City":"Liverpool","PostalCode":"L1 9AS","Country":"United Kingdom","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Davis","FirstName":"Jason","MiddleName":"James","DateOfBirth":"04121987","Sex":"Male","Phone":"(972)543-9876","Email":"Jason.Davis@email.com","Number/street":"Richard-Wagner 32","City":"Frankfurt","PostalCode":"63069","Country":"Germany","DateOfCompletion":"23052025"},{"Title":"Dr","LastName":"Williams","FirstName":"Michael","MiddleName":"Elias","DateOfBirth":"11091981","Sex":"Male","Phone":"(972)123-7543","Email":"Michael.Williams@email.com","Number/street":"9 Cit\xe9 Roguet","City":"Toulouse","PostalCode":"31300","Country":"France","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Johnson","FirstName":"Christopher","MiddleName":"Jules","DateOfBirth":"16081983","Sex":"Male","Phone":"(972)763-5352","Email":"Christopher.Johnson@email.com","Number/street":"350 Grand Ave","City":"Los Angeles","PostalCode":"90071","Country":"U.S.A.","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Taylor","FirstName":"Ethan","MiddleName":"Edward","DateOfBirth":"31111997","Sex":"Male","Phone":"(972)234-6745","Email":"Ethan.Taylor@email.com","Number/street":"Heisterstra\xdfe 1","City":"N\xfcrnberg","PostalCode":"90441","Country":"Germany","DateOfCompletion":"23052025"},{"Title":"Miss","LastName":"Wright","FirstName":"Daniel","MiddleName":"Marie","DateOfBirth":"19042002","Sex":"Female","Phone":"(972)877-7687","Email":"Daniel.Wright@email.com","Number/street":"21 Rte de Capestang","City":"B\xe9ziers","PostalCode":"34500","Country":"France","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Jones","FirstName":"Matthew","MiddleName":"Henry","DateOfBirth":"04101983","Sex":"Male","Phone":"(972)546-8754","Email":"Matthew.Jones@email.com","Number/street":"Caspar-Voght 44","City":"Hamburg","PostalCode":"20535","Country":"Germany","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Wilson","FirstName":"Andrew","MiddleName":"Adelheid","DateOfBirth":"23041988","Sex":"Male","Phone":"(972)343-8675","Email":"Andrew.Wilson@email.com","Number/street":"925 Dickinson St,","City":"Philadelphia","PostalCode":"19147","Country":"U.S.A.","DateOfCompletion":"23052025"},{"Title":"Dr","LastName":"Robinson","FirstName":"William","MiddleName":"Leon","DateOfBirth":"15031975","Sex":"Male","Phone":"(972)301-5646","Email":"William.Robinson@email.com","Number/street":"98 Market Pl","City":"Romford","PostalCode":"RM1 3ER","Country":"United Kingdom","DateOfCompletion":"23052025"},{"Title":"Mr","LastName":"Johnson","FirstName":"Joshua","MiddleName":"Felix","DateOfBirth":"18061993","Sex":"Male","Phone":"(972)345-3453","Email":"Joshua.Johnson@email.com","Number/street":"21 Rond-point du Grand","City":"Montpellier","PostalCode":"34300","Country":"France","DateOfCompletion":"23052025"}]'),s={"demo-section":"demo-section_wLDO","demo-layout":"demo-layout_kwZw","form-panel":"form-panel_KRVe","panel-header":"panel-header_CJGM","panel-title":"panel-title_TkNF","panel-body":"panel-body_MS9Q","select-label":"select-label_c0Q7",persons:"persons_zwCI",controlsBlock:"controlsBlock_LXov","field-group":"field-group_aoaJ","field-label":"field-label_HbbG","field-input":"field-input_hUpl","radio-group":"radio-group_jbH0","radio-label":"radio-label_G3ui","radio-input":"radio-input_ddFG","editor-column":"editor-column_ZJfL"},i=JSON.stringify(c),r=()=>(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:s["demo-section"],children:(0,a.jsxs)("div",{className:s["demo-layout"],children:[(0,a.jsxs)("div",{className:s["form-panel"],children:[(0,a.jsx)("div",{className:s["panel-header"],children:(0,a.jsx)("span",{className:s["panel-title"],children:"FORM FIELDS"})}),(0,a.jsxs)("div",{className:s["panel-body"],children:[(0,a.jsx)("label",{className:s["select-label"],children:"Fill from template"}),(0,a.jsxs)("select",{id:s.persons,name:"persons",defaultValue:"defaultValue",required:!0,disabled:!0,children:[(0,a.jsx)("option",{value:"defaultValue",disabled:!0,children:"Choose Example"}),(0,a.jsx)("option",{value:"75061",children:"Isabella Robinson"}),(0,a.jsx)("option",{value:"11225",children:"Emma Smith"}),(0,a.jsx)("option",{value:"10965",children:"Emily Williams"}),(0,a.jsx)("option",{value:"76116",children:"Sophia Brown"}),(0,a.jsx)("option",{value:"89032",children:"Olivia Davis"}),(0,a.jsx)("option",{value:"SW7 2BX",children:"Abigail Jones"}),(0,a.jsx)("option",{value:"94250",children:"Davis Hannah"}),(0,a.jsx)("option",{value:"84622",children:"Samantha Smith"}),(0,a.jsx)("option",{value:"72100",children:"Mia Davis"}),(0,a.jsx)("option",{value:"M13 0WG",children:"Madison Taylor"}),(0,a.jsx)("option",{value:"L1 9AS",children:"Jacob Brown"}),(0,a.jsx)("option",{value:"63069",children:"Jason Davis"}),(0,a.jsx)("option",{value:"31300",children:"Michael Williams"}),(0,a.jsx)("option",{value:"90071",children:"Christopher Johnson"}),(0,a.jsx)("option",{value:"90441",children:"Ethan Taylor"}),(0,a.jsx)("option",{value:"34500",children:"Daniel Wright"}),(0,a.jsx)("option",{value:"20535",children:"Matthew Jones"}),(0,a.jsx)("option",{value:"19147",children:"Andrew Wilson"}),(0,a.jsx)("option",{value:"RM1 3ER",children:"William Robinson"}),(0,a.jsx)("option",{value:"34300",children:"Joshua Johnson"})]}),(0,a.jsx)("div",{id:s.controlsBlock,className:s["controls-grid"],hidden:!0})]})]}),(0,a.jsx)("div",{className:s["editor-column"],children:(0,a.jsx)(o.A,{fileType:"pdf",code:"",height:"100%",templateUrl:"https://static.onlyoffice.com/assets/docs/samples/withtags.pdf",isDemo:!0,config:{document:{permissions:{edit:!1,fillForms:!0}},editorConfig:{customization:{compactToolbar:!0}}},externalScript:{beforeDocumentReady:`
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
                  document.getElementById("${s.persons}").addEventListener("change", (e) => {
                    const person = ${i}.find((p) => p["PostalCode"] === e.target.value);
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
                    const container = document.getElementById("${s.controlsBlock}");

                    if (contentControls.length !== 0) {
                      container.removeAttribute("hidden");
                      document.getElementById("${s.persons}").removeAttribute("disabled");
                    }

                    contentControls.forEach((control) => {
                      const labelText = control["Tag"].replace(/([a-z])([A-Z])/g, "$1 $2");

                      if (control.Type === "input") {
                        const group = document.createElement("div");
                        group.className = "${s["field-group"]}";
                        const label = document.createElement("label");
                        label.className = "${s["field-label"]}";
                        label.textContent = labelText;
                        group.appendChild(label);
                        const input = document.createElement("input");
                        input.id = control["InternalId"];
                        input.value = control["Value"] || "";
                        input.className = "${s["field-input"]}";
                        group.appendChild(input);
                        container.appendChild(group);
                      } else if (control.Type === "radio") {
                        const group = document.createElement("div");
                        group.className = "${s["field-group"]}";
                        const label = document.createElement("label");
                        label.className = "${s["field-label"]}";
                        label.textContent = labelText;
                        group.appendChild(label);
                        const radios = document.createElement("div");
                        radios.className = "${s["radio-group"]}";
                        control["Value"].forEach((option) => {
                          const wrapper = document.createElement("label");
                          wrapper.className = "${s["radio-label"]}";
                          const radio = document.createElement("input");
                          radio.type = "radio";
                          radio.id = option["InternalId"];
                          radio.checked = option["checked"] === true;
                          radio.name = control["Tag"];
                          radio.className = "${s["radio-input"]}";
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

                    document.querySelectorAll(".${s["field-input"]}").forEach((input) => {
                      input.addEventListener("keyup", updateContent);
                    });
                    document.querySelectorAll(".${s["radio-input"]}").forEach((radio) => {
                      radio.addEventListener("change", updateContent);
                    });
                  };

                  const updateContent = (e) => {
                    const { id } = e.target;
                    const value = e.target.classList.contains("${s["radio-input"]}") ? true : e.target.value;
                    settingFormIds.set(id, (settingFormIds.get(id) || 0) + 1);
                    connector.executeMethod("SetFormValue", [id, value], () => {
                      settingFormIds.set(id, settingFormIds.get(id) - 1);
                    });
                  };

                  const onChangeContentControl = (e) => {
                    if (settingFormIds.get(e["InternalId"])) return;
                    const element = document.getElementById(e["InternalId"]);
                    if (element.classList.contains("${s["radio-input"]}")) {
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
                `}})})]})})}),l="nav-btn_W50x",d="disabled_Vz7c",m="card-message_spo8",p="textarea_rSj1",u="btn_RNC4",h="active_Im1X",g=()=>(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:"demo-section_E8Lg",children:(0,a.jsxs)("div",{className:"demo-layout_v1jf",children:[(0,a.jsx)("div",{className:"editor-column_gmu0",children:(0,a.jsx)(o.A,{fileType:"docx",code:"",height:"100%",templateUrl:"https://static.onlyoffice.com/assets/docs/samples/withcomments.docx",config:{editorConfig:{customization:{compactToolbar:!0}}},externalScript:{beforeDocumentReady:`
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
                `}})}),(0,a.jsxs)("div",{className:"comments-panel_l5qV",children:[(0,a.jsxs)("div",{className:"panel-header_W1_K",children:[(0,a.jsxs)("span",{className:"panel-title_tUwt",children:["COMMENTS (",(0,a.jsx)("span",{id:"commentCount",children:"0"}),")"]}),(0,a.jsxs)("div",{className:"panel-nav_LVqD",children:[(0,a.jsx)("button",{id:"prevComment",className:`${l} ${d}`,children:"\u2039"}),(0,a.jsx)("button",{id:"nextComment",className:`${l} ${d}`,children:"\u203A"})]})]}),(0,a.jsx)("div",{id:"commentsList",className:"comments-list_dkIo"}),(0,a.jsx)("div",{id:"emptyComments",className:"empty-state_uJPB",style:{display:"none"},children:"There are no comments in the document."}),(0,a.jsx)("textarea",{id:"addReplyArea",className:p,placeholder:"Enter your reply here",style:{display:"none"}}),(0,a.jsx)("textarea",{id:"addCommentArea",className:p,placeholder:"Enter your comment here",style:{display:"none"}}),(0,a.jsxs)("div",{className:"panel-actions_EcIr",children:[(0,a.jsx)("button",{id:"addReply",className:`${u} ${d}`,children:"Add Reply"}),(0,a.jsx)("button",{id:"deleteComment",className:`${u} ${d}`,children:"Delete"}),(0,a.jsx)("button",{id:"addComment",className:u,children:"Add Comment"})]})]})]})})}),C="btn_ORPJ",x="disabled_N_dM",y=()=>(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:"demo-section_edJM",children:(0,a.jsxs)("div",{className:"controls-row_pLmK",children:[(0,a.jsx)("span",{className:"controls-label_VdaO",children:"External controls"}),(0,a.jsx)("button",{id:"accept",className:`${C} ${x}`,children:"\u2713 Accept"}),(0,a.jsx)("button",{id:"reject",className:`${C} ${x}`,children:"\u2718 Reject"}),(0,a.jsx)("button",{id:"prev",className:`${C} ${x}`,children:"\u2039 Prev"}),(0,a.jsx)("button",{id:"next",className:`${C} ${x}`,children:"Next \u203A"}),(0,a.jsx)("span",{id:"reviewCounter",className:"review-counter_ppte"})]})}),(0,a.jsx)(o.A,{fileType:"docx",code:"",height:"550px",templateUrl:"https://static.onlyoffice.com/assets/docs/samples/review.docx",config:{editorConfig:{customization:{compactToolbar:!0}}},externalScript:{beforeDocumentReady:`
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

            document.querySelectorAll(".${C}").forEach((btn) => {
              btn.classList.remove("${x}");
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
                acceptBtn.classList.add("${x}");
                rejectBtn.classList.add("${x}");
                prevBtn.classList.add("${x}");
                nextBtn.classList.add("${x}");
              } else {
                acceptBtn.classList.remove("${x}");
                rejectBtn.classList.remove("${x}");
                if (reviewIndex <= 1) {
                  prevBtn.classList.add("${x}");
                } else {
                  prevBtn.classList.remove("${x}");
                }
                if (reviewIndex >= reviewCount) {
                  nextBtn.classList.add("${x}");
                } else {
                  nextBtn.classList.remove("${x}");
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
          `}})]}),v="panel-list-btn-active_x3xN",f="type-badge_rosP",b="cc-item-label_Njsc",N="prop-row_PWF3",E="prop-label_N5ru",I="prop-input_MsZG",w="prop-select_l7EG",j="color-item_eVrE",B="color-swatch_gBwy",D="color-hint_RH3v",L="btn_X9QN",k="disabled_bHQC",M=()=>(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:"demo-section_WaC0",children:(0,a.jsxs)("div",{className:"demo-layout_WWbp",children:[(0,a.jsxs)("div",{className:"panel_glYF",children:[(0,a.jsxs)("div",{className:"panel-header_EwX5",children:[(0,a.jsxs)("div",{className:"panel-header-left_PYVH",children:[(0,a.jsx)("span",{className:"panel-title_hE5c",children:"CONTENT CONTROLS"}),(0,a.jsx)("span",{id:"ccCount",className:"panel-count_ISxe",children:"0"})]}),(0,a.jsxs)("button",{id:"ccListToggle",className:"panel-list-btn__IzV",children:["\u2261"," List"]})]}),(0,a.jsxs)("div",{className:"panel-body_ioD4",children:[(0,a.jsxs)("div",{className:"type-list_Uea1",children:[(0,a.jsx)("button",{"data-type":"block",className:`${f} type-text_rQgZ`,children:"Plain text/Rich text"}),(0,a.jsx)("button",{"data-type":"datePicker",className:`${f} type-date_fLWR`,children:"Date"}),(0,a.jsx)("button",{"data-type":"picture",className:`${f} type-picture_YF_E`,children:"Picture"}),(0,a.jsx)("button",{"data-type":"comboBox",className:`${f} type-combo_yogU`,children:"Combobox/Dropdown list"}),(0,a.jsx)("button",{"data-type":"checkBox",className:`${f} type-checkbox_fD09`,children:"Checkbox"})]}),(0,a.jsx)("div",{id:"ccList",className:"cc-list_MLZN",style:{display:"none"}}),(0,a.jsx)("div",{id:"ccDetails",className:"cc-details_ivda",style:{display:"none"},children:(0,a.jsxs)("div",{className:"details-grid_Sw2S",children:[(0,a.jsxs)("div",{className:"props-section_uSAM",children:[(0,a.jsxs)("div",{className:N,children:[(0,a.jsx)("span",{className:E,children:"Id"}),(0,a.jsx)("input",{id:"ccId",className:I})]}),(0,a.jsxs)("div",{className:N,children:[(0,a.jsx)("span",{className:E,children:"Tag"}),(0,a.jsx)("input",{id:"ccTag",className:I})]}),(0,a.jsxs)("div",{className:N,children:[(0,a.jsx)("span",{className:E,children:"Lock"}),(0,a.jsxs)("select",{id:"ccLock",className:w,children:[(0,a.jsx)("option",{value:"unlocked",children:"unlocked"}),(0,a.jsx)("option",{value:"contentLocked",children:"contentLocked"}),(0,a.jsx)("option",{value:"sdtContentLocked",children:"sdtContentLocked"}),(0,a.jsx)("option",{value:"sdtLocked",children:"sdtLocked"})]})]}),(0,a.jsxs)("div",{className:N,children:[(0,a.jsx)("span",{className:E,children:"Appearance"}),(0,a.jsxs)("select",{id:"ccAppearance",className:w,children:[(0,a.jsx)("option",{value:"boundingBox",children:"boundingBox"}),(0,a.jsx)("option",{value:"hidden",children:"hidden"})]})]}),(0,a.jsxs)("div",{className:N,children:[(0,a.jsx)("span",{className:E,children:"Colors"}),(0,a.jsxs)("span",{className:"color-group_nGnX",children:[(0,a.jsxs)("span",{className:j,children:[(0,a.jsx)("span",{id:"ccBgColor",className:B,"data-target":"bg"}),(0,a.jsx)("span",{className:D,children:"BG"})]}),(0,a.jsxs)("span",{className:j,children:[(0,a.jsx)("span",{id:"ccBorderColor",className:B,"data-target":"border"}),(0,a.jsx)("span",{className:D,children:"Border"})]})]})]}),(0,a.jsx)("input",{id:"ccColorInput",type:"color",className:"color-picker-hidden_gyF_",defaultValue:"#DCDCDC"})]}),(0,a.jsx)("button",{id:"ccApply",className:`${L} btn-apply_Qw44`,children:"Apply changes"}),(0,a.jsx)("pre",{id:"ccJson",className:"json-preview_Zp9u"})]})}),(0,a.jsx)("div",{id:"ccEmpty",className:"empty-state_K43Z",children:"Click a type above to add it, then click a content control in the editor to inspect it."})]}),(0,a.jsx)("div",{className:"panel-actions_Ztnt",children:(0,a.jsx)("button",{id:"ccRemove",className:`${L} ${k}`,children:"Remove"})})]}),(0,a.jsx)("div",{className:"editor-column_OR3e",children:(0,a.jsx)(o.A,{fileType:"docx",code:"",height:"100%",config:{editorConfig:{customization:{compactToolbar:!0}}},externalScript:{beforeDocumentReady:`
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
                    document.getElementById("ccRemove").classList.add("${k}");
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
                      document.getElementById("ccRemove").classList.remove("${k}");

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
                      item.innerHTML = '<span class="${b}">Tag: ' + tag + '</span>'
                        + '<span class="${b}">ID: ' + cc["InternalId"] + '</span>';
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

                  document.querySelectorAll(".${B}").forEach((swatch) => {
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
                    if (e.currentTarget.classList.contains("${k}")) return;
                    if (!selectedId) return;
                    connector.executeMethod("RemoveContentControl", [selectedId], () => {
                      selectedId = null;
                      currentProps = null;
                      refreshCount();
                      document.getElementById("ccDetails").style.display = "none";
                      document.getElementById("ccEmpty").style.display = "block";
                      document.getElementById("ccRemove").classList.add("${k}");
                    });
                  });
                `}})})]})})})},28453:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>i});var o=n(296540);let a={},c=o.createContext(a);function s(e){let t=o.useContext(c);return o.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),o.createElement(c.Provider,{value:t},e.children)}}}]);