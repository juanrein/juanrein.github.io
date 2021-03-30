(()=>{"use strict";var t;!function(t){t.DELETE="delete",t.ADD="add"}(t||(t={}));var e,n=function(){function e(t){this.defaults=t,this.values=Object.assign({},t)}return e.prototype.handleInputValueChange=function(e){var n=e.id,i=e.value;switch(n){case"edgeValue":this.values.edgeValue=i;break;case"nodeValue":this.values.nodeValue=i;break;case"radius":var o=parseFloat(i);!isNaN(o)&&o>0&&(this.values.radius=o);break;case"delete":this.values.mode=t.DELETE;break;case"add":this.values.mode=t.ADD;break;default:console.error(n,i)}},e}(),i=function(){function e(t,e,n){this.view=e,this.graph=t,this.valueController=n}return e.prototype.handleMouseDown=function(t){var e=t.offsetX,n=t.offsetY;this.mouseDownPoint={x:e,y:n}},e.prototype.handleMouseUp=function(e){var n=e.offsetX,i=e.offsetY,o={point:{x:n,y:i},radius:this.valueController.values.radius},r=this.graph.find(this.mouseDownPoint),s=this.graph.find(o.point);if(r||s)if(r&&s)if(r.equals(s))this.valueController.values.mode===t.DELETE?this.graph.delete(r):this.valueController.values.mode===t.ADD&&(c=this.valueController.values.edgeValue,this.graph.connect(r,s,c));else{var c=this.valueController.values.edgeValue;this.graph.connect(r,s,c)}else r&&!s&&(r.circle.point.x=n,r.circle.point.y=i);else"<autoincrement>"===this.valueController.values.nodeValue?this.graph.addNode(o,null):this.graph.addNode(o,this.valueController.values.nodeValue);this.view.update()},e}(),o=function(){function t(t){this.graph=t}return t.prototype.handleExport=function(t){var e=JSON.stringify(this.graph,null,4);navigator.clipboard.writeText(e)},t}();function r(t){return{x:(t.x1+t.x2)/2,y:(t.y1+t.y2)/2}}function s(t){return{x:(t.cp1x+t.cp2x)/2,y:(t.cp1y+t.cp2y)/2}}function c(t,e){var n=t.point,i=n.x,o=n.y,r=t.radius,s=e.x,c=e.y;return(s-i)*(s-i)+(c-o)*(c-o)<=r*r}function a(t,e){var n=t.radius,i=t.point,o=i.x,r=i.y,s=e.radius,c=e.point,a=c.x,u=c.y;return Math.sqrt((o-a)*(o-a)+(r-u)*(r-u))<=n+s}function u(t){return t*(Math.PI/180)}function h(t){var n=t.point,i=n.x,o=n.y,r=t.radius;return{type:e.Curve,x1:i+r*Math.cos(u(-5)),y1:o+r*Math.sin(u(-5)),cp1x:i+2*r,cp1y:o-r,cp2x:i+2*r,cp2y:o+r,x2:i+r*Math.cos(u(5)),y2:o+r*Math.sin(u(5))}}!function(t){t[t.Curve=0]="Curve",t[t.Line=1]="Line"}(e||(e={}));var d=function(){function t(e,n){this.circle=e,this.id=t.identifier,t.identifier++,this.value=null==n?this.id.toString():n}return t.prototype.equals=function(t){return this.id==t.id},t.identifier=0,t}(),l=function(){function t(t){this.nodes=[],this.connections=[],this.directed=t}return t.prototype.addNode=function(t,e){var n=new d(t,e);return this.nodes.push(n),this.connections.push([]),n},t.prototype.find=function(t){if(t)for(var e=0,n=this.nodes;e<n.length;e++){var i=n[e];if(c(i.circle,t))return i}},t.prototype.intersectsAny=function(t){for(var e=0,n=this.nodes;e<n.length;e++)if(a(n[e].circle,t))return!0;return!1},t.prototype.connect=function(t,e,n){var i=this.nodes.findIndex((function(e){return t.equals(e)})),o=this.nodes.findIndex((function(t){return e.equals(t)}));if(-1==i||-1==o)throw new Error("Both nodes don't exist "+t+" "+e);this.connections[i].find((function(t){return t.to===o}))||(this.connections[i].push({to:o,value:n}),this.directed||this.connections[o].find((function(t){return t.to===i}))||this.connections[o].push({to:i,value:n}))},t.prototype.getConnectionsAsLines=function(){for(var t,n,i,o,c,a,u,d,l,f,p,v,x,y,g,w,E,m,C=[],D=0;D<this.connections.length;D++)for(var L=this.nodes[D].circle,M=0;M<this.connections[D].length;M++){var b=this.connections[D][M].value;if(this.connections[D][M].to===D){console.log("connection to self",D);var T=h(L),V={point:s(T),text:b};C.push({line:T,text:V})}else{var A=(t=L,n=this.nodes[this.connections[D][M].to].circle,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,i=t.point.x,o=t.point.y,c=n.point.x,a=n.point.y,u=t.radius,d=n.radius,f=a-o,p=i-c,v=o-a,g=(l=c-i)/(x=Math.sqrt(l*l+f*f)),w=f/x,E=p/(y=Math.sqrt(p*p+v*v)),m=v/y,{type:e.Line,x1:i+g*u,y1:o+w*u,x2:c+E*d,y2:a+m*d});V={point:r(A),text:b},C.push({line:A,text:V})}}return C},t.prototype.delete=function(t){var e=this.nodes.findIndex((function(e){return e.equals(t)}));if(-1===e)throw new Error("Node doesn't exist "+t);this.nodes.splice(e,1),this.connections.splice(e,1);for(var n=0;n<this.connections.length;n++){var i=this.connections[n].findIndex((function(t){return t.to===e}));-1!==i&&this.connections[n].splice(i,1);for(var o=0;o<this.connections[n].length;o++)this.connections[n][o].to>e&&this.connections[n][o].to--}},t}(),f=function(){function t(t,e,n){this.canvas=t,this.ctx=e,this.ctx.lineWidth=2,this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.graph=n,this.update()}return t.prototype.update=function(){var t=this;this.ctx.fillStyle="rgb(33, 32, 36)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.graph.nodes.forEach((function(e){return t.drawNode(e)})),this.graph.getConnectionsAsLines().forEach((function(n){n.line.type===e.Curve?(t.drawCurve(n.line),t.drawText(n.text,!1)):n.line.type===e.Line&&(t.drawLine(n.line),t.drawText(n.text,!0))}))},t.prototype.drawCurve=function(t){var e=t.x1,n=t.y1,i=t.cp1x,o=t.cp1y,r=t.cp2x,s=t.cp2y,c=t.x2,a=t.y2;this.ctx.moveTo(e,n),this.ctx.bezierCurveTo(i,o,r,s,c,a),this.ctx.stroke()},t.prototype.drawText=function(t,e){var n=t.text,i=t.point,o=i.x,r=i.y;this.ctx.font="20px Arial",this.ctx.fillStyle="rgb(239, 237, 247)",e?this.ctx.fillText(n,o+10,r+10):this.ctx.fillText(n,o,r)},t.prototype.drawNode=function(t){var e=t.circle,n=t.value;this.ctx.font="30px Arial",this.ctx.fillStyle="rgb(239, 237, 245)",this.ctx.strokeStyle="rgb(239, 237, 247)";var i=e.point,o=i.x,r=i.y,s=e.radius;this.ctx.beginPath(),this.ctx.arc(o,r,s,0,2*Math.PI),this.ctx.stroke(),this.ctx.fillText(n,o,r)},t.prototype.drawLine=function(t){var e=t.x1,n=t.y1,i=t.x2,o=t.y2;this.ctx.beginPath(),this.ctx.moveTo(e,n),this.ctx.lineTo(i,o),this.ctx.stroke()},t}();window.onload=function(){var e={radius:50,nodeValue:"<autoincrement>",edgeValue:"",mode:t.ADD},r=document.getElementById("canvas"),s=document.getElementById("controls").offsetHeight;r.height=Math.floor(window.innerHeight-s),r.width=Math.floor(window.innerWidth);var c=r.getContext("2d"),a=document.getElementById("exportButton"),u=new l(!1),h=new f(r,c,u),d=new n(e),p=new o(u),v=new i(u,h,d);a.addEventListener("click",(function(t){return p.handleExport(t)})),r.addEventListener("mousedown",(function(t){return v.handleMouseDown(t)})),r.addEventListener("mouseup",(function(t){return v.handleMouseUp(t)})),document.querySelectorAll("input").forEach((function(t,e,n){t.addEventListener("change",(function(e){d.handleInputValueChange(t)}))}))}})();