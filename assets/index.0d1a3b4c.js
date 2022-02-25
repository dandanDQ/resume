import{e as k,t as v,j as P,o as l,c as d,a,d as F,h as C,E as $,b as L,r as I,F as O,f as S,n as R,p as N,g as T,i as p,k as h,l as V}from"./vendor.3b9fa096.js";const A=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}};A();var u=(t,e)=>{const o=t.__vccOpts||t;for(const[n,r]of e)o[n]=r;return o};const D={name:"Editor",data(){return{editor:null,value:"",yaml:null}},props:{current:{type:Object,default(){return{}}},saveFlag:{type:Boolean,default:!0}},watch:{current:{handler(t,e){e&&this.getValue(e),t&&this.setValue(t)}},saveFlag:{handler(){this.getValue(this.current)}}},mounted(){this.editor=k.create(document.getElementById("container"),{value:this.current.yaml,language:"yaml",lineNumbers:"on",roundedSelection:!1,scrollBeyondLastLine:!0,readOnly:!1,theme:"vs-dark",formatOnPaste:!0,automaticLayout:!0,wordWrap:"on"}),window.addEventListener("resize",()=>{v(this.editor).layout()})},methods:{getValue(t){var e;if(t)try{t.yaml=v(this.editor).getValue(),t.preview=(e=P.load(t.yaml))!=null?e:{}}catch(o){console.log(o),t.preview={}}},setValue(t){v(this.editor).setValue(t.yaml)}}},B={class:"editor"},j=a("div",{id:"container"},null,-1),q=[j];function J(t,e,o,n,r,s){return l(),d("div",B,q)}var W=u(D,[["render",J]]);const z="modulepreload",w={},G="./",g=function(e,o){return!o||o.length===0?e():Promise.all(o.map(n=>{if(n=`${G}${n}`,n in w)return;w[n]=!0;const r=n.endsWith(".css"),s=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${s}`))return;const i=document.createElement("link");if(i.rel=r?"stylesheet":z,r||(i.as="script",i.crossOrigin=""),i.href=n,document.head.appendChild(i),r)return new Promise((m,_)=>{i.addEventListener("load",m),i.addEventListener("error",_)})})).then(()=>e())},y={"/src/components/templates/PreviewTemplate01.vue":()=>g(()=>import("./PreviewTemplate01.92fc32a2.js"),["assets/PreviewTemplate01.92fc32a2.js","assets/PreviewTemplate01.371aa4ec.css","assets/UploadPhoto.3bd0d326.js","assets/UploadPhoto.339ca71d.css","assets/vendor.3b9fa096.js","assets/vendor.34635fe4.css"]),"/src/components/templates/PreviewTemplate02 copy.vue":()=>g(()=>import("./PreviewTemplate02 copy.acc03194.js"),["assets/PreviewTemplate02 copy.acc03194.js","assets/PreviewTemplate02 copy.bc56294b.css","assets/UploadPhoto.3bd0d326.js","assets/UploadPhoto.339ca71d.css","assets/vendor.3b9fa096.js","assets/vendor.34635fe4.css"]),"/src/components/templates/PreviewTemplate03.vue":()=>g(()=>import("./PreviewTemplate03.5b8b1d23.js"),["assets/PreviewTemplate03.5b8b1d23.js","assets/PreviewTemplate03.0f3c2d2f.css","assets/UploadPhoto.3bd0d326.js","assets/UploadPhoto.339ca71d.css","assets/vendor.3b9fa096.js","assets/vendor.34635fe4.css"])},E=[],b={};Object.keys(y).map(t=>{const e=t.slice(26,-4);E.push(e),b[e]=F({loader:y[t]})});const H={name:"Preview",data(){return{firstLevels:{},comList:E,comIdx:0,comName:"PreviewTemplate01"}},components:b,watch:{"current.preview":{immediate:!0,handler(t){this.loadData(t)}},exportFlag:{handler(){this.onExport()}},previewFlag:{handler(){this.onChangePreview()}}},computed:{preview(){var t;return(t=this.current.preview)!=null?t:{}}},props:{current:{type:Object,default(){return{}}},exportFlag:{type:Boolean,default:!0},previewFlag:{type:Boolean,default:!0}},methods:{loadData(t){this.firstLevels={};for(const e in t)e.indexOf("CARD-")>-1&&(this.firstLevels[e.slice(5)]=t[e])},onExport(){const t=document.querySelector("#resume-preview");C(t).then(e=>{const o=e.toDataURL("image/jpeg",1),n=new $;n.addImage(o,"JPEG",0,0,210,297),n.save("a4.pdf")})},onChangePreview(){this.comIdx=(this.comIdx+1)%this.comList.length,this.comName=this.comList[this.comIdx]}},created(){var t;this.comName=(t=window.localStorage.getItem("comName"))!=null?t:"PreviewTemplate01",window.addEventListener("beforeunload",e=>{window.localStorage.setItem("comName",this.comName)})}},K={class:"preview",id:"resume-preview"};function M(t,e,o,n,r,s){return l(),d("div",K,[(l(),L(I(r.comName),{preview:o.current.preview,firstLevels:r.firstLevels},null,8,["preview","firstLevels"]))])}var Q=u(H,[["render",M],["__scopeId","data-v-00ecb3b8"]]);const U={name:"ResumeTitle"},Y={class:"title"};function X(t,e,o,n,r,s){return l(),d("div",Y,"Resume")}var Z=u(U,[["render",X],["__scopeId","data-v-ba842de4"]]),ee="./assets/paper.333f7650.svg",te="./assets/add.0b270ae2.svg",re="./assets/delete.ce82d84a.svg",se="./assets/\u751F\u6210.901501f6.svg",ie="./assets/pdf_export.f30c8ca9.svg",oe="./assets/\u9875\u9762\u6837\u5F0F.71af005c.svg",ne="./assets/\u8C03\u82722.7f63bd48.svg",ae="./assets/github2.6c9def99.svg";const le={name:"ToolBar",props:{editorList:{type:Array,default(){return[]}},current:{type:Object,default(){return{}}}},emits:["change-editor-list","get-editor-value","export-preview","change-preview"],mounted(){window.addEventListener("keydown",t=>{t.key==="Enter"&&this.getEditorValue()}),document.querySelector("#change-color").addEventListener("change",t=>{var e;console.log((e=t==null?void 0:t.target)==null?void 0:e.value,"\u65B0\u7684\u989C\u8272\u503C")})},methods:{changeEditorList(t){this.$emit("change-editor-list",t)},getEditorValue(){this.$emit("get-editor-value")},exportPreview(){this.$emit("export-preview")},changePreview(){this.$emit("change-preview")},changeColor(){document.querySelector("#change-color").click()}}},c=t=>(N("data-v-30570a8f"),t=t(),T(),t),ce={class:"tool-bar"},de=["onClick"],ue=c(()=>a("img",{src:ee},null,-1)),me=[ue],pe=c(()=>a("img",{src:te},null,-1)),_e=[pe],ve=c(()=>a("img",{src:re},null,-1)),he=[ve],ge=c(()=>a("img",{src:se},null,-1)),fe=[ge],xe=c(()=>a("img",{src:ie},null,-1)),we=[xe],ye=c(()=>a("img",{src:oe},null,-1)),Le=[ye],Ee=c(()=>a("img",{src:ne},null,-1)),be=c(()=>a("input",{id:"change-color",type:"color",style:{display:"none"}},null,-1)),ke=[Ee,be],Pe=c(()=>a("div",{class:"ui-button"},[a("a",{href:"https://github.com/dandanDQ/resume",target:"_blank",style:{"line-height":"10px"}},[a("img",{src:ae})])],-1));function Fe(t,e,o,n,r,s){return l(),d("div",ce,[(l(!0),d(O,null,S(o.editorList,i=>(l(),d("div",{key:i,class:R(["ui-button",{highlight:o.current===i}]),onClick:m=>s.changeEditorList(i)},me,10,de))),128)),a("div",{class:"ui-button",onClick:e[0]||(e[0]=i=>s.changeEditorList("add"))},_e),a("div",{class:"ui-button",onClick:e[1]||(e[1]=i=>s.changeEditorList("delete"))},he),a("div",{class:"ui-button save",onClick:e[2]||(e[2]=(...i)=>s.getEditorValue&&s.getEditorValue(...i))},fe),a("div",{class:"ui-button export",onClick:e[3]||(e[3]=(...i)=>s.exportPreview&&s.exportPreview(...i))},we),a("div",{class:"ui-button change-preview",onClick:e[4]||(e[4]=(...i)=>s.changePreview&&s.changePreview(...i))},Le),a("div",{class:"ui-button change-color",onClick:e[5]||(e[5]=(...i)=>s.changeColor&&s.changeColor(...i))},ke),Pe])}var Ce=u(le,[["render",Fe],["__scopeId","data-v-30570a8f"]]);const f=`name: \u586B\u540D\u5B57

infos: 
  - xxx: xxx

contact:
  phone: \u586B\u7535\u8BDD
  email: \u586B\u90AE\u7BB1
  wechat: \u586B\u5FAE\u4FE1
  github: \u586Bgithub

skills:
- name: JavaScript
  level: 75
- name: HTML5
  level: 75
- name: CSS3
  level: 80
- name: Vue 2.x
  level: 75
- name: ReactNative
  level: 50
- name: Webpack
  level: 65

CARD-xx\u7ECF\u5386\uFF08\u8BC6\u522B\u5F00\u5934\u662FCARD-\u7684\uFF09:
- name: \u5927\u6807\u9898
  time: \u65F6\u95F4\u65F6\u95F4\u65F6\u95F4
  desc:
   - \u63CF\u8FF01: xxx
   - \u63CF\u8FF02: xxx
- name: \u5927\u6807\u9898
  time: \u65F6\u95F4\u65F6\u95F4\u65F6\u95F4
  desc:
   - \u63CF\u8FF01: xxx
   - \u63CF\u8FF02: \u63CF\u8FF02\u63CF\u8FF02\u63CF\u8FF02\u63CF\u8FF02\u63CF\u8FF02\u63CF\u8FF02\u63CF\u8FF02\u63CF\u8FF02\u63CF\u8FF02\u63CF\u8FF02\u63CF\u8FF02
   - \u8BF4\u660E: \u53EA\u6709\u82F1\u6587key\u662F\u56FA\u5B9A\u7684

CARD-xx\u7ECF\u53862\uFF08\u53EF\u4EE5\u968F\u4FBF\u6DFB\u52A0\uFF09:
- name: \u5927\u6807\u9898
  time: \u65F6\u95F4\u65F6\u95F4\u65F6\u95F4
  desc:
   - \u63CF\u8FF01: xxx
   - \u63CF\u8FF02: xxx
- name: \u5927\u6807\u9898
  time: \u65F6\u95F4\u65F6\u95F4\u65F6\u95F4
  desc:
   - \u63CF\u8FF01: \u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF0
   - \u63CF\u8FF02: xxx
   - \u8BF4\u660E: \u53EA\u6709\u82F1\u6587key\u662F\u56FA\u5B9A\u7684

CARD-xx\u7ECF\u53863\uFF08\u53EF\u4EE5\u968F\u4FBF\u6DFB\u52A0\uFF09:
- name: \u5927\u6807\u9898
  time: \u65F6\u95F4\u65F6\u95F4\u65F6\u95F4
  desc:
   - \u63CF\u8FF01: \u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01\u63CF\u8FF01
   - \u63CF\u8FF02: xxx
- name: \u5927\u6807\u9898
  time: \u65F6\u95F4\u65F6\u95F4\u65F6\u95F4
  desc:
   - \u63CF\u8FF01: xxx
   - \u63CF\u8FF02: xxx
   - \u8BF4\u660E: \u53EA\u6709\u82F1\u6587key\u662F\u56FA\u5B9A\u7684`,$e={name:"Resume",components:{Editor:W,Preview:Q,Title:Z,ToolBar:Ce},data(){return{editorList:[{yaml:"\u9884\u8BBE1",preview:{}},{yaml:"\u9884\u8BBE2",preview:{}}],current:null,capacity:6,saveFlag:!0,exportFlag:!0,previewFlag:!0}},created(){var o;const t=JSON.stringify([{yaml:f,preview:{}},{yaml:f,preview:{}}]),e=(o=window.localStorage.getItem("editorList"))!=null?o:t;this.editorList=JSON.parse(e),window.addEventListener("beforeunload",n=>{window.localStorage.setItem("editorList",JSON.stringify(this.editorList))}),this.current=this.editorList[0]},methods:{changeEditorList(t){switch(t){case"next":{if(this.editorList.length<=1)break;const e=(this.editorList.indexOf(this.current)+1)%this.editorList.length;this.current=this.editorList[e];break}case"add":{if(this.editorList.length>=this.capacity)break;this.editorList.push({yaml:f,preview:{}}),this.current=this.editorList[this.editorList.length-1],this.saveFlag=!this.saveFlag;break}case"delete":{if(this.editorList.length<=1)break;const e=this.editorList.indexOf(this.current);this.editorList.splice(e,1);const o=(e+this.editorList.length)%this.editorList.length;this.current=this.editorList[o];break}default:this.current=t}}}},Ie={class:"resume"},Oe={class:"tool-section"},Se=a("title",null,null,-1),Re={class:"preview-section"};function Ne(t,e,o,n,r,s){const i=p("tool-bar"),m=p("editor"),_=p("preview");return l(),d("article",Ie,[a("section",Oe,[Se,h(i,{onChangeEditorList:s.changeEditorList,onGetEditorValue:e[0]||(e[0]=x=>r.saveFlag=!r.saveFlag),onExportPreview:e[1]||(e[1]=x=>r.exportFlag=!r.exportFlag),onChangePreview:e[2]||(e[2]=x=>r.previewFlag=!r.previewFlag),editorList:r.editorList,current:r.current},null,8,["onChangeEditorList","editorList","current"]),h(m,{current:r.current,saveFlag:r.saveFlag},null,8,["current","saveFlag"])]),a("section",Re,[h(_,{current:r.current,exportFlag:r.exportFlag,previewFlag:r.previewFlag},null,8,["current","exportFlag","previewFlag"])])])}var Te=u($e,[["render",Ne]]);const Ve={name:"App",components:{Resume:Te}};function Ae(t,e,o,n,r,s){const i=p("Resume");return l(),L(i)}var De=u(Ve,[["render",Ae]]);V(De).mount("#app");export{u as _};
