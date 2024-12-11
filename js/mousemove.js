var holding = false;
document.addEventListener('mousedown', function(e) {
    console.log(this.id);
    holding = true;
    
});

document.addEventListener('mouseup', function(e) {
    holding = false;
});

document.querySelector(".motion-path").addEventListener('mousemove', function (event) {
    if (holding)
    {
        console.log(`${event.clientX} ${event.clientY}`);
    }
});

function createPathFollower(svg, path, el) {
    const tl = path.getTotalLength();
    
    return function(pct) {
      const rect = svg.getBoundingClientRect();
      const l = pct / 100 * tl;
   
      const p0 = path.getPointAtLength(l - 1 >= 1 ? l - 1 : 0);
      const p1 = path.getPointAtLength(l + 1);
      const angle = Math.atan2(p1.y - p0.y, p1.x - p0.x);
   
      let p = path.getPointAtLength(l);
      p = p.matrixTransform(svg.getScreenCTM());
      p.x = p.x - rect.left;
      p.y = p.y - rect.top;
  
      el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${radToDegree(angle) + 90}deg)`;
    }
}

function radToDegree(rad) {
  return rad * 180 / Math.PI;
}

const follower = createPathFollower(
  document.querySelector('svg'),
  document.querySelector('svg path'),
  document.querySelector('.square')
);

follower(0);

console.log(document.querySelector(".square").classList);