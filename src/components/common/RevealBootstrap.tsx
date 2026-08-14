    // Bootstrap del scroll-reveal. Se inyecta INLINE como primer hijo del <body>, así
    // corre mientras el HTML todavía se está parseando — mucho antes de que React
    // hidrate (~200KB de JS). El bug que esto arregla: `.reveal` arranca en opacity:0
    // y hasta ahora solo el hook `useReveal` (post-hidratación) lo revelaba, así que
    // en un celular/red lenta el usuario scrolleaba y veía TODO negro hasta que la
    // hidratación terminaba.
    //
    // Tres garantías:
    //  1. El estado oculto lo aplica el CSS SOLO bajo `html.reveal-js`, clase que
    //     agrega este script. Sin JS (o si este script falla) no se oculta nada.
    //  2. El reveal no depende de React: observa el DOM desde el parseo.
    //  3. Red de seguridad: ante un error de JS no capturado, se muestra todo.

    const BOOTSTRAP = `(function(){
    var d=document,root=d.documentElement,w=window;
    if(!('IntersectionObserver' in w)||!('MutationObserver' in w))return;
    try{if(w.matchMedia('(prefers-reduced-motion: reduce)').matches)return;}catch(e){}
    root.className+=' reveal-js';
    var io=new IntersectionObserver(function(es){
    for(var i=0;i<es.length;i++){if(es[i].isIntersecting){es[i].target.classList.add('is-visible');io.unobserve(es[i].target);}}
    },{threshold:0,rootMargin:'0px 0px -10% 0px'});
    function scan(){
    var els=d.querySelectorAll('.reveal:not(.is-visible)');
    for(var i=0;i<els.length;i++){var el=els[i];
    if(el.getBoundingClientRect().top<w.innerHeight){el.classList.add('is-visible');}else{io.observe(el);}}
    }
    var q=false;
    function schedule(){if(q)return;q=true;w.requestAnimationFrame(function(){q=false;scan();});}
    function revealAll(){root.className=root.className.replace(/(^|\\s)reveal-js(?=\\s|$)/g,' ');try{io.disconnect();mo.disconnect();}catch(e){}}
    w.addEventListener('error',revealAll);
    var mo=new MutationObserver(schedule);
    mo.observe(root,{childList:true,subtree:true});
    w.addEventListener('scroll',schedule,{passive:true});
    w.addEventListener('resize',schedule);
    d.addEventListener('DOMContentLoaded',scan);
    w.addEventListener('load',function(){scan();w.setTimeout(scan,300);});
    w.__dmgReveal=schedule;
    scan();
    })();`;

    export default function RevealBootstrap() {
    return <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP }} />;
    }
