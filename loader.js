/* 載入動畫:頁面載入期間顯示深色畫面、旋轉圓環與角色,載入完成後淡出。
   MIN_SHOW:動畫至少顯示幾毫秒,避免載入太快時一閃而過 */
(function(){
  var MIN_SHOW=700;
  /* 角色圖已內嵌在這裡,不用另外放圖片檔;想換圖請把新圖轉成 base64 取代下面這串 */
  var IMG='data:image/png;base64,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';
  var start=Date.now();
  var css=
   '#jr-loader{position:fixed;inset:0;z-index:99999;background-color:#FFF4F7;background-image:radial-gradient(circle at 12% 10%,#FFE6EC 0,transparent 45%),radial-gradient(circle at 90% 90%,#DDF1FB 0,transparent 45%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;transition:opacity .45s ease,visibility .45s ease}'+
   '#jr-loader.done{opacity:0;visibility:hidden}'+
   '#jr-loader img{display:block;width:110px;height:auto;image-rendering:pixelated;animation:jr-bob 1.1s ease-in-out infinite}'+
   '#jr-loader .jr-dots span{opacity:.15;animation:jr-dot 1.2s infinite}'+
   '#jr-loader .jr-dots span:nth-child(2){animation-delay:.2s}'+
   '#jr-loader .jr-dots span:nth-child(3){animation-delay:.4s}'+
   '#jr-loader .jr-text{color:#C2456B;font:700 14px/1 "Zen Maru Gothic",system-ui,sans-serif;letter-spacing:.25em;padding-left:.25em;white-space:nowrap}'+
   '@keyframes jr-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}'+
   '@keyframes jr-dot{0%,60%,100%{opacity:.15}30%{opacity:1}}'+
   '@media(prefers-reduced-motion:reduce){#jr-loader .jr-dots span,#jr-loader img{animation:none;opacity:1}}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var box=document.createElement('div');box.id='jr-loader';box.setAttribute('role','status');box.setAttribute('aria-label','載入中');
  box.innerHTML='<img src="'+IMG+'" alt=""><div class="jr-text">LOADING<span class="jr-dots"><span>.</span><span>.</span><span>.</span></span></div>';
  function add(){document.body.appendChild(box);}
  if(document.body)add();else document.addEventListener('DOMContentLoaded',add);
  function hide(){
    var wait=Math.max(0,MIN_SHOW-(Date.now()-start));
    setTimeout(function(){box.classList.add('done');setTimeout(function(){if(box.parentNode)box.parentNode.removeChild(box);},600);},wait);
  }
  if(document.readyState==='complete')hide();else window.addEventListener('load',hide);
  setTimeout(hide,8000); /* 保險:最久 8 秒一定會關掉 */
})();

/* ===== 背景漂浮的愛心與星星 =====
   放在最底層(不擋點擊、不影響內容);COUNT 是數量,想多一點或少一點改這個數字 */
(function(){
  var COUNT=14;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var HEART='<svg viewBox="0 0 32 30"><path d="M16 28C5 20 2 14 2 9.5 2 5.4 5.2 2 9.3 2c2.8 0 5.2 1.6 6.7 4C17.5 3.6 19.9 2 22.7 2 26.8 2 30 5.4 30 9.5 30 14 27 20 16 28z" fill="FILL" stroke="#5A2E3E" stroke-width="1.8" stroke-linejoin="round"/><ellipse cx="9" cy="9" rx="3" ry="2" transform="rotate(-35 9 9)" fill="#fff" opacity=".7"/></svg>';
  var STAR='<svg viewBox="0 0 32 32"><path d="M16 2.500l3.8 8.3 9 1-6.7 6.1 1.9 8.900L16 22.300l-8 4.5 1.9-8.900L3.2 11.800l9-1z" fill="FILL" stroke="#5A2E3E" stroke-width="1.8" stroke-linejoin="round"/><ellipse cx="12.5" cy="11.5" rx="2.5" ry="1.5" transform="rotate(-30 12.5 11.5)" fill="#fff" opacity=".7"/></svg>';
  var HC=['#FF8FAB','#FFC2D1','#FFA7BC'],SC=['#FFE8A3','#FFD25A','#BFE6F7'];
  var css='#jr-float{position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none}'+
   '#jr-float i{position:absolute;bottom:-60px;display:block;will-change:transform;filter:drop-shadow(2px 3px 0 rgba(90,46,62,.18));animation:jr-rise linear infinite}'+
   '#jr-float i svg{display:block;width:100%;height:100%;animation:jr-spin2 ease-in-out infinite alternate}'+
   '@keyframes jr-rise{0%{transform:translate3d(0,0,0);opacity:0}8%{opacity:var(--o,.9)}50%{transform:translate3d(var(--sway),-60vh,0)}92%{opacity:var(--o,.9)}100%{transform:translate3d(0,-120vh,0);opacity:0}}'+
   '@keyframes jr-spin2{from{transform:rotate(-18deg) scale(.92)}to{transform:rotate(18deg) scale(1.08)}}';
  /* 版面內容約 1040px 寬;螢幕夠寬時,多數愛心星星放在左右兩邊的留白處 */
  var CONTENT=1040;
  /* 分區抽籤:整體平均、但每個位置和起飛時間都帶隨機偏移,看起來自然不規律 */
  function shuffled(n){var a=[],i,j,t;for(i=0;i<n;i++)a.push(i);for(i=n-1;i>0;i--){j=Math.floor(Math.random()*(i+1));t=a[i];a[i]=a[j];a[j]=t;}return a;}
  var slotX=[],slotT=[];
  function pickX(size,k){
    var vw=document.documentElement.clientWidth,gut=(vw-CONTENT)/2;
    var t=(slotX[k]+Math.random())/COUNT;
    if(gut>=50){
      /* 左、右留白各佔 45%,中間佔 10% */
      var w=gut-size-10;
      if(t<.45)return 5+(t/.45)*w;
      if(t<.9)return vw-gut+5+((t-.45)/.45)*w;
      return gut+((t-.9)/.1)*(CONTENT-size);
    }
    return t*(vw-size);
  }
  function init(){
    var vw0=document.documentElement.clientWidth;
    if(vw0-CONTENT>=100)COUNT=Math.min(32,COUNT+Math.round((vw0-CONTENT)/45));
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    var box=document.createElement('div');box.id='jr-float';box.setAttribute('aria-hidden','true');
    slotX=shuffled(COUNT);slotT=shuffled(COUNT);
    for(var k=0;k<COUNT;k++){
      var heart=Math.random()<.5,cols=heart?HC:SC,c=cols[Math.floor(Math.random()*cols.length)];
      var size=16+Math.random()*22,el=document.createElement('i');
      var px=pickX(size,k),dur=17+Math.random()*16;
      el.style.cssText='--o:.9;left:'+px+'px;width:'+size+'px;height:'+size+'px;'+
        '--sway:'+((Math.random()<.5?-1:1)*(10+Math.random()*40))+'px;'+
        'animation-duration:'+dur+'s;animation-delay:-'+(((slotT[k]+Math.random())/COUNT)*dur)+'s';
      el.innerHTML=(heart?HEART:STAR).replace('FILL',c);
      el.firstChild.style.animationDuration=(2.5+Math.random()*2.5)+'s';
      box.appendChild(el);
    }
    document.body.insertBefore(box,document.body.firstChild);
  }
  if(document.body)init();else document.addEventListener('DOMContentLoaded',init);
})();

/* ===== 彩蛋:每一頁左下角探頭的小人,點一下跳出圖片 =====
   圖片:images/egg-peek.png(探頭)、images/egg-pop.jpg(跳出);點跳出的圖會前往委託價目表 */
(function(){
  var css=
   '#egg-peek{position:fixed;left:0;bottom:22px;z-index:30;width:104px;padding:0;border:0;background:none;cursor:pointer;transform:translateX(-34%);transition:transform .35s cubic-bezier(.3,1.5,.5,1);animation:egg-in .9s .8s both cubic-bezier(.3,1.5,.5,1)}'+
   '#egg-peek img{display:block;width:100%;height:auto;filter:drop-shadow(2px 3px 0 rgba(90,46,62,.2))}'+
   '#egg-peek:hover,#egg-peek:focus-visible{transform:translateX(-4%)}'+
   '@keyframes egg-in{from{transform:translateX(-110%)}to{transform:translateX(-34%)}}'+
   '#egg-pop{position:fixed;inset:0;z-index:99990;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(90,46,62,.55);opacity:0;visibility:hidden;transition:opacity .25s,visibility .25s}'+
   '#egg-pop.on{opacity:1;visibility:visible}'+
   '#egg-pop .egg-box{position:relative;max-width:min(680px,100%);transform:scale(.6) rotate(-4deg);transition:transform .45s cubic-bezier(.3,1.6,.5,1)}'+
   '#egg-pop.on .egg-box{transform:scale(1) rotate(0)}'+
   '#egg-pop .egg-box img{display:block;width:100%;max-height:82vh;object-fit:contain;background:#fff;border:1.5px solid #5A2E3E;border-radius:22px;box-shadow:0 10px 30px rgba(255,143,171,.35)}'+
   '#egg-pop .egg-x{position:absolute;top:-14px;right:-14px;width:36px;height:36px;border-radius:50%;border:1.5px solid #5A2E3E;background:#FF8FAB;color:#fff;font:700 18px/1 system-ui,sans-serif;cursor:pointer;box-shadow:0 3px 0 #5A2E3E;padding:0}'+
   '@media(max-width:600px){#egg-peek{width:78px;bottom:14px}}';
  function init(){
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    var wrap=document.createElement('div');
    wrap.innerHTML='<button type="button" id="egg-peek" aria-label="小彩蛋"><img src="images/egg-peek.png" alt=""></button>'+
      '<div id="egg-pop" role="dialog" aria-label="彩蛋"><div class="egg-box"><a href="price.html"><img src="images/egg-pop.jpg" alt="老闆，看看我。我快要吃不起飯了，看一眼我的委託價目表"></a><button type="button" class="egg-x" aria-label="關閉">✕</button></div></div>';
    while(wrap.firstChild)document.body.appendChild(wrap.firstChild);
    var pop=document.getElementById('egg-pop');
    function close(){pop.classList.remove('on');}
    document.getElementById('egg-peek').addEventListener('click',function(){pop.classList.add('on');});
    pop.querySelector('.egg-x').addEventListener('click',close);
    pop.addEventListener('click',function(e){if(e.target===pop)close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  }
  if(document.body)init();else document.addEventListener('DOMContentLoaded',init);
})();
