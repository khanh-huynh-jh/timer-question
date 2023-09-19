import {
    END_OF_QUESTIONAIRE,
    FIRST_QUESTION_ID,
    FREE_QUESTION,
    MULTIPLE_CHOICE_QUESTION
} from './public/js/config.js';
import { questions } from './data.js';

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

class Questionaire {
    constructor(options = {}) {
        const {
            path,
            firstQuestionid = FIRST_QUESTION_ID,
            endOfQuestionId = END_OF_QUESTIONAIRE
        } = options;
        this.path = path;
        this.questionDict = {}
        const questions = require(this.path)
        for (const question of questions) {
            questionDict[question.id] = new Question(question);
        }
    }


}

function* initQuestionaire(options = {}) {


    let currentQuestionId = firstQuestionid;
    let answer = {
        userAnswer: ""
    }
    while (currentQuestionId !== endOfQuestionId) {

        yield [
            {
                content: questionDict[currentQuestionId].getContent(),
                type: questionDict[currentQuestionId].type,
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

