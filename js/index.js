const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const questionAnswerArea = document.getElementById("question-answer-area");

startBtn.addEventListener('click', () => {
    questionAnswerArea.classList.toggle("hidden");
    startBtn.classList.toggle("hidden");
});

resetBtn.addEventListener('click', () => {
    startBtn.click();
});