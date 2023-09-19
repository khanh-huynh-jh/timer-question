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
let selectedChoice;

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
});



async function getQuestionData() {
    const response = await fetch("/question/data");
    const data = await response.json();
    return data
}

function showQuestionAnswerArea(options = {}) {
    const {
        questionAnswerArea,
        startBtn
    } = options;
    questionAnswerArea.classList.toggle("hidden");
    startBtn.classList.toggle("hidden");
}

function showQuestionUI(question, options = {}) {
    const {
        freeAnswer,
        multipleChoice,
        choicesPanel,
        questionElement
    } = options

    questionElement.innerText = question.content

    if (question.type === FREE_QUESTION) {
        freeAnswer.classList.remove("hidden")
        multipleChoice.classList.add("hidden")
    } else {
        freeAnswer.classList.add("hidden")
        multipleChoice.classList.remove("hidden")
        choicesPanel.innerHTML = ''

        const choiceElementClass = "choice"

        for (i in question.answerSet) {
            generateChoiceElement({
                parent: choicesPanel,
                choice: question.answerSet[i],
                elementClass: choiceElementClass,
                UIObjects: options
            })
        }
    }
}

function runQuestionaireUI(options = UIObjects) {
    if (questionaire.isCompleted()) {
        showResultUI(options);
    }
    else {
        const question = questionaire.getQuestion();
        showQuestionUI(question, options)
    }
}

function generateChoiceElement(options = {}) {
    const {
        parent,
        choice,
        elementClass,
        UIObjects
    } = options;

    const newElement = document.createElement('div');
    newElement.classList.add(elementClass);
    newElement.innerHTML = choice;

    newElement.addEventListener('click', (e) => {
        submitAnswer(e.target.innerText, UIObjects);
    })

    parent.appendChild(newElement);
}

function showResultUI(options = {}){
    const {
        resultArea,
        multipleChoice,
        freeAnswer,
        stopBtn
    } = options;
    resultArea.classList.remove("hidden");
    multipleChoice.classList.add("hidden");
    freeAnswer.classList.add("hidden");
    document.querySelector(".question-area").classList.add("hidden")
    stopBtn.click();
}

function submitAnswer(answer, UIObjects){
    questionaire.saveAnswer(answer)
    questionaire.goToNextQuestion();
    runQuestionaireUI(UIObjects);
}