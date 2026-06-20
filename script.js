/* ==========================================================================
   AKSHAY CP — shared site script
   ========================================================================== */

/* ---------- LOADER ---------- */
(function loader(){
  const bar = document.querySelector(".loader-bar");
  const pct = document.querySelector(".loader-pct");
  const el = document.querySelector(".loader");
  if(!el) return;

  let p = 0;
  const tick = () => {
    p += Math.random() * 18;
    if(p > 100) p = 100;
    if(bar) bar.style.width = p + "%";
    if(pct) pct.textContent = Math.floor(p);
    if(p < 100){
      setTimeout(tick, 90);
    } else {
      setTimeout(() => {
        el.style.transition = "opacity .6s ease, visibility .6s ease";
        el.style.opacity = "0";
        setTimeout(() => el.style.display = "none", 600);
      }, 200);
    }
  };
  tick();
})();

/* ---------- CURSOR ---------- */
const glow = document.querySelector(".cursor-glow");
const curDot = document.querySelector(".cur-dot");
const curRing = document.querySelector(".cur-ring");

document.addEventListener("mousemove", (e) => {
  if(glow){ glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; }
  if(curDot){ curDot.style.left = e.clientX + "px"; curDot.style.top = e.clientY + "px"; }
  if(curRing){ curRing.style.left = e.clientX + "px"; curRing.style.top = e.clientY + "px"; }
});

if(curRing){
  document.querySelectorAll("a, button, .filter-btn, .project, .project-card, .service-card").forEach(t=>{
    t.addEventListener("mouseenter", () => curRing.classList.add("hovering"));
    t.addEventListener("mouseleave", () => curRing.classList.remove("hovering"));
  });
}

/* ---------- COUNTER ---------- */
const counters = document.querySelectorAll(".counter");
counters.forEach(counter=>{
  const update = () => {
    const target = +counter.dataset.target;
    const current = +counter.innerText.replace(/\D/g,"") || 0;
    const increment = Math.max(target / 50, 1);
    if(current < target){
      counter.innerText = Math.ceil(current + increment);
      setTimeout(update, 30);
    } else {
      counter.innerText = target + "+";
    }
  };
  update();
});

/* ---------- LENIS SMOOTH SCROLL ---------- */
if(window.Lenis){
  const lenis = new Lenis({ smoothWheel:true });
  function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
}

/* ---------- GSAP REVEALS ---------- */
if(window.gsap){
  gsap.registerPlugin(ScrollTrigger);

  if(document.querySelector(".hero-left")){
    gsap.from(".hero-left", { y:60, opacity:0, duration:1, ease:"power3.out", delay:.2 });
  }
  if(document.querySelector(".hero-right")){
    gsap.from(".hero-right", { y:40, opacity:0, duration:1, ease:"power3.out", delay:.4 });
  }
  if(document.querySelector(".page-head")){
    gsap.from(".page-head > *", { y:40, opacity:0, duration:.9, stagger:.1, ease:"power3.out", delay:.1 });
  }

  gsap.utils.toArray(".reveal").forEach((el, i) => {
    gsap.set(el, { y:60, opacity:0 });
    gsap.to(el, {
      scrollTrigger:{ trigger:el, start:"top 85%" },
      y:0, opacity:1, duration:.9, ease:"power3.out", delay:(i%3)*0.06
    });
  });
}

/* ---------- TIMECODE TICKER (session "recording" clock) ---------- */
(function timecode(){
  const tcs = document.querySelectorAll(".tc-readout");
  if(!tcs.length) return;
  const start = Date.now();
  setInterval(() => {
    const diff = Math.floor((Date.now() - start) / 1000);
    const h = String(Math.floor(diff/3600)).padStart(2,"0");
    const m = String(Math.floor((diff%3600)/60)).padStart(2,"0");
    const s = String(diff%60).padStart(2,"0");
    tcs.forEach(tc => tc.textContent = `${h}:${m}:${s}`);
  }, 1000);
})();

/* ---------- NAV: hamburger + active link ---------- */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
if(hamburger){
  hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("active")));
}

(function activeLink(){
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a=>{
    const href = a.getAttribute("href").split("/").pop();
    if(href === path) a.classList.add("active");
  });
})();

/* ---------- MAGNETIC BUTTONS ---------- */
document.querySelectorAll(".primary-btn").forEach(btn=>{
  btn.addEventListener("mousemove",(e)=>{
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.transform = `translate(${(x-rect.width/2)/9}px, ${(y-rect.height/2)/9}px)`;
  });
  btn.addEventListener("mouseleave", () => btn.style.transform = "translate(0,0)");
});

/* ---------- PROJECT FILTER (projects.html) ---------- */
const filterBtns = document.querySelectorAll(".filter-btn");
const galleryCards = document.querySelectorAll(".project-card");
if(filterBtns.length && galleryCards.length){
  filterBtns.forEach(btn=>{
    btn.addEventListener("click", () => {
      filterBtns.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      galleryCards.forEach(card=>{
        const show = f === "all" || card.dataset.category === f;
        card.classList.toggle("hide", !show);
      });
    });
  });
}

/* ---------- CONTACT FORM (contact.html) — no backend, opens mail client ---------- */
const contactForm = document.querySelector(".contact-form");
if(contactForm){
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = contactForm.querySelector("#name")?.value || "";
    const email = contactForm.querySelector("#email")?.value || "";
    const project = contactForm.querySelector("#project")?.value || "";
    const message = contactForm.querySelector("#message")?.value || "";
    const subject = encodeURIComponent(`Project inquiry — ${project || "New project"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:akshaycp6798@gmail.com?subject=${subject}&body=${body}`;
  });
}
