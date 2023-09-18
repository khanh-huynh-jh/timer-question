const FIRST_QUESTION_ID = '1';
const END_OF_QUESTIONAIRE = -1;
const MULTIPLE_CHOICE_QUESTION = 'multi';
const FREE_QUESTION = 'free';

class Timer {
    constructor() {
        this.startTime = new Date().getTime();
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.isTiming = false;
    }

    start() {
        this.isTiming = true;
        const interval = setInterval(() => {
            if (this.seconds < 59) {
                this.seconds += 1;
            } else if (this.minutes < 59) {
                this.minutes += 1;
                this.seconds = 0;
            }
            else {
                this.hours += 1;
                this.minutes = 0;
                this.seconds = 0;
            }
            if (!this.isTiming) {
                clearInterval(interval);
            }

        }, 1000);
        return this;
    }

    stop() {
        this.isTiming = false;
    }

    reset() {
        this.isTiming = false;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
    }

    getTime() {
        const hour = this.hours.toString().padStart(2, '0');
        const minute = this.minutes.toString().padStart(2, '0');
        const second = this.seconds.toString().padStart(2, '0');
        return `${hour}:${minute}:${second}`
    }
}





