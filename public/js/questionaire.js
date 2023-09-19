class Question {
    constructor({ id, content, type, nextQuestion, answerSet }) {
        this.id = id;
        this.content = content;
        this.type = type;
        this.nextQuestion = nextQuestion;
        this.answer = undefined;
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

    getQuestionInfo(){
        return {
            content: this.content,
            type: this.type,
            answerSet: this.answerSet
        }
    }

    saveAnswer(userAnswer) {
        this.answer = userAnswer;
    }
}

class Questionaire {
    constructor(options = {}) {
        const {
            questions,
            firstQuestionId = FIRST_QUESTION_ID,
            endOfQuestionId = END_OF_QUESTIONAIRE
        } = options;
        this.firstQuestionId = firstQuestionId
        this.endOfQuestionId = endOfQuestionId
        this.currentQuestionId = firstQuestionId
        this.questionDict = {}
        for (const question of questions) {
            this.questionDict[question.id] = new Question(question);
        }
    }

    getQuestion(){
        return this.questionDict[this.currentQuestionId].getQuestionInfo()
    }

    saveAnswer(answer){
        this.questionDict[this.currentQuestionId].saveAnswer(answer)
    }

    isCompleted(){
        return this.currentQuestionId ===  this.endOfQuestionId
    }

    goToNextQuestion(){
        try{
            if (this.answer){
                throw new Error('Can not go to next question. Answer is undefined.')
            }
            this.currentQuestionId = this.questionDict[this.currentQuestionId].getNextQuestionId()
            if (this.isCompleted()){
                throw new Error('No question left')
            }
        }catch(e){
           console.log(e)
        }
    }
}