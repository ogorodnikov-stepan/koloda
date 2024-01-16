"use strict";(self.webpackChunkkoloda=self.webpackChunkkoloda||[]).push([[997],{7358:(e,s,n)=>{n.d(s,{Z:()=>l});var t=n(7294),a=n(6362),i=a.jU?window:null,c=function(e){return!!e.addEventListener},r=function(e){return!!e.on};const o=function(e,s,n,o){void 0===n&&(n=i),(0,t.useEffect)((function(){if(s&&n)return c(n)?(0,a.on)(n,e,s,o):r(n)&&n.on(e,s,o),function(){c(n)?(0,a.S1)(n,e,s,o):r(n)&&n.off(e,s,o)}}),[e,s,n,JSON.stringify(o)])};const l=function(e,s,n,i){void 0===s&&(s=a.ZT),void 0===n&&(n={}),void 0===i&&(i=[e]);var c=n.event,r=void 0===c?"keydown":c,l=n.target,d=n.options,u=(0,t.useMemo)((function(){var n,t="function"==typeof(n=e)?n:"string"==typeof n?function(e){return e.key===n}:n?function(){return!0}:function(){return!1};return function(e){if(t(e))return s(e)}}),i);o(r,u,l,d)}},5997:(e,s,n)=>{n.r(s),n.d(s,{default:()=>De});var t=n(5893),a=n(7294),i=n(5977),c=n(6228),r=n(6056),o=n(2327),l=n(5608),d=n(8767),u=n(1068),p=n(781);var m=n(8172),f=n(3465),h=n.n(f),_=n(9589),g=n(3946),x=n(9013),v=n(3882);function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function k(e,s){if((0,v.Z)(2,arguments),!s||"object"!==j(s))return new Date(NaN);var n=s.years?(0,g.Z)(s.years):0,t=s.months?(0,g.Z)(s.months):0,a=s.weeks?(0,g.Z)(s.weeks):0,i=s.days?(0,g.Z)(s.days):0,c=s.hours?(0,g.Z)(s.hours):0,r=s.minutes?(0,g.Z)(s.minutes):0,o=s.seconds?(0,g.Z)(s.seconds):0,l=(0,x.Z)(e),d=t||n?function(e,s){(0,v.Z)(2,arguments);var n=(0,x.Z)(e),t=(0,g.Z)(s);if(isNaN(t))return new Date(NaN);if(!t)return n;var a=n.getDate(),i=new Date(n.getTime());return i.setMonth(n.getMonth()+t+1,0),a>=i.getDate()?i:(n.setFullYear(i.getFullYear(),i.getMonth(),a),n)}(l,t+12*n):l,u=i||a?function(e,s){(0,v.Z)(2,arguments);var n=(0,x.Z)(e),t=(0,g.Z)(s);return isNaN(t)?new Date(NaN):t?(n.setDate(n.getDate()+t),n):n}(d,i+7*a):d,p=1e3*(o+60*(r+60*c));return new Date(u.getTime()+p)}var N=n(2552),y=n(3900),b=n(2608);function D(e,s){if(e.lesson.isProcessed)return;e.cards.forEach((e=>{const{divel:n,phase:t}=e.progress||{},a=!n||!t,i=(0,y.Fr)(s,n),c=i&&(0,y.jK)(i,t),r=a?y.aV:c&&(0,y.UJ)(c);e.lesson={..._.Ez,isInitial:a},a&&i&&(e.lesson.divel=i.id),r?e.lesson.actions=r:e.lesson.isError=!0}));const n=e.cards.findIndex((e=>!e.lesson.isError));E(e),e.lesson.currentCard=n,e.lesson.isError=-1===n,e.lesson.isProcessed=!0}function Z(e,s){return e.cards.findIndex((({lesson:e},n)=>!e.isDone&&!e.isError&&n>s))}function I(e){const{queue:s,current:{index:n},decks:t}=e,a=e.current.deck||t[s.decks[n.deck]];if(!a)return;if(!a.lesson.isDone&&a.lesson.currentCard>n.card)return n.card=a.lesson.currentCard,void $(e);const i=s.decks.findIndex(((e,s)=>!t[e].data?.lesson.isDone&&s>n.deck));if(-1!==i){const a=s.decks[i];n.deck=i,t[a]?t[a].lesson.isProcessed?(n.card=t[a].lesson.currentCard,$(e)):n.card=-1:(e.meta.isPending=!0,e.meta.pendingDeck=a,n.card=-1)}else{const a=s.decks.findIndex((e=>!t[e]?.lesson.isDone&&!t[e]?.lesson.isError));if(-1!==a){const i=s.decks[a];n.deck=a,n.card=t[i].lesson.currentCard,$(e)}else e.meta.isDone=!0}}function $(e){const{plan:s,decks:n,reppings:t,current:a}=e,{deckId:i,reppingId:c}=s.find(((e,s)=>s===a.index.deck))||{},r=i?n[i]:void 0,o=c?t[c]:void 0,l=r&&r.cards[a.index.card],{actions:d=[],currentActionIndex:u=0}=l?.lesson||{},p=d[u][0];if(r&&l&&o&&p){e.meta.isStarted=!0,a.deckId=r.id,a.reppingId=o.id,a.deck=r,a.card=l,a.repping=o,a.action||(a.action={});const{action:s}=a;s.isInitial=l.lesson.isInitial,s.divelIndex=l.lesson.isInitial?o.divels.findIndex((e=>e.id===l.lesson.divel)):o.divels.findIndex((e=>e.id===l?.progress?.divel)),s.type=(0,y.Z1)(p),s.fields=function(e,s,n){const t=(0,y.mt)(n),a=s&&e.map((e=>({...e,content:s?.content?.[`${e.id}`]||(0,b.WI)(e),isTested:t===(0,b.cI)(e.role)})));return a}(r.fields,l,p),s.actionResetFlag=!s.actionResetFlag}}function C(e,s,n,t){if(!n.lesson.isDone)return;const a=function(e,s){const{divel:n,phase:t}=e.progress||{};if(!n||!t)return null;const a=(0,y.Fr)(s,n),i=a&&(0,y.jK)(a,t),c=i&&(0,y.rC)(i,e),r=!!c&&function(e,s,n){if(!e)return!1;const[t,a=0]=e.offset;switch((0,y.N3)(t)){case"back":{const e=(0,y.QU)(s,n),t=null!==e&&(0,y.av)(s,e-a);return!!t&&t.id}case"forward":{const e=(0,y.QU)(s,n),t=null!==e&&(0,y.av)(s,e+a);return!!t&&t.id}case"to":return!!(0,y.jK)(s,a)&&a;case"repeat":return n;case"complete":return!0;default:return!1}}(c,a,t);switch(r){case!1:return null;case!0:return{cardId:e.id,dueAt:(0,N.o)(new Date),isCompleted:!0};default:{const s=function(e,s=new Date){const n={years:e[0],months:e[0],weeks:e[0],days:e[0],hours:e[0]};return k(s,n)}(c.delay);return{cardId:e.id,dueAt:(0,N.o)(s),divel:n,phase:r}}}}(n,t);if(a){const n=e.findIndex((e=>e.deckId===s.id));e[n].cards.push(a)}}function E(e){e.lesson.cardsTotal=e.cards.length,e.lesson.cardsDone=e.cards.filter((e=>e.lesson.isError||e.lesson.isDone)).length}function w(e){const{progress:s,plan:n,decks:t}=e;s.cardsTotal=n.reduce(((e,{deckId:s})=>e+(t[s]?.lesson?.cardsTotal||0)),0),s.cardsDone=n.reduce(((e,{deckId:s})=>e+(t[s]?.lesson?.cardsDone||0)),0),s.percentage=(s.cardsDone/s.cardsTotal*100).toFixed(1)}const S={meta:{},plan:[],queue:{decks:[],reppings:[]},decks:{},reppings:{},results:[],progress:{cardsTotal:0,cardsDone:0,percentage:"0"},current:{index:{deck:0,card:-1}}},q={planReceived:function(e,{data:s}){e.plan=s,e.meta.isLoaded=!0,e.queue.decks=s.map((e=>e.deckId)),e.queue.reppings=[...new Set(s.map((e=>e.reppingId)))],e.meta.isPending=!0,e.meta.pendingDeck=s[0].deckId,e.meta.pendingRepping=s[0].reppingId,e.queue.deck=s[0].deckId,e.queue.repping=s[0].reppingId},reppingReceived:function(e,{data:s}){const n=s.id;e.reppings[n]=h()(s);e.plan.filter((e=>e.reppingId===n)).map((e=>e.deckId)).forEach((n=>{e.decks[n]&&D(e.decks[n],s)})),w(e),e.meta.pendingRepping===n&&(e.meta.pendingRepping=void 0,e.meta.pendingDeck||(e.meta.isPending=!1,I(e)));const t=e.queue.reppings.findIndex((e=>e===s.id));e.queue.repping=e.queue.reppings[t+1]},deckReceived:function(e,{data:s}){const n=s.id;e.decks[n]=h()(s),e.decks[n].lesson=h()(_.ak);const t=e.reppings[s.reppingId];t&&(D(e.decks[n],t),w(e));const a=e.plan.findIndex((e=>e.deckId===n));e.results[a]={deckId:n,cards:[]},e.meta.pendingDeck===n&&(e.meta.pendingDeck=void 0,t&&!e.meta.pendingRepping&&(e.meta.isPending=!1,I(e)));e.queue.deck=e.queue.decks[a+1]},actionSubmitted:function(e,s){const{decks:n,reppings:t,current:{deckId:a,reppingId:i,index:c},results:r}=e;if(!a||!i)return;const o=n[a],l=t[i],d=o.cards[c.card];l&&o&&d&&(!function(e,s,n){const{result:t,isError:a}=n,{results:i,currentActionIndex:c}=e.lesson;if(!a&&i){if(i[c]||(i[c]={correct:0,incorrect:0}),t?i[c].correct+=1:i[c].incorrect+=1,function({correct:e=0,incorrect:s=0}){return e>=s+1}(i[c]))if(function({lesson:e}){return e.currentActionIndex>=e.actions.length-1}(e))if(e.lesson.isInitial){const n=(0,y.Fr)(s,e.lesson.divel),t=n&&(0,y.jK)(n),a=t&&(0,y.UJ)(t);n&&t&&a?(e.lesson={..._.Ez,divel:n.id,phase:t.id,actions:a},e.progress={divel:n.id,phase:t.id}):e.lesson.isError=!0}else e.lesson.isDone=!0;else e.lesson.currentActionIndex=c+1}else e.lesson.isError=!0}(d,l,s),function(e){const{currentCard:s}=e.lesson,n=Z(e,s);if(-1!==n)e.lesson.currentCard=n;else{const s=Z(e,-1);e.lesson.currentCard=s,e.lesson.isDone=-1===s}}(o),C(r,o,d,l),(d.lesson.isDone||d.lesson.isError)&&(E(o),w(e)),I(e))},divelSet:function(e,{index:s}){const{current:{card:n,repping:t,action:a}}=e,i=t?.divels[s];i&&n&&a&&(n.lesson.divel=i.id,a.divelIndex=s)},lessonTerminated:function(e){e.meta.isTerminated=!0}};const R=(0,m.ZP)(((e,[s,n])=>(q[s]&&q[s](e,n),e)));var T=n(6829),F=n(530),P=n(7443),L=n(7450);const A="srs:lessons.status.loading";function U(){const{t:e}=(0,o.$)();return(0,t.jsx)("div",{className:"lesson__loading",children:(0,t.jsx)("span",{className:"lesson__loading-message",children:e(`${A}.message`)})})}const O="srs:lessons.status.pedning";function H({state:e}){const{t:s}=(0,o.$)(),{meta:{pendingDeck:n,pendingRepping:a}}=e;return(0,t.jsx)("div",{className:"lesson__pending",children:(0,t.jsx)("span",{className:"lesson__pending-message",children:s(`${O}.message`)})})}const M="srs:lessons.status.paused";function Y(){const{t:e}=(0,o.$)();return(0,t.jsx)("div",{className:"lesson__paused",children:(0,t.jsx)("span",{className:"lesson__paused-message",children:e(`${M}.message`)})})}const Q="srs:lessons.status.empty";function z(){const{t:e}=(0,o.$)();return(0,t.jsx)("div",{className:"lesson__status","data-status":"empty",children:(0,t.jsx)("span",{className:"lesson__empty-message",children:e(`${Q}.message`)})})}const K="srs:lessons.status.done";function J({state:e}){const{t:s}=(0,o.$)(),n=(0,c.oR)(c.zr),{mutate:i,status:r}=(l={isDemo:n},(0,d.useMutation)((async e=>(0,p.Y)("srs","lesson_results_set",[204],e,l))));var l;const{results:u}=e;return(0,a.useEffect)((()=>{i({data:u})}),[]),(0,t.jsxs)("div",{className:"lesson__status","data-status":"done",children:[(0,t.jsx)("h2",{className:"lesson__done-title",children:s(`${K}.title`)}),(0,t.jsx)("div",{className:"lesson__results-upload-status","data-status":r,children:s(`${K}.status.${r}`)})]})}var V=n(7358),B=n(7325),W=n(6347);const G={Digit1:0,Digit2:1,Digit3:2,Digit4:3,Digit5:4,Digit6:5,Digit7:6,Digit8:7,Digit9:8,Digit0:9};function X({state:e,dispatch:s}){const{divels:n}=e.current.repping,{divelIndex:i,isInitial:c}=e.current.action,r=(0,a.useState)(c),o=(0,a.useCallback)((({currentTarget:{name:e}})=>{s(["divelSet",{index:(0,W.e$)(e)}])}),[]),l=(0,a.useCallback)((({code:e})=>r&&void 0!==G[e]),[r]),d=(0,a.useCallback)((({code:e})=>{const t=G[e];void 0!==n[t]&&t!==i&&s(["divelSet",{index:t}])}),[n,i]);return(0,V.Z)(l,d),(0,t.jsx)("ul",{className:"lesson__divels",children:n.map(((e,s)=>(0,t.jsx)("li",{className:"lesson__divels-item",children:(0,t.jsxs)(B.Z,{className:"lesson__divels-item-button",name:`${s}`,"data-is-selected":s===i,onClick:o,children:[r&&(0,t.jsx)("span",{className:"lesson__divels-item-number",children:s+1}),(0,t.jsx)("span",{className:"lesson__divels-item-title",children:e.title})]})},e.id)))})}var ee=n(7139),se=n(37);const ne="srs:lessons.fieldTypes.text";const te={text:function({type:e,field:s,value:n,readonly:a,isError:i,onChange:c}){const r=s?.settings?.actions?.[e]?.isLabelVisible&&s.title,o=s?.content?.[0]?.text;return(0,t.jsxs)("li",{className:"lesson__fields-item",children:[a||i?(0,t.jsxs)("div",{className:"lesson__field",children:[r&&(0,t.jsx)("span",{className:"lesson__field-label",children:r}),(0,t.jsx)("span",{className:"lesson__field-value","data-is-empty":!(i?n:o),"data-is-incorrect":i,children:(i?n:o)||(0,se.t)(`${ne}.empty`)})]}):(0,t.jsx)(ee.Z,{className:"lesson__field",label:r,name:`${s.id}`,value:n,placeholder:i?o:"",readOnly:a,autoFocus:s.isFocused,"data-is-correct":!0===s.isCorrect,onChange:c}),i&&(0,t.jsx)("div",{className:"lesson__field",children:(0,t.jsx)("span",{className:"lesson__field-value","data-is-empty":!o,"data-is-correct":"true",children:o||(0,se.t)(`${ne}.empty`)})})]})}};function ae({type:e,field:s,value:n,readonly:a,isError:i,onChange:c}){const r=(0,b.MR)(s.type),o=r&&te[r];return o?(0,t.jsx)(o,{type:e,field:s,value:n,readonly:a,isError:i,onChange:c}):null}var ie=n(7199);const ce={actionReset:function(e,{fields:s}){e.meta={},e.result=!0,e.fields=s.map((e=>({...e,value:""})));const n=e.fields.findIndex((e=>e.isTested));-1!==n&&(e.fields[n].isFocused=!0)},fieldChanged:function(e,{field:s,value:n}){const t=e.fields.findIndex((e=>e.id===(0,W.e$)(s)));e.fields[t]&&(e.fields[t].value=n)},actionSubmitted:function(e){const{fields:s,meta:n}=e;if(!0===n.isSubmited)n.isDone=!0;else{n.isSubmited=!0,s.forEach(((e,n)=>{e.isTested&&(s[n].isCorrect=(0,ie.H)(e))}));const t=-1===s.findIndex((e=>e.isTested&&!e.isCorrect));n.isDone=t,e.result=e.result&&t}}},re={meta:{},result:!0,fields:[]};const oe=(0,m.ZP)(((e,[s,n])=>(ce[s]&&ce[s](e,n),e))),le="srs:lessons.actions.typeTest";function de({state:e,dispatch:s}){const{t:n}=(0,o.$)("srs"),{action:i}=e.current,[c,r]=(0,a.useReducer)(oe,re),{meta:{isDone:l,isSubmited:d},result:u,fields:p}=c;(0,a.useEffect)((()=>{r(["actionReset",{fields:i?.fields}])}),[i]),(0,a.useEffect)((()=>{const e=setTimeout((()=>{l&&s(["actionSubmitted",{result:u}])}),500);return()=>clearTimeout(e)}),[l,u]);const m=(0,a.useCallback)((({target:{name:e,value:s}})=>{r(["fieldChanged",{field:e,value:s}])}),[]),f=(0,a.useCallback)((()=>{r(["actionSubmitted",{}])}),[]),h=(0,a.useCallback)((()=>{s(["actionSubmitted",{result:!0}])}),[]),_=(0,a.useCallback)((()=>{f()}),[]);return(0,V.Z)("Enter",_),(0,t.jsxs)(t.Fragment,{children:[!l&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("ul",{className:"lesson__fields",children:p.map((e=>(0,t.jsx)(ae,{type:"typeTest",field:e,value:e.value,readonly:!e.isTested,isError:!1===e.isCorrect,onChange:m},e.id)))}),(0,t.jsxs)("div",{className:"lesson__action-controls",children:[(0,t.jsx)(B.Z,{className:"lesson__action-submit","data-action-type":"type-test","data-on-click":d?"submit":"check",onClick:f,content:n(`${le}.${d?"submit":"check"}`)}),d&&(0,t.jsx)(B.Z,{className:"lesson__action-mark-correct","data-action-type":"type-test",onClick:h,content:n(`${le}.markCorrect`)})]})]}),l&&u&&(0,t.jsx)("div",{className:"lesson__action-status",children:(0,t.jsx)("span",{className:"lesson__action-status-message","data-status":"correct",children:n(`${le}.correct`)})})]})}const ue={show:function({state:e,dispatch:s}){const{t:n}=(0,o.$)(),{fields:i=[]}=e.current.action,c=(0,a.useCallback)((()=>{s(["actionSubmitted",{result:!0}])}),[]);return(0,V.Z)("Enter",c),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"lesson__fields",children:i.map((e=>(0,t.jsx)(ae,{type:"show",field:e,readonly:!0},e.id)))}),(0,t.jsx)(B.Z,{className:"lesson__action-submit",onClick:c,content:n("srs:lessons.actions.show.submit")})]})},typeTest:de,typeTestReverse:de};function pe({state:e,dispatch:s}){const{type:n="unknown",isInitial:a}=e.current.action||{},i=n&&ue[n];return i?(0,t.jsxs)("div",{className:"lesson__action","data-action-type":"show",children:[(0,t.jsx)(i,{state:e,dispatch:s}),a&&(0,t.jsx)(X,{state:e,dispatch:s})]}):null}function me({state:e,dispatch:s}){const{meta:{isLoaded:n,isPending:a,isPaused:i,isStarted:c,isDone:r}}=e;return(0,t.jsx)(L.Z,{children:(0,t.jsxs)(L.Z.Content,{children:[!n&&(0,t.jsx)(U,{}),n&&a&&(0,t.jsx)(H,{state:e}),n&&!a&&i&&(0,t.jsx)(Y,{}),r&&c&&(0,t.jsx)(J,{state:e}),r&&!c&&(0,t.jsx)(z,{}),n&&!a&&!i&&!r&&(0,t.jsx)(pe,{state:e,dispatch:s})]})})}function fe({state:e}){const{progress:{cardsTotal:s,cardsDone:n,percentage:a}}=e;return(0,t.jsxs)("div",{className:"lesson__progress",children:[(0,t.jsx)("div",{className:"lesson__progress-bar",children:(0,t.jsx)("div",{className:"lesson__progress-bar-fill",style:{width:`${a}%`}})}),(0,t.jsx)("span",{className:"lesson__progress-text",children:`${n} / ${s}`})]})}var he=n(9293);const _e="srs:lessons.queue",ge=["title","cards","repping"];function xe({state:e}){const{t:s}=(0,o.$)(),{plan:n,decks:a,reppings:i}=e;return(0,t.jsxs)("table",{className:"lesson__queue-table",children:[(0,t.jsx)("thead",{className:"lesson__queue-table-head",children:(0,t.jsx)("tr",{className:"lesson__queue-table-row","data-row-type":"head",children:ge.map((e=>(0,t.jsx)("td",{className:"lesson__queue-table-cell","data-cell-type":"head","data-cell-column":e,children:(0,t.jsx)("span",{className:"lesson__queue-table-cell-value",children:s(`${_e}.captions.${e}`)})},e)))})}),(0,t.jsx)("tbody",{className:"lesson__queue-table-body",children:n.map((({title:e,deckId:s,reppingId:n})=>(0,t.jsxs)("tr",{className:"lesson__queue-table-row","data-row-type":"body",children:[(0,t.jsx)("td",{className:"lesson__queue-table-cell","data-cell-type":"body","data-cell-column":"title",children:(0,t.jsx)("span",{className:"lesson__queue-table-cell-value",children:e})}),(0,t.jsx)("td",{className:"lesson__queue-table-cell","data-cell-type":"body","data-cell-column":"cards",children:(0,t.jsx)("span",{className:"lesson__queue-table-cell-value","data-is-loaded":!!a[s]})}),(0,t.jsx)("td",{className:"lesson__queue-table-cell","data-cell-type":"body","data-cell-column":"repping",children:(0,t.jsx)("span",{className:"lesson__queue-table-cell-value","data-is-loaded":!!i[n]})})]},s)))})]})}function ve({state:e}){const s=(0,i.TH)(),[n,c]=(0,a.useReducer)((e=>!e),!1),r=(0,a.useRef)(null),{queue:{deck:o,repping:l},meta:{isStarted:d,isDone:u}}=e,p=u&&!d;return(0,he.Z)(r,(()=>{n&&c()})),(0,a.useEffect)((()=>{n&&c()}),[s.pathname]),(0,t.jsxs)("div",{className:"lesson__queue dropdown",ref:r,children:[(0,t.jsx)(B.Z,{className:"lesson__queue-button dropdown__toggle","data-is-open":n,"data-is-done":!(o||l),disabled:p,onClick:c}),!p&&(0,t.jsx)("div",{className:"lesson__queue-content dropdown__content","data-is-open":n,children:(0,t.jsx)(xe,{state:e})})]})}var je=n(2880);function ke({isNecessary:e,url:s,prefix:n}){const{t:c}=(0,o.$)(),{push:r}=(0,i.k6)(),[l,d]=(0,a.useState)(!1),u=(0,a.useCallback)((()=>{e?d((e=>!e)):r(s)}),[e,d]),p=(0,a.useCallback)((()=>{r(s)}),[s]);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(B.Z,{className:"lesson__terminate-button",onClick:u,title:c(`${n}.button.tooltip`),content:c(`${n}.button.text`)}),l&&(0,t.jsx)(je.Z,{close:u,children:(0,t.jsxs)("div",{className:"lesson__terminate-content",children:[(0,t.jsx)("span",{className:"lesson__terminate-message",children:c(`${n}.message`)}),(0,t.jsxs)("div",{className:"lesson__terminate-actions",children:[(0,t.jsx)(B.Z,{className:"lesson__terminate-confirm",onClick:p,content:c(`${n}.confirm`)}),(0,t.jsx)(B.Z,{className:"lesson__terminate-cancel",onClick:u,content:c(`${n}.cancel`)})]})]})})]})}const Ne="srs:lessons.ui.close";function ye({state:e,dispatch:s}){const n=(0,c.oR)(c.zr),{meta:{isDone:a}}=e;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(F.Z,{prefix:"lesson",children:[(0,t.jsx)(ve,{state:e}),(0,t.jsx)(fe,{state:e}),(0,t.jsx)("div",{className:"lesson__controls",children:(0,t.jsx)(ke,{isNecessary:!a,prefix:Ne,url:T.Z.home({isDemo:n})})})]}),(0,t.jsx)(P.Z,{prefix:"lesson",children:(0,t.jsx)(me,{state:e,dispatch:s})})]})}function be({type:e,params:s,isDemo:n}){const{t:i}=(0,o.$)(),[c,r]=(0,a.useReducer)(R,S),{queue:{deck:m,repping:f}}=c,h=function(e,s){return(0,d.useQuery)(["lesson","plan",e],(async()=>(0,p.Y)("srs","lesson_get",[200,404],e,s)))}({...s,type:e},{isDemo:n}),_=function(e,s){return(0,d.useQuery)(["lesson","deck",e],(async()=>(0,p.Y)("srs","lesson_deck_get",[200,404],e,s)),{...u.P7,enabled:!!e.id})}({limit:s.limit,type:e,id:m},{isDemo:n}),g=function(e,s){return(0,d.useQuery)(["lesson","repping",e],(async()=>(0,p.Y)("srs","lesson_repping_get",[200,404],e,s)),{enabled:!!e.id})}({id:f},{isDemo:n});return(0,a.useEffect)((()=>{document.title=l.Z.lesson(i,{isDemo:n})}),[i,n]),(0,a.useEffect)((()=>{h.data&&r(["planReceived",h.data])}),[h.data]),(0,a.useEffect)((()=>{_.data&&r(["deckReceived",_.data])}),[_.data]),(0,a.useEffect)((()=>{g.data&&r(["reppingReceived",g.data])}),[g.data]),(0,t.jsx)(ye,{state:c,dispatch:r})}function De({isDemo:e}){const{type:s}=(0,i.UO)(),{search:n}=(0,i.TH)(),{isLoading:o}=(0,r.Z)({isDemo:e,isAuthRequired:!0}),l=(0,c.oR)(c.PV),d=(0,a.useMemo)((()=>Object.fromEntries(new URLSearchParams(n))),[n]);return(0,a.useLayoutEffect)((()=>(l(!1),()=>{l(!0)})),[]),o?null:(0,t.jsx)(be,{type:s,params:d,isDemo:e})}},6056:(e,s,n)=>{n.d(s,{Z:()=>o});var t=n(7294),a=n(5977),i=n(6228),c=n(6829),r=n(4232);function o({isDemo:e,isAuthRequired:s}){const{push:n}=(0,a.k6)(),o=(0,i.oR)(i.N1),{isLoading:l,data:d}=(0,r.rk)({isDemo:e});return(0,t.useEffect)((()=>{o(!!e)}),[e]),(0,t.useEffect)((()=>{!s||l||d?.data.uid||n(c.Z.home({isDemo:e}))}),[s,e,l,d?.data.uid]),{isLoading:s&&l}}},5608:(e,s,n)=>{n.d(s,{Z:()=>d});const t="app:titles",a=`${t}.delimiter`,i=`${t}.app`,c=`${t}.demo`,r=`${t}.reppings`,o=`${t}.decks`,l=(e,s)=>e.join(s),d={account:(e,{isDemo:s})=>l(s?[e(`${t}.account`),e(c),e(i)]:[e(`${t}.account`),e(i)],e(a)),learnings:(e,{isDemo:s})=>l(s?[e(c),e(i)]:[e(i)],e(a)),reppings:(e,{isDemo:s})=>l(s?[e(r),e(c),e(i)]:[e(r),e(i)],e(a)),repping:(e,{isDemo:s,repping:n})=>l(s?[n,e(r),e(c),e(i)]:[n,e(r),e(i)],e(a)),divel:(e,{isDemo:s,repping:n,divel:t})=>l(s?[t,n,e(r),e(c),e(i)]:[t,n,e(r),e(i)],e(a)),decks:(e,{isDemo:s})=>l(s?[e(o),e(c),e(i)]:[e(o),e(i)],e(a)),deck:(e,{isDemo:s,deck:n})=>l(s?[n,e(o),e(c),e(i)]:[n,e(o),e(i)],e(a)),lesson:(e,{isDemo:s})=>l(s?[e(`${t}.lesson`),e(c),e(i)]:[e(`${t}.lesson`),e(i)],e(a))}},7450:(e,s,n)=>{n.d(s,{Z:()=>o});var t=n(5893),a=n(6010);var i=n(2837);var c=n(4627);function r({className:e,entity:s,children:n,...i}){return(0,t.jsx)("div",{className:(0,a.Z)(e,"feature"),"data-entity":s,...i,children:n})}r.Header=function({children:e}){return(0,t.jsx)("header",{className:"feature__header",children:e})},r.Title=function({isLoading:e,children:s}){return e?(0,t.jsx)(i.Z,{}):(0,t.jsx)("h1",{className:"feature__title",children:s})},r.Toolbar=function({children:e}){return(0,t.jsx)("div",{className:"feature__toolbar",children:e})},r.Content=function({children:e}){return(0,t.jsx)(c.Z,{className:"feature__content",children:e})},r.Section=function({className:e,mode:s,children:n}){return(0,t.jsx)("div",{className:(0,a.Z)(e,"feature__section"),"data-mode":s,children:n})},r.SectionHeader=function({className:e,title:s,children:n}){return(0,t.jsxs)("div",{className:(0,a.Z)(e,"feature__section-header"),children:[s&&(0,t.jsx)("h2",{className:(0,a.Z)(`${e}__title`,"feature__section-header-title"),children:s}),n]})},r.SectionContent=function({className:e,children:s}){return(0,t.jsx)("div",{className:(0,a.Z)(e,"feature__section-content"),children:s})},r.Subsection=function({className:e,mode:s,children:n}){return(0,t.jsx)("div",{className:(0,a.Z)(e,"feature__subsection"),"data-mode":s,children:n})},r.SubsectionHeader=function({className:e,title:s,children:n}){return(0,t.jsxs)("div",{className:(0,a.Z)(e,"feature__subsection-header"),children:[s&&(0,t.jsx)("h3",{className:(0,a.Z)(`${e}__title`,"feature__subsection-header-title"),children:s}),n]})},r.SubsectionContent=function({className:e,children:s}){return(0,t.jsx)("div",{className:(0,a.Z)(e,"feature__subsection-content"),children:s})},r.Footer=function({children:e}){return(0,t.jsx)("header",{className:"feature__footer",children:e})};const o=r},2880:(e,s,n)=>{n.d(s,{Z:()=>o});var t=n(5893),a=n(7294),i=n(3935),c=n(9293),r=n(7358);function o({close:e,children:s}){const n=(0,a.useRef)(null);return(0,c.Z)(n,(()=>{e&&e()})),(0,r.Z)("Escape",e),i.createPortal((0,t.jsx)("div",{className:"app-modal__overlay",children:(0,t.jsx)("div",{className:"app-modal__content",ref:n,children:s})}),document.getElementById("app-modal"))}},2837:(e,s,n)=>{n.d(s,{Z:()=>i});var t=n(5893),a=n(6010);function i({className:e}){return(0,t.jsx)("div",{className:(0,a.Z)(e,"skeleton-title skeleton")})}},7199:(e,s,n)=>{n.d(s,{H:()=>i,t:()=>a});const t=[["á","a"],["Á","A"],["é","e"],["É","E"],["í","i"],["Í","I"],["ó","o"],["Ó","O"],["ú","u"],["Ú","U"],["ü","u"],["Ü","U"],["ñ","n"],["Ñ","N"],["ё","е"],["Ё","Е"]],a={trimSpaces:function(e){return e.map((e=>e.trim()))},ignoreCase:function(e){return e.map((e=>e.toLowerCase()))},ignorePunctuation:function(e){return e.map((e=>e.replace(/[^\w\s]|_/g,"")))},ignoreAccents:function(e){return t.reduce((([e,s],[n,t])=>[e.replace(n,t),s.replace(n,t)]),e)}};function i(e){const s=e.value||"",n=e?.content?.[0]?.text||"";if(s===n)return!0;const{processings:t={}}=e.settings.actions?.typeTest||{},i=Object.keys(t).filter((e=>t[e])),[c,r]=i.reduce((([e,s],n)=>Object.prototype.hasOwnProperty.call(a,n)?a[n]([e,s]):[e,s]),[s,n]);return c===r}}}]);