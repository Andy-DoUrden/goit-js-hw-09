const t={body:document.querySelector("body"),start:document.querySelector("button[data-start]"),stop:document.querySelector("button[data-stop]")};let e=null;function o(){if(t.start.disabled)return t.start.disabled=!1,void(t.stop.disabled=!0);t.start.disabled=!0,t.stop.disabled=!1}t.start.addEventListener("click",(function(){o(),e=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),t.stop.addEventListener("click",(function(){o(),clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.145dcb49.js.map