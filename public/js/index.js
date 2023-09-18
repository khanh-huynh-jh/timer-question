const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const stopBtn = document.getElementById("end-btn");
const checkBtn = document.getElementById("check-btn");
const questionAnswerArea = document.getElementById("question-answer-area");
const resultArea = document.getElementById("result-area");
const freeAnswer = document.getElementById("free-answer");
const multipleChoice = document.getElementById("multiple-choice-answer");
const userAnswer = document.getElementById("user-answer");
const clock = document.querySelector(".timer p");
const questionElement = document.querySelector(".question-area p");
const choicesPanel = document.querySelector(".choices-panel");

const timer = new Timer();

let interval;
let choices;
let selectedChoice;

const question = {
    content: "",
    type: "",
    id: "",
    answerSet: ""
};

const fetchQuestion = () => {
    fetch("/data").then((res) => res.json()).then((data) => {
        if (data.done) {
            resultArea.classList.remove("hidden");
            userAnswer.classList.add("hidden");
            multipleChoice.classList.add("hidden");
            document.querySelector(".question-area").classList.add("hidden")
            stopBtn.click();
        }
        else {
            question.content = data.content;
            question.id = data.id;
            question.type = data.type;
            question.answerSet = data.answerSet;
            questionElement.innerText = question.content;

            if (question.type === "free") {
                freeAnswer.classList.remove("hidden")
                multipleChoice.classList.add("hidden")
            } else {
                freeAnswer.classList.add("hidden")
                multipleChoice.classList.remove("hidden")
                choicesPanel.innerHTML = ''
                for (i in question.answerSet) {
                    choicesPanel.innerHTML = choicesPanel.innerHTML + `
                    <div class="choice">
                        ${question.answerSet[i]}
                    </div>
                `
                }
                const elements = document.getElementsByClassName("choice")
                for (element of elements) {
                    element.addEventListener("click", () => {
                        selectedChoice = element.innerText;
                        checkBtn.click();
                    })
                }

            }
        }
    })
}

startBtn.addEventListener('click', () => {
    questionAnswerArea.classList.toggle("hidden");
    startBtn.classList.toggle("hidden");

    interval = setInterval(() => {
        clock.innerText = timer.getTime();
    }, 1000);

    timer.start();
    fetchQuestion();
});

checkBtn.addEventListener("click", () => {

    fetch("/answer", {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            answer: question.type === "free" ? userAnswer.value : selectedChoice
        }),
    }).then((res) => {
        console.log("Success")
    });

    fetchQuestion();
})

resetBtn.addEventListener('click', () => {
    questionAnswerArea.classList.toggle("hidden");
    startBtn.classList.toggle("hidden");
    clearInterval(interval);
    timer.reset();
    clock.innerText = "00:00:00";
});

stopBtn.addEventListener('click', () => {
    timer.stop();
    clearInterval(interval);
});




