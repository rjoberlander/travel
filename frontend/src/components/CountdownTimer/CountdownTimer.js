/**
 * CountdownTimer Component - Live countdown to trip departure
 * Shows days, hours, minutes until the adventure begins
 */

class CountdownTimer {
    constructor(targetDate, containerSelector) {
        this.targetDate = new Date(targetDate);
        this.container = document.querySelector(containerSelector);
        this.intervalId = null;
    }

    init() {
        this.render();
        this.startCountdown();
    }

    calculateTimeRemaining() {
        const now = new Date();
        const difference = this.targetDate - now;

        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                isExpired: true
            };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
            isExpired: false
        };
    }

    render() {
        const time = this.calculateTimeRemaining();
        
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="countdown-container">
                <h2 class="countdown-title">
                    ${time.isExpired ? 'Your Adventure Has Begun!' : 'Your Adventure Begins In:'}
                </h2>
                <div class="countdown-timer">
                    <div class="countdown-item">
                        <div class="countdown-value">${time.days}</div>
                        <div class="countdown-label">Days</div>
                    </div>
                    <div class="countdown-separator">:</div>
                    <div class="countdown-item">
                        <div class="countdown-value">${String(time.hours).padStart(2, '0')}</div>
                        <div class="countdown-label">Hours</div>
                    </div>
                    <div class="countdown-separator">:</div>
                    <div class="countdown-item">
                        <div class="countdown-value">${String(time.minutes).padStart(2, '0')}</div>
                        <div class="countdown-label">Minutes</div>
                    </div>
                    ${time.days === 0 ? `
                        <div class="countdown-separator">:</div>
                        <div class="countdown-item">
                            <div class="countdown-value">${String(time.seconds).padStart(2, '0')}</div>
                            <div class="countdown-label">Seconds</div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        if (time.isExpired && this.intervalId) {
            this.stopCountdown();
        }
    }

    startCountdown() {
        this.intervalId = setInterval(() => {
            this.render();
        }, 1000);
    }

    stopCountdown() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    destroy() {
        this.stopCountdown();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// CSS styles for the countdown timer
const countdownStyles = `
<style>
    .countdown-container {
        text-align: center;
        padding: 40px 20px;
        background: linear-gradient(135deg, rgba(70, 130, 180, 0.1) 0%, rgba(135, 206, 235, 0.1) 100%);
        border-radius: 20px;
        margin: 30px auto;
        max-width: 600px;
    }

    .countdown-title {
        font-family: 'Bebas Neue', cursive;
        font-size: 2rem;
        color: #4682B4;
        margin-bottom: 20px;
        letter-spacing: 2px;
    }

    .countdown-timer {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        font-family: 'Roboto', sans-serif;
    }

    .countdown-item {
        background: #fff;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        min-width: 80px;
    }

    .countdown-value {
        font-size: 3rem;
        font-weight: bold;
        color: #2c3e50;
        line-height: 1;
    }

    .countdown-label {
        font-size: 0.9rem;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-top: 5px;
    }

    .countdown-separator {
        font-size: 2rem;
        color: #4682B4;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        .countdown-timer {
            flex-wrap: wrap;
        }
        
        .countdown-item {
            min-width: 60px;
            padding: 15px;
        }
        
        .countdown-value {
            font-size: 2rem;
        }
        
        .countdown-separator {
            display: none;
        }
    }
</style>
`;

// Example usage
const exampleUsage = `
// In your HTML
<div id="trip-countdown"></div>

// In your JavaScript
const countdown = new CountdownTimer('2024-03-15T09:50:00', '#trip-countdown');
countdown.init();

// To stop the countdown
countdown.destroy();
`;

export default CountdownTimer;
export { countdownStyles };