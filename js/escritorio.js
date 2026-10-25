"use strict";
(function(){
  var track=document.querySelector('.car-track'); if(!track) return;
  var cards=[].slice.call(track.querySelectorAll('.card'));
  function reset(){
    track.classList.remove('has-open');
    cards.forEach(function(c){ c.classList.remove('open','mini'); c.style.gridColumn=''; c.style.gridRow='';
      var b=c.querySelector('.more'), i=c.querySelector('.more-info');
      b.setAttribute('aria-expanded','false'); b.textContent='Ver más'; i.hidden=true; });
  }
  function open(card){
    reset();
    track.classList.add('has-open');
    var n=0;
    cards.forEach(function(c){
      var b=c.querySelector('.more'), i=c.querySelector('.more-info');
      if(c===card){ c.classList.add('open'); c.style.gridColumn='1 / span 3'; c.style.gridRow='1 / span 3'; b.setAttribute('aria-expanded','true'); b.textContent='Ver menos'; i.hidden=false; }
      else { n++; c.classList.add('mini'); c.style.gridColumn='4'; c.style.gridRow=String(n); }
    });
  }
  cards.forEach(function(c){
    c.querySelector('.more').addEventListener('click',function(){
      if(c.classList.contains('open')){ reset(); } else { open(c); }
    });
  });
})();

// Fachada de Instagram: el script de Meta se carga recién al hacer clic
document.querySelectorAll(".ig-load").forEach(function(b){
  b.addEventListener("click",function(){
    b.remove();
    if(document.querySelector('script[src="https://www.instagram.com/embed.js"]')) return;
    var s=document.createElement("script");
    s.src="https://www.instagram.com/embed.js"; s.async=true;
    document.body.appendChild(s);
  });
});
