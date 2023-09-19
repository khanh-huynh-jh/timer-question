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

function runQuestionaireUI(options = {}) {
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