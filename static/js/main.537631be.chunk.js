(this["webpackJsonppersonal-web"]=this["webpackJsonppersonal-web"]||[]).push([[0],[,,,,function(e,t,i){e.exports=i.p+"static/media/Sean_Resume.01b9f1f6.pdf"},function(e,t,i){e.exports=i(13)},,,,,function(e,t,i){},function(e,t,i){e.exports=i.p+"static/media/Raleway-SemiBold.17ba6410.ttf"},function(e,t,i){},function(e,t,i){"use strict";i.r(t);var n=i(0),a=i.n(n),r=i(3),o=i.n(r),s=(i(10),i(11),i(1)),h=i(4),c=i.n(h),l=(i(12),function(e,t,i,n){var a=[],r=.1*e;r>400&&(r=400);for(var o=0;o<r;o++){var s=Math.random()*e,h=Math.random()*t,c={origX:s,origY:h,x:s,y:h},l=Math.hypot(c.x-i,c.y-n),d=0,u=0;l<=20?(d=.5,u=5):l<100&&(d=20/l*.5,u=20/l*5),c.brightness=1-d,c.origSize=5*(Math.random()+.3)+u,c.size=c.origSize,a.push(c)}return a}),d=function(){var e=Object(n.useRef)(),t=Object(n.useState)({width:window.innerWidth,height:window.innerHeight}),i=Object(s.a)(t,2),r=i[0],o=i[1],h=Object(n.useState)({x:r.width/2,y:r.height/2}),c=Object(s.a)(h,2),d=c[0],u=c[1],m=Object(n.useState)(l(r.width,r.height,d.x,d.y)),w=Object(s.a)(m,2),g=w[0],f=w[1],b=function(){o({width:window.innerWidth,height:window.innerHeight}),f(l(window.innerWidth,window.innerHeight,window.innerWidth,window.innerHeight))},p=function(e){u({x:e.x,y:e.y}),f(function(e,t,i){for(var n=0;n<e.length;n++){var a=Math.hypot(e[n].x-t,e[n].y-i),r=0,o=0;a<=20?(o=.5,r=8):a<100&&(o=20/a*.5,r=20/a*8),e[n].brightness=1-o,e[n].size=e[n].origSize+r}return e}(g,e.x,e.y))};return Object(n.useEffect)((function(){return window.addEventListener("mousemove",p),function(){window.removeEventListener("mousemove",p)}}),[]),Object(n.useEffect)((function(){return window.addEventListener("resize",b),function(){return window.removeEventListener("resize",b)}})),Object(n.useEffect)((function(){var t,i=e.current,n=i.getContext("2d"),a=function(e){var t=e.backingStorePixelRatio||e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/t}(n);function o(e){this.x=e.x*a,this.y=e.y*a,this.size=e.size,this.brightness=e.brightness,this.starSpeed=.25,this.draw=function(){n.shadowColor="rgb(255,255,255)",n.shadowBlur=10,n.beginPath(),n.rect(this.x-this.size/2,this.y-this.size/2,this.size,this.size),n.fillStyle="rgba(255,255,255,1)",n.fill()},this.update=function(){var t=Math.random()-.5,i=Math.random()-.5,n=0;t>.1?n=this.starSpeed:t<.1&&(n=-this.starSpeed);var r=0;i>.1?r=this.starSpeed:i<.1&&(r=-this.starSpeed),this.x>e.origX*a&&Math.abs(this.x-e.origX*a)>=5?e.x-=1/a:this.x<e.origX*a&&Math.abs(this.x-e.origX*a)>=5?e.x+=1/a:e.x+=r/a,this.y>e.origY*a&&Math.abs(this.y-e.origY*a)>=5?e.y-=1/a:this.y<e.origY*a&&Math.abs(this.y-e.origY*a)>=5?e.y+=1/a:e.y+=n/a,this.draw()}}i.width=r.width*a,i.height=r.height*a,i.style.width="".concat(r.width,"px"),i.style.height="".concat(r.height,"px");return function e(){n.clearRect(0,0,i.width,i.height);for(var a=0;a<g.length;a++){new o(g[a]).update()}t=requestAnimationFrame(e)}(),function(){cancelAnimationFrame(t)}})),a.a.createElement("canvas",{className:"main-canvas",ref:e,"data-paper-resize":!0})};var u=function(){return a.a.createElement("div",null,a.a.createElement("div",{className:"title-container"},a.a.createElement("span",null,"Hello, I'm"),a.a.createElement("span",{id:"nameTitle"}," Sean Kim"),a.a.createElement("span",null,"."),a.a.createElement("div",{className:"link-container"},a.a.createElement("a",{className:"main-link",target:"_blank",href:"https://github.com/SeanKimCC"},"Github"),a.a.createElement("a",{className:"main-link",target:"_blank",href:c.a},"Resume"))),a.a.createElement(d,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(u,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[5,1,2]]]);
//# sourceMappingURL=main.537631be.chunk.js.map