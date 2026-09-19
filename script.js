const screens=[...document.querySelectorAll(".screen")];
const show=id=>{screens.forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active");window.scrollTo(0,0);};
const toast=(t)=>{const x=document.getElementById("toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1800)};

// Birthday song
const birthdayMusic=document.getElementById("birthdayMusic");
const musicToggle=document.getElementById("musicToggle");
function startBirthdayMusic(){
  birthdayMusic.volume=0.55;
  birthdayMusic.play().then(()=>{musicToggle.textContent="🎵";musicToggle.setAttribute("aria-label","Pause music");}).catch(()=>{});
}
musicToggle.onclick=()=>{
  if(birthdayMusic.paused){startBirthdayMusic();}else{birthdayMusic.pause();musicToggle.textContent="🔇";musicToggle.setAttribute("aria-label","Play music");}
};

// floating hearts
setInterval(()=>{const h=document.createElement("span");h.textContent=["♡","♥","✦"][Math.floor(Math.random()*3)];h.style.left=Math.random()*100+"vw";h.style.bottom="-25px";h.style.fontSize=(12+Math.random()*18)+"px";h.style.animationDuration=(5+Math.random()*4)+"s";document.getElementById("hearts").appendChild(h);setTimeout(()=>h.remove(),9000)},700);

// keypad / passcode: 2026
const keypad=document.getElementById("keypad");
["1","2","3","4","5","6","7","8","9","*","0","#"].forEach(k=>{
  const b=document.createElement("button");b.className="key";b.textContent=k;b.type="button";
  b.onclick=()=>{if(k>="0"&&k<="9")enterDigit(k);};keypad.appendChild(b);
});
let code="";
function enterDigit(n){if(code.length>=4)return;code+=n;[...document.querySelectorAll("#dots i")].forEach((d,i)=>d.classList.toggle("filled",i<code.length));}
document.getElementById("unlock").onclick=()=>{if(code==="2026"){startBirthdayMusic();show("introScreen")}else{toast("Try the birthday year: 2026 ✨");code="";[...document.querySelectorAll("#dots i")].forEach(d=>d.classList.remove("filled"));}};
document.getElementById("yesBtn").onclick=()=>show("giftScreen");
document.getElementById("noBtn").addEventListener("mouseenter",moveNo);
document.getElementById("noBtn").addEventListener("touchstart",moveNo,{passive:true});
function moveNo(e){e.preventDefault();const b=e.currentTarget;const x=(Math.random()*100)-50;const y=(Math.random()*70)-35;b.style.transform=`translate(${x}px,${y}px)`;toast("Nope 😭 choose YES ♡");}
document.getElementById("openGift").onclick=()=>{
  const btn=document.getElementById("openGift");
  btn.disabled=true;
  btn.textContent="OPENING... 🎁";
  setTimeout(()=>show("birthdayScreen"),850);
};
document.getElementById("showCake").onclick=()=>show("cakeScreen");
function cakeDone(){document.querySelector(".flame").style.animation="none";document.querySelector(".flame").style.opacity="0";toast("May your wish come true 🤲");setTimeout(()=>show("wishScreen"),900)}
document.getElementById("cake").onclick=cakeDone;
document.getElementById("cake").onkeydown=e=>{if(e.key==="Enter"||e.key===" ")cakeDone()};
document.getElementById("finalBtn").onclick=()=>show("finalScreen");
document.getElementById("replay").onclick=()=>{birthdayMusic.pause();birthdayMusic.currentTime=0;musicToggle.textContent="🎵";musicToggle.setAttribute("aria-label","Play music");code="";document.querySelectorAll("#dots i").forEach(d=>d.classList.remove("filled"));const btn=document.getElementById("openGift");btn.disabled=false;btn.textContent="OPEN MY GIFT 🎁";show("lockScreen")};
