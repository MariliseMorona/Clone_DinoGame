const dino = document.querySelector('.dino');
//na forma de cont não permite subscrever. se a opção for let dno .. ai pemite sobescrever a variável dino
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
    if(event.keyCode === 32){
// 32 é e keyCode ou valor, referente a tecla espaço, ou seja o dino só vai pular se apertar a tecla espaço
        if(!isJumping){
            jump();
// se ele não tiver pulando, ele pula (evita bug)
        }
    }
}
function jump(){
    isJumping = true;
 let upInterval = setInterval(() =>{
    if(position >=150){
        clearInterval(upInterval);

        let downInterval = setInterval(() =>{
            if(position <= 0){
                clearInterval(downInterval);
                isJumping = false;
            }else {
                position -= 20;
                dino.style.bottom = position + 'px';
            }
        }, 20);
    } else {
        position +=20;
        dino.style.bottom = position + 'px';
    }
}, 20);
}
function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    if(isGameOver)return;
    
    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';
    
    let leftTimer=setInterval(() => {
            if(cactusPosition < -60){
            clearInterval(leftTimer);
            background.removeChild(cactus);
        }
        else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            clearInterval(leftTimer);
            isGameOver = true;
//Quando o cactus atingir a posição do dino = game over
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        }
        else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }

    }, 20);

    setTimeout(createCactus, randomTime);
//recursividade: uma função chamando ela mesmo, para gerar um loop aleatorio de criação de cactus;
}
createCactus();
document.addEventListener('keyup', handleKeyUp);