(this.webpackJsonptest=this.webpackJsonptest||[]).push([[0],{216:function(e,t,a){},217:function(e,t,a){},380:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(22),s=a.n(i),o=(a(216),a(177)),l=a(178),c=a(59),d=a(179),h=a(202),g=(a.p,a(217),a(18)),j=a(430),m=a(439),u=a(438),p=a(200),b=a.n(p),f=a(432),x=a(434),O=a(427),y=a(431),v=a(433),k=a(428),S=a(429),I=a(437),B=a(435),C=a(381),P=a(182),T=a.n(P),w=a(101),N=a(420),D=a(424),F=a(197),q=a(198),A=a(88),K=a(85),H=a(203),R=a(4);function L(e){var t=[];if(console.log(e),e.length>0){var a,n=(new Date).getFullYear()+1;for(a=2009;a<n;a++){var r;for(r=0;r<2;r++){var i="not found";if(i=0===r?e[2].find((function(e){return e[0]===a})):e[1].find((function(e){return e[0]===a})),console.log(i),"not found"!==i&&void 0!==i){var s={name:i[1]+" "+i[0]};"NaN"!==parseFloat(i[2])&&(s.BI=parseFloat(i[2])),"NaN"!==parseFloat(i[3])&&(s.BII=parseFloat(i[3])),"NaN"!==parseFloat(i[4])&&(s.HP=parseFloat(i[4])),t.push(s)}}}return t}return e}function M(e){return Object(R.jsxs)(N.a,{width:e.width,height:320,data:L(e.programData),margin:{top:15,right:15,left:0,bottom:15},children:[Object(R.jsx)(D.a,{strokeDasharray:"3 3"}),Object(R.jsx)(F.a,{dataKey:"name",interval:2,angle:40,height:70,dx:23,dy:20}),Object(R.jsx)(q.a,{yAxisId:"left",domain:["auto","auto"]}),Object(R.jsx)(q.a,{yAxisId:"right",orientation:"right",domain:["dataMin-0.2","auto"]}),Object(R.jsx)(A.a,{}),Object(R.jsx)(K.a,{}),Object(R.jsx)(H.a,{yAxisId:"left",type:"monotone",dataKey:"BI",stroke:"#8884d8",activeDot:{r:8}}),Object(R.jsx)(H.a,{yAxisId:"left",type:"monotone",dataKey:"BII",stroke:"#82ca9d"}),Object(R.jsx)(H.a,{yAxisId:"right",type:"monotone",dataKey:"HP",stroke:"orange"})]})}var J=Object(g.a)((function(e){return{head:{backgroundColor:e.palette.common.black,color:e.palette.common.white},body:{fontSize:12,paddingLeft:"0.2em",paddingRight:"0.2em"}}}))(O.a),z=Object(g.a)((function(e){return{root:{"&:nth-of-type(odd)":{backgroundColor:e.palette.action.hover}}}}))(k.a),U=function(e){return Object(w.usePromiseTracker)().promiseInProgress&&Object(R.jsx)("div",{style:{width:"100%",height:"100",display:"flex",justifyContent:"center",alignItems:"center"},children:Object(R.jsx)(T.a,{type:"ThreeDots",color:"#2BAD60",height:"100",width:"100"})})},V=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={queryString:"",queryResults:[],kurskod:"",open:!1,programData:[],program:"",school:"",loading:!1},n.handleSubmit=n.handleSubmit.bind(Object(c.a)(n)),n.handleSelection=n.handleSelection.bind(Object(c.a)(n)),n.handleSearchBarChange=n.handleSearchBarChange.bind(Object(c.a)(n)),n.handleModalClose=n.handleModalClose.bind(Object(c.a)(n)),n}return Object(l.a)(a,[{key:"handleSubmit",value:function(e){e.preventDefault();var t=new URL("http://127.0.0.1:5002/query");t.searchParams.append("q",this.state.queryString);var a=this;fetch(t).then((function(e){return e.json()})).then((function(e){var t=JSON.parse(e).results;console.log(t),a.setState({queryResults:t})})).catch((function(e){console.log("Fetch problem: "+e.message)}))}},{key:"handleSelection",value:function(e,t,a){var n=new URL("http://127.0.0.1:5002/program_data");n.searchParams.append("q",e),n.searchParams.append("school",a),n.searchParams.append("program",t),console.log(n);var r=this;this.setState({open:!0,loading:!0}),Object(w.trackPromise)(fetch(n).then((function(e){return e.json()})).then((function(n){var i=JSON.parse(n),s="Kvoten BI \xe4r till f\xf6r dig som s\xf6ker med dina gymnasiebetyg. BII \xe4r f\xf6r dig som har kompletterat ditt gymnasiebetyg och HP \xe4r f\xf6r de som har gjort h\xf6gskoleprovet. (PS. fler betygskvoter finns men dessa \xe4r inte vanliga bland dagens gymnasieelever). Siffror f\xf6r Urval 2 visas.",o=[[i.comment.length>0?s+i.comment:s],i.HT.length>0?i.HT:["Ingen statistik"],i.VT.length>0?i.VT:["Ingen statistik"]];r.setState({programData:o,kurskod:e,program:t,school:a,loading:!1}),console.log(o),setTimeout((function(){console.log(r.state.programData)}),1e3)})).catch((function(e){console.log("Fetch problem: "+e.message)})))}},{key:"handleSearchBarChange",value:function(e){this.setState({queryString:e.target.value})}},{key:"handleModalClose",value:function(){this.setState({open:!1})}},{key:"render",value:function(){var e=this,t=this.props.classes;return Object(R.jsxs)("div",{className:t.root,children:[Object(R.jsxs)(S.a,{style:{padding:"2em",paddingTop:"2em",flex:"0 1 auto"},children:[Object(R.jsxs)("header",{className:"App-header",children:[Object(R.jsx)("h3",{style:{textAlign:"left",margin:0,padding:0},children:"Se dina chanser att bli antagen!"}),Object(R.jsx)("h6",{style:{textAlign:"left",margin:0,padding:0,paddingTop:"0.5em",color:"gray"},children:"S\xf6k efter ett program eller en kurs. Klicka sedan p\xe5 programmet f\xf6r att se dina chanser att bli antagen. Tips: skriv utbildningens namn och sedan skolan i s\xf6krutan f\xf6r \xe4nnu b\xe4ttre s\xf6kresultat. "})]}),Object(R.jsx)("form",{onSubmit:this.handleSubmit,children:Object(R.jsxs)(j.a,{className:t.searchBar,style:{textAlign:"left"},children:[Object(R.jsx)(m.a,{className:t.input,placeholder:"L\xe4karprogrammet Karolinska",value:this.state.queryString,name:"queryString",onChange:this.handleSearchBarChange,inputProps:{"aria-label":"s\xf6k efter utbildningar"}}),Object(R.jsx)(u.a,{type:"submit",className:t.iconButton,"aria-label":"search",children:Object(R.jsx)(b.a,{})})]})})]}),Object(R.jsx)("div",{style:{flex:"1 1 auto",marginBottom:"3em"},children:this.state.queryResults.length>0&&Object(R.jsx)(y.a,{component:j.a,className:t.table,display:"false",children:Object(R.jsxs)(f.a,{size:"small","aria-label":"customized table",children:[Object(R.jsx)(v.a,{children:Object(R.jsxs)(z,{children:[Object(R.jsx)(J,{children:"Program"}),Object(R.jsx)(J,{align:"left",children:"Skola"}),Object(R.jsx)(J,{align:"right",children:"Termin"}),Object(R.jsx)(J,{align:"right",children:"Program/Kurs"}),Object(R.jsx)(J,{align:"right",children:"Kod"})]})}),Object(R.jsx)(x.a,{children:this.state.queryResults.map((function(t,a){return Object(R.jsxs)(z,{onClick:function(){return e.handleSelection(t[3],t[2],t[4])},children:[Object(R.jsx)(J,{component:"th",scope:"row",children:t[2]}),Object(R.jsx)(J,{align:"left",children:t[4]}),Object(R.jsx)(J,{align:"right",children:t[0]}),Object(R.jsx)(J,{align:"right",children:t[1]}),Object(R.jsx)(J,{align:"right",children:t[3]})]},a)}))})]})})}),Object(R.jsx)(I.a,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",className:t.modal,open:this.state.open,onClose:this.handleModalClose,closeAfterTransition:!0,BackdropComponent:B.a,BackdropProps:{timeout:500},children:Object(R.jsx)(C.a,{in:this.state.open,children:Object(R.jsxs)(j.a,{className:t.paper,children:[Object(R.jsx)(U,{}),!this.state.loading&&Object(R.jsxs)("div",{children:[Object(R.jsxs)(S.a,{children:[Object(R.jsx)("h2",{style:{marginBottom:"0.1em"},children:"Statistik"}),Object(R.jsxs)("h5",{style:{marginTop:"0.1em",color:"gray"},children:[this.state.program," vid ",this.state.school]})]}),Object(R.jsx)("div",{style:{alignItems:"center",display:"flex",justifyContent:"center"},children:Object(R.jsx)(M,{programData:this.state.programData,width:370})}),Object(R.jsx)(S.a,{children:Object(R.jsx)("div",{children:this.state.programData.map((function(e,t){return Object(R.jsxs)("div",{children:[Object(R.jsx)("br",{}),Object(R.jsx)("h4",{children:["Kommentar","HT","VT"][t]}),e.map((function(e){return e.length<6?Object(R.jsxs)("p",{children:[Object(R.jsx)("b",{children:e[0]}),": \xa0\xa0BI ",e[2]," \xa0\xa0\xa0 BII ",e[3]," \xa0\xa0\xa0 HP ",e[4]]}):Object(R.jsx)("p",{children:e})}))]})}))})})]})]})})}),Object(R.jsxs)("footer",{style:{color:"#bcc5d6",backgroundColor:"#374052",alignItems:"center",display:"flex",justifyContent:"center",padding:"0.3em",paddingBottom:"0.5em"},children:["\xa9 ",(new Date).getFullYear()," Copyright Oliver Midbrink"]})]})}}]),a}(r.a.Component),W=Object(g.a)((function(e){return{root:{backgroundColor:"#282c34",minHeight:"100vh",display:"flex",flexFlow:"column",height:"100%"},searchBar:{padding:"2px 4px",display:"flex",alignItems:"center",width:"100%",maxWidth:600,marginRight:"auto",marginTop:"2em",marginBottom:"2em"},input:{marginLeft:0,flex:1},iconButton:{padding:10,align:"right"},divider:{height:28,margin:4},table:{width:"100%",maxWidth:"1500px",marginLeft:"auto",marginRight:"auto"},modal:{display:"flex",alignItems:"center",justifyContent:"center"},paper:{padding:e.spacing(1,0,1),maxWidth:"100%",overflow:"auto",maxHeight:"70%"}}}))(V),Y=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,441)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,i=t.getLCP,s=t.getTTFB;a(e),n(e),r(e),i(e),s(e)}))};s.a.render(Object(R.jsx)(r.a.StrictMode,{children:Object(R.jsx)(W,{})}),document.getElementById("root")),Y()}},[[380,1,2]]]);
//# sourceMappingURL=main.3d8dc0ac.chunk.js.map