(this.webpackJsonptest=this.webpackJsonptest||[]).push([[0],{242:function(e,t,a){},243:function(e,t,a){},404:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(22),s=a.n(i),l=(a(242),a(193)),o=a(194),c=a(43),d=a(195),h=a(219),j=(a.p,a(243),a(8)),g=a(457),m=a(469),p=a(458),u=a(216),b=a.n(u),x=a(461),f=a(463),O=a(453),y=a(460),I=a(462),v=a(454),B=a(456),k=a(468),F=a(464),C=a(406),S=a(198),P=a.n(S),T=a(111),H=a(445),D=a(449),w=a(213),N=a(214),W=a(97),A=a(94),q=a(220),K=a(4);function R(e,t,a,n,r){try{var i=[];console.log(e);var s=!1;if(e.length>0){var l,o=(new Date).getFullYear()+1;for(l=2009;l<o;l++){var c;for(c=0;c<2;c++){var d="not found";if("not found"!==(d=0===c?e[2].find((function(e){return e[0]===l})):e[1].find((function(e){return e[0]===l})))&&void 0!==d){var h={name:d[1]+" "+d[0]};"NaN"!==parseFloat(d[2])&&t.includes("BI")&&(h.BI=parseFloat(d[2])),"NaN"!==parseFloat(d[3])&&t.includes("BII")&&(h.BII=parseFloat(d[3])),"NaN"!==parseFloat(d[4])&&t.includes("HP")&&(h.HP=parseFloat(d[4])),!1===s&&(s=!0,void 0!==a&&(console.log(a.replace(",",".")),h["Ditt HP"]=parseFloat(a.replace(",","."))),void 0!==n&&(h["Ditt BI"]=parseFloat(n.replace(",","."))),void 0!==r&&(h["Ditt BII"]=parseFloat(r.replace(",",".")))),console.log(h),i.push(h)}}}return void 0!==a&&(i[i.length-1]["Ditt HP"]=parseFloat(a.replace(",","."))),void 0!==n&&(i[i.length-1]["Ditt BI"]=parseFloat(n.replace(",","."))),void 0!==r&&(i[i.length-1]["Ditt BII"]=parseFloat(r.replace(",","."))),i}}catch(j){return console.log(j),e}}function L(e){return Object(K.jsxs)(H.a,{width:e.width,height:320,data:R(e.programData,e.displayFilter,e.userHP,e.userBI,e.userBII),margin:{top:10,right:25,left:0,bottom:15},children:[Object(K.jsx)(D.a,{strokeDasharray:"3 3"}),Object(K.jsx)(w.a,{dataKey:"name",interval:0,angle:-26,height:70,dx:-15,dy:10,fontSize:10}),Object(K.jsx)(N.a,{yAxisId:"left",domain:["auto","auto"]}),Object(K.jsx)(W.a,{}),Object(K.jsx)(A.a,{}),e.displayFilter.includes("BI")&&Object(K.jsx)(q.a,{yAxisId:"left",type:"monotone",dataKey:"BI",stroke:"#8884d8",activeDot:{r:8}}),e.displayFilter.includes("BII")&&Object(K.jsx)(q.a,{yAxisId:"left",type:"monotone",dataKey:"BII",stroke:"#82ca9d"}),e.displayFilter.includes("HP")&&Object(K.jsx)(q.a,{yAxisId:"left",type:"monotone",dataKey:"HP",stroke:"orange"}),e.displayFilter.includes("HP")&&Object(K.jsx)(q.a,{connectNulls:!0,yAxisId:"left",type:"monotone",dataKey:"Ditt HP",stroke:"red",dot:{r:3},strokeWidth:"6"}),e.displayFilter.includes("BI")&&Object(K.jsx)(q.a,{connectNulls:!0,yAxisId:"left",type:"monotone",dataKey:"Ditt BI",stroke:"red",dot:{r:3},strokeWidth:"6"}),e.displayFilter.includes("BII")&&Object(K.jsx)(q.a,{connectNulls:!0,yAxisId:"left",type:"monotone",dataKey:"Ditt BII",stroke:"red",dot:{r:3},strokeWidth:"6"})]})}var M=a(459),z=a(466),J=a(465),U=a(217),V=a(455),Y=Object(U.a)({palette:{primary:{main:"#00b2b8"}}}),E=Object(j.a)((function(e){return{head:{backgroundColor:"#00686e",color:e.palette.common.white},body:{fontSize:12,paddingLeft:"1.34em",paddingRight:"0.2em"}}}))(O.a),G=Object(j.a)((function(e){return{root:{"&:nth-of-type(odd)":{backgroundColor:"#f0f0f0"}}}}))(v.a),_=function(e){return Object(T.usePromiseTracker)().promiseInProgress&&Object(K.jsx)("div",{style:{width:"100%",height:"100",display:"flex",justifyContent:"center",alignItems:"center"},children:Object(K.jsx)(P.a,{type:"ThreeDots",color:"#2BAD60",height:"100",width:"100"})})},Q=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={queryString:"",queryResults:[],kurskod:"",open:!1,programData:[],program:"",school:"",loading:!1,userHP:"",userBI:"",userBII:""},n.handleSubmit=n.handleSubmit.bind(Object(c.a)(n)),n.handleSelection=n.handleSelection.bind(Object(c.a)(n)),n.handleSearchBarChange=n.handleSearchBarChange.bind(Object(c.a)(n)),n.handleModalClose=n.handleModalClose.bind(Object(c.a)(n)),n.handleTextFieldChangeHP=n.handleTextFieldChangeHP.bind(Object(c.a)(n)),n.handleTextFieldChangeBI=n.handleTextFieldChangeBI.bind(Object(c.a)(n)),n.handleTextFieldChangeBII=n.handleTextFieldChangeBII.bind(Object(c.a)(n)),n}return Object(o.a)(a,[{key:"handleSubmit",value:function(e){e.preventDefault();var t=new URL("http://68.183.10.8:5002/query");t.searchParams.append("q",this.state.queryString);var a=this;fetch(t).then((function(e){return e.json()})).then((function(e){var t=JSON.parse(e).results;console.log(t),a.setState({queryResults:t})})).catch((function(e){console.log("Fetch problem: "+e.message)}))}},{key:"handleSelection",value:function(e,t,a){var n=new URL("http://68.183.10.8:5002/program_data");n.searchParams.append("q",e),n.searchParams.append("school",a),n.searchParams.append("program",t),console.log(n);var r=this;this.setState({open:!0,loading:!0}),Object(T.trackPromise)(fetch(n).then((function(e){return e.json()})).then((function(n){var i=JSON.parse(n),s=[[i.comment.length>0?i.comment:""],i.HT.length>0?i.HT:["Ingen statistik"],i.VT.length>0?i.VT:["Ingen statistik"]];r.setState({programData:s,kurskod:e,program:t,school:a,loading:!1}),console.log(s),setTimeout((function(){console.log(r.state.programData)}),1e3)})).catch((function(e){console.log("Fetch problem: "+e.message)})))}},{key:"handleTextFieldChangeHP",value:function(e){this.setState({userHP:e.target.value})}},{key:"handleTextFieldChangeBI",value:function(e){this.setState({userBI:e.target.value})}},{key:"handleTextFieldChangeBII",value:function(e){this.setState({userBII:e.target.value})}},{key:"handleSearchBarChange",value:function(e){this.setState({queryString:e.target.value})}},{key:"handleModalClose",value:function(){this.setState({open:!1})}},{key:"render",value:function(){var e=this,t=this.props.classes;return Object(K.jsx)(V.a,{theme:Y,children:Object(K.jsxs)("div",{className:t.root,children:[Object(K.jsx)("div",{style:{padding:"1em",backgroundColor:"#00686e",paddingBottom:0},elevation:2,children:Object(K.jsxs)(B.a,{id:"header",children:[Object(K.jsxs)("header",{className:"App-header",children:[Object(K.jsx)("h3",{style:{textAlign:"left",margin:0,padding:0,color:"white"},children:"Se dina chanser att bli antagen!"}),Object(K.jsx)("h5",{style:{textAlign:"left",margin:0,padding:0,paddingTop:"0.5em",color:"#f5f5f5",fontWeight:"normal"},children:"S\xf6k ett program, klicka och se dina chanser. "})]}),Object(K.jsxs)("form",{onSubmit:this.handleSubmit,children:[Object(K.jsxs)(g.a,{className:t.searchBar,style:{textAlign:"left",marginTop:"1em"},elevation:2,children:[Object(K.jsx)(m.a,{className:t.input,placeholder:"T.ex. L\xe4karprogrammet Karolinska",name:"queryString",onChange:this.handleSearchBarChange,inputProps:{"aria-label":"s\xf6k efter utbildningar"}}),Object(K.jsx)(p.a,{type:"submit",className:t.iconButton,"aria-label":"search",children:Object(K.jsx)(b.a,{})})]}),Object(K.jsx)(M.a,{type:"submit",variant:"contained",style:{backgroundColor:"#00796e",color:"white",marginTop:"1em"},children:Object(K.jsx)("b",{children:"S\xf6k"})})]})]})}),Object(K.jsx)("div",{id:"resultsBox",style:{flex:"1 1 auto",marginBottom:"3em"},children:Object(K.jsx)(B.a,{children:this.state.queryResults.length>0&&Object(K.jsxs)("div",{children:[Object(K.jsx)("h2",{children:"S\xf6kresultat"}),Object(K.jsx)(y.a,{className:t.table,display:"false",children:Object(K.jsxs)(x.a,{size:"small","aria-label":"customized table",children:[Object(K.jsx)(I.a,{children:Object(K.jsxs)(G,{children:[Object(K.jsx)(E,{children:"Program"}),Object(K.jsx)(E,{align:"left",children:"Skola"}),Object(K.jsx)(E,{align:"left",children:"Termin"}),Object(K.jsx)(E,{align:"left",children:"Program/Kurs"}),Object(K.jsx)(E,{align:"left",children:"Kod"})]})}),Object(K.jsx)(f.a,{children:this.state.queryResults.map((function(t,a){return Object(K.jsxs)(G,{className:"TableRowHover",onClick:function(){return e.handleSelection(t[3],t[2],t[4])},children:[Object(K.jsx)(E,{component:"th",scope:"row",children:t[2]}),Object(K.jsx)(E,{align:"left",children:t[4]}),Object(K.jsx)(E,{align:"left",children:t[0]}),Object(K.jsx)(E,{align:"left",children:t[1]}),Object(K.jsx)(E,{align:"left",children:t[3]})]},a)}))})]})})]})})}),Object(K.jsx)(k.a,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",className:t.modal,open:this.state.open,onClose:this.handleModalClose,closeAfterTransition:!0,BackdropComponent:F.a,BackdropProps:{timeout:500},children:Object(K.jsx)(C.a,{in:this.state.open,children:Object(K.jsxs)("div",{style:{maxHeight:"80%",overflow:"auto"},children:[Object(K.jsx)(_,{}),Object(K.jsx)(g.a,{square:!0,className:t.paper,children:!this.state.loading&&Object(K.jsxs)("div",{children:[Object(K.jsxs)(B.a,{children:[Object(K.jsx)("h2",{style:{marginBottom:"0.1em"},children:"Statistik"}),Object(K.jsxs)("h5",{style:{marginTop:"0.1em",color:"gray"},children:[this.state.program," vid ",this.state.school]}),Object(K.jsx)(J.a,{}),Object(K.jsx)("h3",{style:{marginBottom:"0.2em"},children:"Senaste antagningsgr\xe4nserna"}),Object(K.jsx)("h5",{style:{marginTop:"0.1em",color:"gray"},children:"H\xf6stterminen urval 2"}),this.state.programData.slice(1,2).map((function(e,t){return Object(K.jsx)("div",{children:e.slice(0,1).map((function(e){return e.length<6?Object(K.jsxs)("p",{children:[Object(K.jsx)("b",{children:e[0]}),": \xa0\xa0BI ",e[2]," \xa0\xa0\xa0 BII ",e[3]," \xa0\xa0\xa0 HP ",e[4]]}):Object(K.jsx)("p",{children:e})}))})})),Object(K.jsx)("p",{children:"Skrolla om du vill se \xe4ldre antagningsstatistik"}),Object(K.jsx)(J.a,{}),Object(K.jsx)("h4",{style:{marginBottom:"0.2em"},children:"Fyll i rutorna f\xf6r att se dina chanser"}),Object(K.jsx)("i",{style:{marginTop:"0.1em"},children:this.state.programData[0]})]}),Object(K.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",paddingTop:"2em",paddingBottom:"1em"},children:[Object(K.jsxs)("div",{style:{border:"1px solid gray",margin:"0.5em",alignItems:"center",display:"flex",justifyContent:"center",flexWrap:"wrap",maxWidth:"400px"},children:[Object(K.jsx)(z.a,{label:"Snittbetyg fr\xe5n gymnasiet",style:{margin:"1em"},variant:"outlined",placeholder:"T.ex. 15,20",className:t.textField,value:this.state.userBI,onChange:this.handleTextFieldChangeBI}),Object(K.jsx)(L,{programData:this.state.programData,displayFilter:["BI"],width:300,userBI:this.state.userBI})]}),Object(K.jsxs)("div",{style:{border:"1px solid gray",margin:"0.5em",alignItems:"center",display:"flex",justifyContent:"center",flexWrap:"wrap",maxWidth:"400px"},children:[Object(K.jsx)(z.a,{label:"Ditt HP",style:{margin:"1em"},placeholder:"T.ex. 1,2",variant:"outlined",className:t.textField,name:"userHP",value:this.state.userHP,onChange:this.handleTextFieldChangeHP}),Object(K.jsx)(L,{programData:this.state.programData,displayFilter:["HP"],userHP:this.state.userHP,width:300})]}),Object(K.jsxs)("div",{style:{border:"1px solid gray",margin:"0.5em",alignItems:"center",display:"flex",justifyContent:"center",flexWrap:"wrap",maxWidth:"400px"},children:[Object(K.jsx)(z.a,{label:"Betyg efter komvux",style:{margin:"1em"},variant:"outlined",placeholder:"T.ex. 17,1",className:t.textField,value:this.state.userBII,onChange:this.handleTextFieldChangeBII}),Object(K.jsx)(L,{programData:this.state.programData,displayFilter:["BII"],width:300,userBII:this.state.userBII})]})]}),Object(K.jsxs)(B.a,{children:[Object(K.jsx)(J.a,{}),Object(K.jsx)("h4",{children:"F\xf6rklaring av kvoterna BI, BII och HP"}),Object(K.jsx)("p",{children:"Kvoten BI \xe4r till f\xf6r dig som s\xf6ker med dina gymnasiebetyg, BII f\xf6r dig som har kompletterat ditt gymnasiebetyg och HP \xe4r f\xf6r de som har gjort h\xf6gskoleprovet. (PS. fler betygskvoter finns men dessa \xe4r inte vanliga bland dagens gymnasieelever). Siffrorna nedan visar statistik f\xf6r Urval 2 visas. "}),Object(K.jsxs)("div",{children:[Object(K.jsx)(J.a,{}),Object(K.jsx)("h3",{style:{marginBottom:0},children:"Tabelldata"}),this.state.programData.slice(1,3).map((function(e,t){return Object(K.jsxs)("div",{children:[Object(K.jsx)("h4",{children:["HT","VT"][t]}),e.map((function(e){return e.length<6?Object(K.jsxs)("p",{children:[Object(K.jsx)("b",{children:e[0]}),": \xa0\xa0BI ",e[2]," \xa0\xa0\xa0 BII ",e[3]," \xa0\xa0\xa0 HP ",e[4]]}):Object(K.jsx)("p",{children:e})})),Object(K.jsx)("br",{})]})}))]})]}),Object(K.jsx)(J.a,{}),Object(K.jsx)(B.a,{children:Object(K.jsx)("p",{children:"T\xe4nk p\xe5 att detta bara \xe4r en indikation. G\xf6r ditt b\xe4sta f\xf6r att h\xf6ja betygen och maximera dina chanser!"})})]})})]})})}),Object(K.jsx)("footer",{style:{color:"#ededed",backgroundColor:"#00686e",alignItems:"center",display:"flex",justifyContent:"center",padding:"0.3em",paddingBottom:"0.5em"},children:Object(K.jsxs)("p",{style:{padding:0,margin:0},children:["\xa9 ",(new Date).getFullYear()," minachanser.se"]})})]})})}}]),a}(r.a.Component),X=Object(j.a)((function(e){return{root:{backgroundColor:e.palette.common.white,minHeight:"100vh",display:"flex",flexFlow:"column",height:"100%"},searchBar:{padding:"2px 4px",display:"flex",alignItems:"center",width:"100%",maxWidth:600,marginRight:"auto"},input:{marginLeft:0,flex:1},iconButton:{padding:10,align:"right"},divider:{height:28,margin:4},table:{width:"100%",maxWidth:"1500px",marginLeft:"auto",marginRight:"auto"},modal:{display:"flex",alignItems:"center",justifyContent:"center"},paper:{padding:0,maxWidth:"100%",overflow:"auto",maxHeight:"80%",outline:"none"}}}))(Q),Z=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,470)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,i=t.getLCP,s=t.getTTFB;a(e),n(e),r(e),i(e),s(e)}))};s.a.render(Object(K.jsx)(r.a.StrictMode,{children:Object(K.jsx)(X,{})}),document.getElementById("root")),Z()}},[[404,1,2]]]);
//# sourceMappingURL=main.eda3a5fd.chunk.js.map