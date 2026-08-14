    // Bootstrap del scroll-reveal. Se inyecta INLINE como primer hijo del <body>, así
    // corre mientras el HTML todavía se está parseando — mucho antes de que React
    // hidrate (~200KB de JS). El bug que esto arregla: `.reveal` arranca en opacity:0
    // y si el reveal depende de la hidratación, en un celular lento el usuario scrollea
    // y ve TODO negro hasta que React termina.
    //
    // El contenido NO se puede quedar invisible. Cuatro defensas, en orden:
    //  1. El estado oculto lo aplica el CSS solo bajo `html.reveal-js`, y esa clase se
    //     agrega AL FINAL, recién cuando todo el andamiaje quedó armado y funcionando.
    //     Todo va dentro de un try/catch que la saca si algo falló. Sin JS, con JS roto
    //     o con un browser sin IntersectionObserver, no se oculta nada.
    //  2. El reveal no depende de React: observa el DOM desde el parseo.
    //  3. Backstop por intervalo (500ms × 10s): aunque se pierda un rAF, una mutación o
    //     un callback del observer — cosa que pasa en móviles cargados — el contenido
    //     aparece a más tardar medio segundo después.
    //  4. Ante un error de JS no capturado, se muestra todo.
    //
    // ⚠️ Si tocás esto, mantené el orden: ocultar es lo ÚLTIMO que se hace.

    const BOOTSTRAP = `(function(){
    var d=document,root=d.documentElement,w=window;
    function mostrarTodo(){root.className=root.className.replace(/(^|\\s)reveal-js(?=\\s|$)/g,' ');}
    try{
    if(!('IntersectionObserver' in w)||!('MutationObserver' in w))return;
    if(w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
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
    function fallar(){try{io.disconnect();mo.disconnect();}catch(e){}mostrarTodo();}
    w.addEventListener('error',fallar);
    var mo=new MutationObserver(schedule);
    mo.observe(root,{childList:true,subtree:true});
    w.addEventListener('scroll',schedule,{passive:true});
    w.addEventListener('resize',schedule);
    d.addEventListener('DOMContentLoaded',scan);
    w.addEventListener('load',function(){scan();w.setTimeout(scan,300);});
    var n=0,iv=w.setInterval(function(){scan();if(++n>20)w.clearInterval(iv);},500);
    w.__dmgReveal=schedule;
    root.className+=' reveal-js';
    scan();
    }catch(e){mostrarTodo();}
    })();`;

    export default function RevealBootstrap() {
    return <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP }} />;
    }
