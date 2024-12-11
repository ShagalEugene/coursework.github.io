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

let begin = Math.random() * 100;

var start, end;
// let a = JSON.parse(localStorage[localStorage[currentAccount]]);
document.querySelector(".start").addEventListener("click", () => {
  document.querySelector(".start").disabled = true;
  var i = begin, id = setInterval(frame, 1);
  var iteration = 0, end_it = Math.floor(Math.random() * 1000 + 500);
  start = performance.now();

  function frame() {
    i = (i + 0.05) % 100; 
    follower(i);   
    iteration++;  

    if (iteration == end_it) 
    {
      clearInterval(id);   
      end = performance.now();
      window.dialog.showModal();
      document.querySelector(".start").disabled = false;
      begin = i;
    }
  }
})

document.querySelector(".setAnswer").addEventListener("submit", (e) => {
  // e.preventDefault();
  const answerPlace = document.querySelector(".setAnswer");
  answerPlace.classList.toggle("display");
  const inputTime = e.target.querySelector(".input_time");
  timeComparison(inputTime.value * 1000);
  inputTime.value = "";
})

function timeComparison(userTime) {
  if (Math.abs(userTime - (end - start)) < 1000) {
    console.log("попал с погрешностью 1 секунда, начисленно 100 очков");
    // changeUserMenu.score += 100;
    // console.log(`текущий счёт: ${changeUserMenu.score}`);
    // localStorage[localStorage[currentAccount]] = JSON.stringify(changeUserMenu);
  } else console.log("не угадали");
} 

function setScore() {
  // document.querySelector(".score").innerHTML = changeUserMenu.score;
}

const wdt = 100, pct = 0, clr = "rgb(255, 255, 255)";
const loadBlock = document.querySelector(".loading");
let curWidth = wdt, curPct = pct, isLoaded = false;

document.addEventListener("keydown", (e) => {
    if (e.key == "Enter" && !isLoaded)
    {
        if (curWidth > 1500) 
        {
            document.querySelector(".lvl").classList.toggle("display");
            document.querySelector(".description_game").classList.toggle("display");
            follower(begin);
            isLoaded = true;
        }

        curWidth *= 1.1;
        curPct += 0.05;
        loadBlock.style.width = `${curWidth}px`;
        loadBlock.style.backgroundColor = `rgb(80, 226, 51, ${curPct})`;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key == "Enter")
    {
        curWidth = wdt;
        curPct = pct;
        loadBlock.style.backgroundColor = clr;
        loadBlock.style.width = `${curWidth}px`;
    }
});

document.getElementById("exit").onclick = function() {
  window.location.replace("/index.html");
}