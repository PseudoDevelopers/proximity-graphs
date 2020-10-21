function _drawArrow(t,e,i,n,o,r){t.strokeStyle=r,t.fillStyle=r,t.lineWidth=2,t.translate(e,i),t.rotate(o),t.beginPath(),t.moveTo(0,0),t.lineTo(n,0),t.stroke(),t.lineTo(n-6,6),t.lineTo(n-6,-6),t.lineTo(n,0),t.fill(),t.rotate(-o),t.translate(-e,-i)}class Vector{constructor(t=0,e=0){this.set(t,e)}clone(){return new Vector(this.x,this.y)}copy(t){return this.set(t.x,t.y)}set(t,e){return this.x=t,this.y=e,this}add(t){return this.x+=t.x,this.y+=t.y,this}plus(t){return this.clone().add(t)}subtract(t){return this.x-=t.x,this.y-=t.y,this}minus(t){return this.clone().subtract(t)}multiply(t){return this.x*=t,this.y*=t,this}times(t){return this.clone().multiply(t)}divide(t){return this.x/=t,this.y/=t,this}dividedBy(t){return this.clone().divide(t)}normSq(){return this.x*this.x+this.y*this.y}norm(){return Math.sqrt(this.normSq())}setNorm(t){let e=this.norm();return 0===e&&(e=1,this.x=1,this.y=0),t/=e,this.x*=t,this.y*=t,this}normalize(){return this.setNorm(1)}angle(){return Math.atan2(this.y,this.x)}setAngle(t){let e=this.norm();return 0===e&&(e=1,this.x=1,this.y=0),this.x=e*Math.cos(t),this.y=e*Math.sin(t),this}rotateBy(t){return this.setAngle(this.angle()+t)}dot(t){return this.x*t.x+this.y*t.y}proj(t){let e=t.clone().normalize();return e.multiply(this.dot(e))}projScalar(t){return this.dot(t)/t.norm()}clampedProj(t){let e=t.norm(),i=t.clone().normalize();return i.multiply(Math.min(e,Math.max(0,this.dot(i))))}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}reflect(t){let e=t.normSq();return this.subtract(t.times(2*this.dot(t)/e))}reflection(t){return this.copy().reflect(t)}randomize(t=1){return this.setNorm(t).setAngle(2*Math.PI*Math.random())}debugDraw(t,e=null,i=1,n=!1,o="white"){let r=this.angle(),s=i*this.norm(),a=e?e.x:0,h=e?e.y:0;if(n){t.strokeStyle="tomato",t.translate(a,h),t.beginPath();let e=i*this.y;t.moveTo(0,e),t.lineTo(i*this.x,e),t.stroke(),t.strokeStyle="gold",t.beginPath(),t.moveTo(0,0),t.lineTo(0,e),t.stroke(),t.translate(-a,-h)}_drawArrow(t,a,h,s,r,o)}}function V(t,e){return new Vector(t,e)}function lerp(t,e,i){return t+(e-t)*i}function rescale(t,e,i){return(i-t)/(e-t)}const G=6.67408e-11;function acceleration(t,e){let i=e.norm();const n=e.normalize();return n.multiply(G*t/(i*i)),n}function createNode({mass:t=10,position:e=V(0,0),velocity:i=V(0,0)}){return{mass:t,radius:20,position:e,velocity:i,color:"crimson",move(t){this.position.add(this.velocity.times(t))},draw(){drawCircle(this.position.x,this.position.y,this.radius,this.color)},chkEdgeBounce(){this.position.x>=width-this.radius?this.velocity.x*=-1:this.position.x<=this.radius&&(this.velocity.x*=-1),this.position.y>=height-this.radius?this.velocity.y*=-1:this.position.y<=this.radius&&(this.velocity.y*=-1)}}}function drawLine(t,e,i){ctx.strokeStyle=i,ctx.beginPath(),ctx.moveTo(t.x,t.y),ctx.lineTo(e.x,e.y),ctx.stroke()}function drawCircle(t,e,i,n){ctx.fillStyle=n,ctx.lineWidth=.5,ctx.beginPath(),ctx.arc(t,e,i,0,2*Math.PI),ctx.fill()}function clearCanvas(){ctx.clearRect(0,0,width,height)}const MAX_DISTANCE_FOR_CONNECTION=200,MIN_DISTANCE_FOR_MAX_ALPHA=50,CANVAS_MIDDLE=V(width/2,height/2),ctx=canvas.getContext("2d"),nodes=[];let requestAnimationFrameID,prevTime=0;const SINGLE_FRAME_TIME=5;let dt;function animate(){let t=performance.now();dt=t-prevTime,prevTime=t,dt=SINGLE_FRAME_TIME,frame(),paused||(requestAnimationFrameID=requestAnimationFrame(animate))}function frame(){nodes.forEach(t=>{t.chkEdgeBounce(),t.move(dt)}),draw()}function draw(){clearCanvas(),lines&&drawConnections();for(let t of nodes)t.draw()}function drawConnections(){nodes.forEach(t=>{nodes.forEach(e=>{t!==e&&drawConnection(t,e)})})}function drawConnection(t,e){let i=e.position.minus(t.position),n=i.norm();const o=`hsla(180, 90%, 60%, ${rescale(MAX_DISTANCE_FOR_CONNECTION,MIN_DISTANCE_FOR_MAX_ALPHA,n)})`;drawLine(e.position,t.position,o),t.velocity.add(acceleration(e.mass,i))}function createNodes(){nodes.push(createNode({mass:1e13,position:V(800,700),velocity:V(0,-.2)})),nodes.push(createNode({mass:1e13,position:V(1050,400),velocity:V(0,.2)}))}function startAnimation(){prevTime=performance.now(),requestAnimationFrameID=requestAnimationFrame(animate)}function stopAnimation(){cancelAnimationFrame(requestAnimationFrameID)}function playNextFrame(){prevTime=performance.now()-SINGLE_FRAME_TIME,animate()}function playPrevFrame(){}createNodes(),startAnimation();