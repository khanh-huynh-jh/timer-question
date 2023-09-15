class TimeBuffer {
    constructor(hours = 0, minutes = 0, seconds = 0){
        this.hours = hours;
        this.minutes = minutes;
        this.seconds =  seconds;
    }
}

class Timer {
    constructor() {
        this.startTime = new Date().getTime();
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.isTiming = false;
    }

    start(buffer) {
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
            buffer.hours = this.hours.toString().padStart(2, '0');
            buffer.minutes = this.minutes.toString().padStart(2, '0');
            buffer.seconds = this.seconds.toString().padStart(2, '0');

        }, 1000);
        return this;
    }

    stop() {
        this.isTiming = false;
    }
}
