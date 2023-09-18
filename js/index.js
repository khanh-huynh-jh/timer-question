const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const stopBtn = document.getElementById("stop-btn");
const questionAnswerArea = document.getElementById("question-answer-area");
const clockElement = document.querySelector(".timer p");

const timer = new Timer();

let interval;

startBtn.addEventListener('click', () => {
    questionAnswerArea.classList.toggle("hidden");
    startBtn.classList.toggle("hidden");

    interval = setInterval(() => {
        clockElement.innerText = timer.getTime();
    }, 1000);
    timer.start();
});

resetBtn.addEventListener('click', () => {
    questionAnswerArea.classList.toggle("hidden");
    startBtn.classList.toggle("hidden");
    clearInterval(interval);
    timer.reset();
    clockElement.innerText = "00:00:00";
});

stopBtn.addEventListener('click', ()=>{
    timer.stop();
    clearInterval(interval);
});

