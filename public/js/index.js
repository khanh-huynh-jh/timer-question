const UIObjects = {
    startBtn: document.getElementById("start-btn"),
    resetBtns: document.getElementsByClassName("reset-btn"),
    stopBtn: document.getElementById("end-btn"),
    checkBtn: document.getElementById("check-btn"),
    questionAnswerArea: document.getElementById("question-answer-area"),
    resultArea: document.getElementById("result-area"),
    freeAnswer: document.getElementById("free-answer"),
    multipleChoice: document.getElementById("multiple-choice-answer"),
    userAnswer: document.getElementById("user-answer"),
    clock: document.querySelector(".timer p"),
    questionElement: document.querySelector(".question-area p"),
    choicesPanel: document.querySelector(".choices-panel"),
}

const timer = new Timer();

let questionaire;
getQuestionData(questionaire).then((data) => {
    questionaire = new Questionaire({ questions: data })
});

let interval;

UIObjects.startBtn.addEventListener('click', () => {
    if (!questionaire) {
        return;
    }
    showQuestionAnswerArea(UIObjects)
    runQuestionaireUI(UIObjects);
    interval = setInterval(() => {
        UIObjects.clock.innerText = timer.getTime();
    }, 1000);

    timer.start();
});


UIObjects.checkBtn.addEventListener("click", () => {
    submitAnswer(UIObjects.userAnswer.value, UIObjects)
    UIObjects.userAnswer.value = "";
})

for (btn of UIObjects.resetBtns) {
    btn.addEventListener('click', () => {
        window.location.href = '/'
    })
};

UIObjects.stopBtn.addEventListener('click', () => {
    timer.stop();
    clearInterval(interval);
    buttons = document.querySelectorAll("button:not(.reset-btn)")
    for (button of buttons){
        button.disabled = true;
    }
});
