
document.querySelector(".control-buttons span").addEventListener("click", function () {

const playerName = prompt("What's Your Name?");
document.querySelector(".name span").textContent = playerName  || 'Player';

document.querySelector(".control-buttons").remove();
});


const duration = 1000;
const blocksContainer = document.getElementsByClassName("memory-game-blocks")[0];
const blocks = Array.from(blocksContainer.getElementsByClassName("game-block"));
const orderRange = Array.from({ length: blocks.length }, (_, i) => i);
shuffle(orderRange);


let timer = null;
let timeElapsed = 0;

for (let index = 0; index < blocks.length; index++) {
const block = blocks[index];
block.style.order = orderRange[index];
block.addEventListener('click', function () {
if (!timer) {
startTimer();
}
flipBlock(block);
});
}

function flipBlock(selectedBlock) {
selectedBlock.classList.add('is-flipped');
const allFlippedBlocks = Array.from(blocks).filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
if (allFlippedBlocks.length === 2) {
stopClicking();
checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
}
}

function startTimer() {
timer = setInterval(() => {
timeElapsed++;
updateTimerDisplay();
}, 1000);
}  

function stopClicking() {
blocksContainer.classList.add('no-clicking');
const timeout = setTimeout(() => {
blocksContainer.classList.remove('no-clicking');
clearTimeout(timeout);
}, duration);
}


function checkMatchedBlocks(firstBlock, secondBlock) {
const triesElement = document.querySelector('.tries span');
const isMatch = firstBlock.dataset.technology === secondBlock.dataset.technology;

if (isMatch) {
handleMatchedBlocks(firstBlock, secondBlock);
} else {
handleMismatchedBlocks(firstBlock, secondBlock);
}

if (allMatchesFound()) {
stopTimer();
displayWinMessage();
}
}

function handleMatchedBlocks(firstBlock, secondBlock) {
firstBlock.classList.remove('is-flipped');
secondBlock.classList.remove('is-flipped');
firstBlock.classList.add('has-match');
secondBlock.classList.add('has-match');
}

function handleMismatchedBlocks(firstBlock, secondBlock) {
const triesElement = document.querySelector('.tries span');
triesElement.textContent = parseInt(triesElement.textContent) + 1;

setTimeout(() => {
firstBlock.classList.remove('is-flipped');
secondBlock.classList.remove('is-flipped');
}, duration);
}


function allMatchesFound() {
let allGameBlocks = Array.from(document.querySelectorAll('.game-block'));
return allGameBlocks.every((block) => block.classList.contains('has-match'));
}

function shuffle(array) {
let current = array.length;
while (current > 0) {
const random = Math.floor(Math.random() * current);
current--;
[array[current], array[random]] = [array[random], array[current]];
}
return array;
}

function displayWinMessage() {
const winMessage = document.getElementById('win-message');
winMessage.style.display = 'block';
}

function stopTimer() {
clearInterval(timer);
}

function updateTimerDisplay() {
const timerElement = document.querySelector('.timer');
const minutes = Math.floor(timeElapsed / 60);
const seconds = timeElapsed % 60;
timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

