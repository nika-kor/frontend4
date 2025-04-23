



  class CountdownTimer {
    constructor({ selector, targetDate }) {
      this.selector = selector;
      this.targetDate = targetDate;
      this.refs = this.getRefs(selector);
      this.intervalId = null;
  
      this.start();
    }
  
    getRefs(selector) {
      const timer = document.querySelector(selector);
      const days = timer.querySelector('[data-value="days"]');
      const hours = timer.querySelector('[data-value="hours"]');
      const mins = timer.querySelector('[data-value="mins"]');
      const secs = timer.querySelector('[data-value="secs"]');
  
      return { timer, days, hours, mins, secs };
    }
  
    start() {
      this.intervalId = setInterval(() => {
        const now = new Date();
        const time = this.targetDate.getTime() - now.getTime();
  
        if (time <= 0) {
          this.stop();
          this.updateClock({ days: 0, hours: 0, mins: 0, secs: 0 });
          return;
        }
  
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((time % (1000 * 60)) / 1000);
  
        this.updateClock({ days, hours, mins, secs });
      }, 1000);
    }
  
    stop() {
      clearInterval(this.intervalId);
    }
  
    updateClock({ days, hours, mins, secs }) {
      this.refs.days.textContent = `${days}`;
      this.refs.hours.textContent = `${hours}`.padStart(2, '0');
      this.refs.mins.textContent = `${mins}`.padStart(2, '0');
      this.refs.secs.textContent = `${secs}`.padStart(2, '0');
    }
  }




  new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('December 31, 2025 23:59:59'),
  });






