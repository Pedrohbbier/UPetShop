let scoreText = document.getElementById('score')
let score = 0
let highscore = localStorage.getItem("highscore")
let highscoreText = document.getElementById('highscore')
highscoreText.innerText = highscore
let canvas = document.querySelector("#game")
let context = canvas.getContext("2d")
let box = 32
let dog = []
let PrimeiraVez = true;
let audioPeteta = new Audio('./audioPateta.mp3')
let audioTutorial = new Audio('./audioTutorial.mp3')
let audioComendo = new Audio('./comendo.mp3')


dog[0] = {
  x: 8 * box,
  y: 8 * box
}
let direction = "up"
let osso = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

function createBackground() {
  context.fillStyle = "lightblue"
  context.fillRect(0, 0, 16 * box, 16 * box)
}

function createDog() {
  for(i = 0; i < dog.length; i ++){
    context.fillStyle = "#c57d56"
    context.fillRect(dog[i].x, dog[i].y, box, box)
  }
}

function createOsso() {
    let meatEmoji = "🦴";
    context.font = "30px Arial"; // Aumenta o tamanho da fonte
    context.fillStyle = "#e53935"
    context.fillText(meatEmoji, osso.x, osso.y + box); // Ajusta a posição do emoji
  }
  



document.addEventListener('keydown', update)
function update(event) {
  if (event.keyCode == 37 && direction != "right"){direction = "left"}
  if (event.keyCode == 39 && direction != "left"){direction = "right"}
  if (event.keyCode == 38 && direction != "down"){direction = "up"}
  if (event.keyCode == 40 && direction != "up"){direction = "down"}
  if (event.keyCode == 65 && direction != "right"){direction = "left"}
  if (event.keyCode == 68 && direction != "left"){direction = "right"}
  if (event.keyCode == 87 && direction != "down"){direction = "up"}
  if (event.keyCode == 83 && direction != "up"){direction = "down"}
}

function startGame() {
  if(dog[0].x > 15 * box){dog[0].x = 0}
  if(dog[0].x < 0 * box){dog[0].x = 16 * box}
  if(dog[0].y > 15 * box){dog[0].y = 0}
  if(dog[0].y < 0 * box){dog[0].y = 16 * box}

  for(i = 1; i < dog.length; i++){
  
    if(dog[0].x == dog[i].x && dog[0].y == dog[i].y){
      clearInterval(game)
      alert('Você perdeu!\nClique para jogar novamente.')
      location.reload()
      PrimeiraVez = true;
    }
  }

  createBackground()
  createDog()
  createOsso()

  let dogX = dog[0].x
  let dogY = dog[0].y

  if(direction == "right"){dogX += box}
  if(direction == "left"){dogX -= box}
  if(direction == "up"){dogY -= box}
  if(direction == "down"){dogY += box}
  
  
  if(dogX != osso.x || dogY != osso.y){
    dog.pop()
  } else {
    osso.x = Math.floor(Math.random() * 15 + 1) * box
    osso.y = Math.floor(Math.random() * 15 + 1) * box
    for(i = 0; i < dog.length; i++){
      if(osso.x == dog[i].x && osso.y == dog[i].y){
        osso.x = Math.floor(Math.random() * 15 + 1) * box
        osso.y = Math.floor(Math.random() * 15 + 1) * box
        i = 0
      }
    }
    audioComendo.play()
    score ++
    scoreText.innerText = score
    if(score > highscore){
      highscore = score;

      if (PrimeiraVez) {
        audioPeteta.play()
        PrimeiraVez = false;
      }
      
    }
    localStorage.setItem("highscore", highscore)
    highscoreText.innerText = highscore
  }

  let dogHead = {
    x: dogX,
    y: dogY
  }
  dog.unshift(dogHead)

}


const startBtn = document.querySelector("#startBtn") //começar o jogo

const startTutorial = document.querySelector("#startTutorial") //responsável pela fala do tutorial

const btns = document.querySelector("#btns")

const voltarBtn = document.querySelector("#voltarBtn")

startTutorial.addEventListener("click" , ()=>{ //responsável pela fala do tutorial
  audioTutorial.play()
})


startBtn.addEventListener("click" , ()=>{ //começar o jogo
  canvas.style.display = 'block'
  let game = setInterval(startGame, 100)
  btns.style.display = 'none'
  startBtn.style.display = 'none'
  startTutorial.style.display = 'none'
  voltarBtn.style.display = "none"
})

function voltarPg(){
  window.location.href = "../setor1/index.html";
}
