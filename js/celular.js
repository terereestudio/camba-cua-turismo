"use strict";
// Constructor de nodos seguro (sin innerHTML)
function h(tag,attrs,...kids){const e=document.createElement(tag);for(const k in attrs)e.setAttribute(k,attrs[k]);for(const c of kids)e.append(c);return e;}
function waIcon(){const NS="http://www.w3.org/2000/svg";const s=document.createElementNS(NS,"svg");s.setAttribute("viewBox","0 0 24 24");s.setAttribute("aria-hidden","true");const u=document.createElementNS(NS,"use");u.setAttribute("href","#wa");s.append(u);return s;}
const WA="5493782534556";
const D=[
  {n:"Café & Sabores: Colombia + Perú",k:"Internacional",d:"Medellín, Eje Cafetero y Lima. Salida grupal acompañada, del 9 al 18 de marzo de 2027.",img:"img/destino-cafe.webp",w:736,h:493},
  {n:"Caribe en temporada baja: más opciones para viajar",k:"Internacional",d:"Cancún, Playa del Carmen, Punta Cana, Aruba, Curazao y más. En temporada baja puede haber mejores tarifas, según destino y fechas.",img:"img/destino-caribe.webp",w:800,h:534},
  {n:"Cataratas del Iguazú",k:"Nacional",d:"Una maravilla natural, cerquita de casa.",img:"img/destino-iguazu.webp",w:678,h:452},
  {n:"Salta",k:"Nacional",d:"Cerros de colores, peñas y pueblos coloniales.",img:"img/destino-salta.webp",w:800,h:533}
];
const link=t=>"https://wa.me/"+WA+"?text="+encodeURIComponent(t);
const msg=d=>`Hola Camba Cua, quiero consultar por el viaje a ${d}. ¿Me pasan fechas y precios?`;
const FULL={
 "Café & Sabores: Colombia + Perú":["Salida grupal acompañada, del 9 al 18 de marzo de 2027, con acompañamiento durante todo el viaje.","Medellín y Comuna 13: transformación cultural y artística de la ciudad.","Eje Cafetero: tradición cafetera y los pueblos de Salento y Filandia.","Guatapé y Piedra del Peñol: paisajes y vistas panorámicas.","Lima: Miraflores, un mercado local y una clase de cocina peruana.","Vuelos desde Asunción. Desde USD 2.290, con seña desde USD 200."],
 "Caribe en temporada baja: más opciones para viajar":["¿Te imaginás disfrutando de las playas del Caribe con posiblemente menos gente? En temporada baja puede haber mejores tarifas y una experiencia más relajada, según el destino y las fechas. Es una oportunidad para descubrir destinos paradisíacos.","Podés elegir entre Cancún, Playa del Carmen, Punta Cana, Aruba, Curazao y muchos destinos más.","Contanos qué tipo de viaje estás buscando y te ayudamos a encontrar alternativas según tus preferencias y presupuesto.","Las ventajas de la temporada baja dependen del destino y de las fechas: no garantizamos menos turistas, mejores servicios ni tarifas más económicas. Consultanos por la opción que mejor se adapte a vos."]
};
const DEF_FULL=["Consultanos por fechas, cupos y precios actualizados."];
const MSG_FOR=n=>`Hola Camba Cua, quiero consultar por el viaje a ${n}. ¿Me pasan fechas y precios?`;
{const list=document.getElementById("list");
D.forEach((x,i)=>{
 const art=h("article",{class:"dest"});
 art.append(x.img?h("img",{src:x.img,alt:x.n,width:String(x.w),height:String(x.h),loading:"lazy",decoding:"async"}):h("div",{class:"ph"},x.n));
 const body=h("div",{class:"body"});
 body.append(h("span",{class:"kind "+(x.k==="Internacional"?"int":"")},x.k),h("h3",{},x.n),h("p",{},x.d));
 const row=h("div",{class:"dest-row"});
 row.append(h("button",{class:"more",type:"button","data-i":String(i),"aria-haspopup":"dialog"},"Ver más"));
 row.append(h("a",{class:"dest-wa",href:link(msg(x.n)),target:"_blank",rel:"noopener noreferrer","aria-label":"Consultar este viaje por WhatsApp"},waIcon()));
 body.append(row);art.append(body);list.append(art);
});}
let sheet=null;document.addEventListener("DOMContentLoaded",()=>{sheet=document.getElementById("sheet");
document.getElementById("list").addEventListener("click",e=>{
  const btn=e.target.closest(".more"); if(!btn) return;
  const x=D[+btn.dataset.i]; const full=FULL[x.n]||DEF_FULL;
  const img=document.getElementById("sheet-img");
  if(x.img){ img.src=x.img; img.alt=x.n; img.width=x.w; img.height=x.h; img.hidden=false; } else { img.removeAttribute("src"); img.hidden=true; }
  document.getElementById("sheet-k").textContent=x.k;
  document.getElementById("sheet-n").textContent=x.n;
  {const sd=document.getElementById("sheet-d");sd.replaceChildren();
  if(full.length>1){const ul=h("ul",{});full.slice(1,-1).forEach(t=>ul.append(h("li",{},t)));sd.append(h("p",{},full[0]),ul,h("p",{},full[full.length-1]));}
  else sd.append(h("p",{},full[0]));}
  document.getElementById("sheet-wa").href=link(MSG_FOR(x.n));
  sheet.showModal();
});
document.getElementById("sheet-x").addEventListener("click",()=>sheet.close());
sheet.addEventListener("click",e=>{ if(e.target===sheet) sheet.close(); });});
const T={general:"Hola Camba Cua, quiero hacer una consulta sobre un viaje.",
 grupo:"Hola Camba Cua, quiero consultar por un viaje en grupo. Somos ___ personas.",
 otro:"Hola Camba Cua, busco otro destino o un paquete a medida. ¿Me pueden ayudar?",
 ofertas:"Hola Camba Cua, quiero ver los destinos y ofertas vigentes.",
 caribe:"Hola Camba Cua, quiero consultar por el crucero por el Caribe y Panamá (salida 16/04/2027)."};
document.querySelectorAll("[data-wa]").forEach(a=>{a.href=link(T[a.dataset.wa]);a.target="_blank";a.rel="noopener noreferrer"});
document.addEventListener("DOMContentLoaded",()=>{
  const b=document.getElementById("reel-more"); if(!b) return;
  b.addEventListener("click",()=>{
    const sh=document.getElementById("sheet");
    const img=document.getElementById("sheet-img");
    img.removeAttribute("src"); img.alt=""; img.hidden=true;
    document.getElementById("sheet-k").textContent="Novedades";
    document.getElementById("sheet-n").textContent="Crucero por el Caribe y Panamá";
    document.getElementById("sheet-d").replaceChildren(document.getElementById("reel-full").content.cloneNode(true));
    document.getElementById("sheet-wa").href=link(T.caribe);
    sh.showModal();
  });
});

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

// Fondos fuera de la primera pantalla: se cargan al acercarse
document.querySelectorAll("[data-bg]").forEach(function(el){
  var set=function(){el.style.backgroundImage='url("'+el.dataset.bg+'")';};
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es,o){es.forEach(function(e){if(e.isIntersecting){set();o.unobserve(e.target);}});},{rootMargin:"200px"});
    io.observe(el);
  } else set();
});
