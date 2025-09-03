;(() => {
  // ===== Canvas background =====
  const canvas = document.getElementById("bg")
  const ctx = canvas.getContext("2d")
  let w, h, t = 0
  function resize(){ w = canvas.width = innerWidth; h = canvas.height = innerHeight }
  addEventListener("resize", resize, { passive:true }); resize()

  function draw(){
    t += 0.004
    ctx.clearRect(0,0,w,h)
    ctx.fillStyle = "#0a0a0b"
    ctx.fillRect(0,0,w,h)
    ctx.strokeStyle = "rgba(225,29,72,0.15)"
    ctx.lineWidth = 1
    const gap = 40
    const offset = Math.sin(t)*10
    ctx.beginPath()
    for(let x=((offset%gap)+gap)%gap; x<w; x+=gap){ ctx.moveTo(x,0); ctx.lineTo(x,h) }
    for(let y=((offset%gap)+gap)%gap; y<h; y+=gap){ ctx.moveTo(0,y); ctx.lineTo(w,y) }
    ctx.stroke()
    for(let i=0;i<60;i++){
      const px=(i*137.5 + t*800)%w
      const py=(i*73.3  + t*420)%h
      const r=1.2+(i%3)
      ctx.fillStyle="rgba(225,29,72,0.35)"
      ctx.beginPath(); ctx.arc(px,py,r,0,Math.PI*2); ctx.fill()
    }
    requestAnimationFrame(draw)
  }
  draw()

  // ===== Reveal on scroll =====
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("show") })
  }, { threshold:0.1 })
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el))

  // ===== Mobile nav =====
  const toggle = document.querySelector(".nav-toggle")
  const items  = document.querySelector(".nav-items")
  if(toggle && items){ toggle.addEventListener("click", ()=>{
    const open = items.classList.toggle("open")
    toggle.setAttribute("aria-expanded", String(open))
  })}

  // ===== Footer year =====
  const year = document.getElementById("year")
  if(year) year.textContent = new Date().getFullYear()

  // No marquee text mutation. Keeps your original copy and formatting. :contentReference[oaicite:1]{index=1}
})()