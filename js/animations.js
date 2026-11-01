/* SVG animation control. animateMotion/mpath live in architecture.js. */
const mm=q=>window.matchMedia?matchMedia(q).matches:false;
const Anim={
 init(svg){this.svg=svg;this.rm=mm('(prefers-reduced-motion: reduce)');if(this.rm){svg.classList.add('rm');svg.pauseAnimations&&svg.pauseAnimations()}},
 set(idx){const svg=this.svg;if(!svg)return;svg.querySelectorAll('.dots').forEach((g,i)=>g.classList.toggle('on',idx===i+2||idx>4));if(!this.rm&&svg.setCurrentTime)svg.setCurrentTime(0)}
};
