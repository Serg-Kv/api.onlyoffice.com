"use strict";(self.webpackChunkapi_onlyoffice_com=self.webpackChunkapi_onlyoffice_com||[]).push([[969412],{225871:(e,t,a)=>{function i(e,t){e.accDescr&&t.setAccDescription?.(e.accDescr),e.accTitle&&t.setAccTitle?.(e.accTitle),e.title&&t.setDiagramTitle?.(e.title)}a.d(t,{S:()=>i}),(0,a(440797).K2)(i,"populateCommonDb")},969412:(e,t,a)=>{a.d(t,{diagram:()=>b});var i=a(573590),l=a(225871),r=a(613226),s=a(367633),o=a(440797),n=a(778731),c=a(470451),p=s.UI.pie,d={sections:new Map,showData:!1,config:p},u=d.sections,f=d.showData,g=structuredClone(p),h=(0,o.K2)(()=>structuredClone(g),"getConfig"),m=(0,o.K2)(()=>{u=new Map,f=d.showData,(0,s.IU)()},"clear"),x=(0,o.K2)(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);u.has(e)||(u.set(e,t),o.Rm.debug(`added new section: ${e}, with value: ${t}`))},"addSection"),w=(0,o.K2)(()=>u,"getSections"),S=(0,o.K2)(e=>{f=e},"setShowData"),$=(0,o.K2)(()=>f,"getShowData"),y={getConfig:h,clear:m,setDiagramTitle:s.ke,getDiagramTitle:s.ab,setAccTitle:s.SV,getAccTitle:s.iN,setAccDescription:s.EI,getAccDescription:s.m7,addSection:x,getSections:w,setShowData:S,getShowData:$},D=(0,o.K2)((e,t)=>{(0,l.S)(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},"populateDb"),T={parse:(0,o.K2)(async e=>{let t=await (0,n.qg)("pie",e);o.Rm.debug(t),D(t,y)},"parse")},C=(0,o.K2)(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),v=(0,o.K2)(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),a=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1).sort((e,t)=>t.value-e.value);return(0,c.rLf)().value(e=>e.value)(a)},"createPieArcs"),b={parser:T,db:y,renderer:{draw:(0,o.K2)((e,t,a,l)=>{o.Rm.debug("rendering pie chart\n"+e);let n=l.db,p=(0,s.D7)(),d=(0,r.$t)(n.getConfig(),p.pie),u=(0,i.D)(t),f=u.append("g");f.attr("transform","translate(225,225)");let{themeVariables:g}=p,[h]=(0,r.I5)(g.pieOuterStrokeWidth);h??=2;let m=d.textPosition,x=(0,c.JLW)().innerRadius(0).outerRadius(185),w=(0,c.JLW)().innerRadius(185*m).outerRadius(185*m);f.append("circle").attr("cx",0).attr("cy",0).attr("r",185+h/2).attr("class","pieOuterCircle");let S=n.getSections(),$=v(S),y=[g.pie1,g.pie2,g.pie3,g.pie4,g.pie5,g.pie6,g.pie7,g.pie8,g.pie9,g.pie10,g.pie11,g.pie12],D=0;S.forEach(e=>{D+=e});let T=$.filter(e=>"0"!==(e.data.value/D*100).toFixed(0)),C=(0,c.UMr)(y);f.selectAll("mySlices").data(T).enter().append("path").attr("d",x).attr("fill",e=>C(e.data.label)).attr("class","pieCircle"),f.selectAll("mySlices").data(T).enter().append("text").text(e=>(e.data.value/D*100).toFixed(0)+"%").attr("transform",e=>"translate("+w.centroid(e)+")").style("text-anchor","middle").attr("class","slice"),f.append("text").text(n.getDiagramTitle()).attr("x",0).attr("y",-200).attr("class","pieTitleText");let b=[...S.entries()].map(([e,t])=>({label:e,value:t})),k=f.selectAll(".legend").data(b).enter().append("g").attr("class","legend").attr("transform",(e,t)=>"translate(216,"+(22*t-22*b.length/2)+")");k.append("rect").attr("width",18).attr("height",18).style("fill",e=>C(e.label)).style("stroke",e=>C(e.label)),k.append("text").attr("x",22).attr("y",14).text(e=>n.getShowData()?`${e.label} [${e.value}]`:e.label);let A=512+Math.max(...k.selectAll("text").nodes().map(e=>e?.getBoundingClientRect().width??0));u.attr("viewBox",`0 0 ${A} 450`),(0,s.a$)(u,450,A,d.useMaxWidth)},"draw")},styles:C}}}]);