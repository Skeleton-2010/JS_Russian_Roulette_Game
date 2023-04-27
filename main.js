let gun = document.querySelector(".Gun");
let reroll = document.querySelector(".RerollButton");
let trigger = document.querySelector(".TriggerButton");
let bulletPosition = 0;

let dead = 0;

let click = new Audio("./Clicking_Sound.wav");
let ambient = new Audio("./Ambient.wav");
let shot = new Audio("./Gun_Shot_Sound.wav");

function backgroundColoring(){
  document.body.style.backgroundColor = "#ffffff"
  setTimeout(() => {
    document.body.style.backgroundColor = "#000000";
    document.body.style.transition = "0.4s";
  }, 10);
  
} 

function death() {
  trigger.style.display = "none"
  reroll.style.display = "none"
  gun.src = gun.textContent = "./Images/M&Prevolver_Big&Red.png";
  dead = 1;
  shot.play();
  backgroundColoring();
  setTimeout(() => {
    gun.style.filter = "brightness(200%)";
    gun.style.transition = "0.4s";
    setTimeout(() => {
      gun.style.filter = "brightness(0%)";
      gun.style.transition = "0.4s";
      setTimeout(() => {
        window.close();
      }, 1000);
    }, 400);
  }, 2000);
}

function rerollBullet() {
  bulletPosition = Math.floor(Math.random() * 6) + 1;
}

function TriggerPress() {
  click.play();
  if (bulletPosition > 1) {
    bulletPosition -= 1;
  } else {
    if (bulletPosition == 1) {
      death();
    }
  }
}

function getAngle(x, y, z, a) {
  gun.style.transform =
    "rotate3d(" + x + ", " + y + ", " + z + ", " + a + "deg)";
}

function turnToLeft() {
  if (dead == 0) {
    getAngle(0, 0, 0, 0);
    gun.src = gun.textContent = "./Images/M&Prevolver_Big.png";
  } else {
    preventDefault();
  }
}

function turnToRight() {
  if (dead == 0) {
    getAngle(0, 1, 0, 180);
    gun.src = gun.textContent = "./Images/M&Prevolver_Big&Red.png";
  } else {
    preventDefault();
  }
}

function pointDownLeft() {
  if (dead == 0) {
    getAngle(0, 0, -1, 90);
    gun.src = gun.textContent = "./Images/M&Prevolver_Big.png";
  } else {
    preventDefault();
  }
}

function pointDownRight() {
  if (dead == 0) {
    getAngle(-1, 1, 0, 180);
    gun.src = gun.textContent = "./Images/M&Prevolver_Big.png";
  } else {
    preventDefault();
  }
}

rerollBullet();

function ControlEvents(){
  if (dead == 1) {
    preventDefault();
  } else {
    reroll.addEventListener("mouseenter", turnToLeft);
    trigger.addEventListener("mouseenter", turnToRight);
    reroll.addEventListener("mouseleave", pointDownLeft);
    trigger.addEventListener("mouseleave", pointDownRight);
    reroll.addEventListener("click", rerollBullet);
    trigger.addEventListener("click", TriggerPress);
  }
}

setInterval(ControlEvents, 10)
