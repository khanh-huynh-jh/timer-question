import { questions } from './data.js';

const FIRST_QUESTION_ID = '1';
const END_OF_QUESTIONAIRE = -1;
const MULTIPLE_CHOICE_QUESTION = 'multi';
const FREE_QUESTION = 'free';

class Question {
    constructor({ id, content, type, nextQuestion, answerSet }) {
        this.id = id;
        this.content = content;
        this.type = type;
        this.nextQuestion = nextQuestion;
        this.answer = '';
        this.answerSet = answerSet;
    }

    getNextQuestionId() {
        switch (this.type) {
            case MULTIPLE_CHOICE_QUESTION:
                return this.nextQuestion[this.answer]
            case FREE_QUESTION:
                return this.nextQuestion
        }
    }

    getContent() {
        return this.content;
    }

    saveAnswer(userAnswer) {
        this.answer = userAnswer;
    }
}

const questionDict = {};

const importQuestionaire = () => {
    for (const question of questions) {
        questionDict[question.id] = new Question(question);
    }
}

function* initQuestionaire(options = {}) {
    const {
        firstQuestionid = FIRST_QUESTION_ID,
        endOfQuestionId = END_OF_QUESTIONAIRE
    } = options;


    let currentQuestionId = firstQuestionid;
    let answer = {
        userAnswer: ""
    }
    while (currentQuestionId !== endOfQuestionId) {

        yield [
            {
                content: questionDict[currentQuestionId].getContent(),
                type: questionDict[currentQuestionId].type,
                id: questionDict[currentQuestionId].id,
                answerSet: questionDict[currentQuestionId].answerSet
            },
            answer
        ];
        questionDict[currentQuestionId].saveAnswer(answer.userAnswer);
        currentQuestionId = questionDict[currentQuestionId].getNextQuestionId();
    }


}

export const questionaireInterface = {
    import: importQuestionaire,
    init: initQuestionaire
}

