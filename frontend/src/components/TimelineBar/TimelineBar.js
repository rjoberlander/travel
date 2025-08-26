class TimelineBar {
    constructor() {
        this.days = ['SATURDAY', 'SUNDAY', 'MONDAY'];
        this.dayIcons = {
            'SATURDAY': '🚂',
            'SUNDAY': '🦁', 
            'MONDAY': '🔬'
        };
        
        this.timeRanges = {
            morning: { start: 7, end: 12 },
            midday: { start: 12, end: 17 },
            evening: { start: 17, end: 22 }
        };
        
        this.events = [];
        this.currentProgress = 0;
        
        this.init();
    }
    
    init() {
        this.createTimeline();
        this.collectEvents();
        this.setupScrollListener();
    }
    
    createTimeline() {
        const timeline = document.createElement('div');
        timeline.className = 'timeline-bar';
        timeline.innerHTML = `
            <div class="timeline-container">
                <div class="timeline-line">
                    <div class="timeline-progress"></div>
                </div>
                ${this.createDayStops()}
                <div class="current-time">9:50 AM</div>
            </div>
        `;
        
        document.body.insertBefore(timeline, document.body.firstChild);
        
        this.addStyles();
    }
    
    createDayStops() {
        let stops = '';
        const positions = [16.66, 50, 83.33];
        
        this.days.forEach((day, index) => {
            const icon = this.dayIcons[day];
            const position = positions[index];
            
            stops += `
                <div class="day-stop stop-${day.toLowerCase()}" style="left: ${position}%;">
                    ${icon}
                    <div class="day-label">${this.formatDayName(day)}</div>
                </div>
            `;
        });
        
        return stops;
    }
    
    formatDayName(day) {
        return day.charAt(0) + day.slice(1).toLowerCase();
    }
    
    collectEvents() {
        const dayHeaders = document.querySelectorAll('.day-header');
        
        dayHeaders.forEach((dayHeader) => {
            const dayTitle = dayHeader.querySelector('.day-title').textContent.trim().toUpperCase();
            let currentElement = dayHeader.nextElementSibling;
            
            while (currentElement && !currentElement.classList.contains('day-header')) {
                if (currentElement.classList.contains('activity-card')) {
                    const timeElement = currentElement.querySelector('.activity-time');
                    if (timeElement) {
                        const timeText = timeElement.textContent.trim();
                        const time = this.parseTime(timeText);
                        
                        if (time) {
                            this.events.push({
                                day: dayTitle,
                                time: time,
                                element: currentElement,
                                offsetTop: currentElement.offsetTop,
                                timeString: this.formatTime(time)
                            });
                        }
                    }
                }
                currentElement = currentElement.nextElementSibling;
            }
        });
        
        this.events.sort((a, b) => {
            const dayOrder = this.days.indexOf(a.day) - this.days.indexOf(b.day);
            if (dayOrder !== 0) return dayOrder;
            return a.time - b.time;
        });
    }
    
    parseTime(timeStr) {
        const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
        if (!match) return null;
        
        let hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const period = match[3].toUpperCase();
        
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        
        return hours + (minutes / 60);
    }
    
    formatTime(decimalTime) {
        const hours = Math.floor(decimalTime);
        const minutes = Math.round((decimalTime - hours) * 60);
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
    
    setupScrollListener() {
        const progressLine = document.querySelector('.timeline-progress');
        const timeDisplay = document.querySelector('.current-time');
        const dayStops = document.querySelectorAll('.day-stop');
        
        const updateProgress = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            const viewportCenter = scrollTop + windowHeight / 2;
            
            let currentEvent = null;
            let nextEvent = null;
            
            for (let i = 0; i < this.events.length; i++) {
                if (this.events[i].offsetTop <= viewportCenter) {
                    currentEvent = this.events[i];
                    nextEvent = this.events[i + 1] || null;
                } else {
                    break;
                }
            }
            
            if (currentEvent) {
                const dayIndex = this.days.indexOf(currentEvent.day);
                const dayProgress = (currentEvent.time - 7) / 15;
                let segmentProgress = (dayIndex + dayProgress) / this.days.length;
                
                // Interpolate between events
                if (nextEvent && nextEvent.day === currentEvent.day) {
                    const progress = (viewportCenter - currentEvent.offsetTop) / 
                                   (nextEvent.offsetTop - currentEvent.offsetTop);
                    const timeRange = nextEvent.time - currentEvent.time;
                    const interpolatedTime = currentEvent.time + (timeRange * progress);
                    const interpolatedDayProgress = (interpolatedTime - 7) / 15;
                    segmentProgress = (dayIndex + interpolatedDayProgress) / this.days.length;
                    
                    // Update time display
                    timeDisplay.textContent = this.formatTime(interpolatedTime);
                } else {
                    // Update time display with current event time
                    timeDisplay.textContent = currentEvent.timeString;
                }
                
                const position = Math.min(Math.max(segmentProgress * 100, 0), 100);
                progressLine.style.width = `${position}%`;
                
                // Update position of time display
                const timePosition = Math.min(Math.max(position, 5), 95);
                timeDisplay.style.left = `${timePosition}%`;
                
                // Update completed day stops
                dayStops.forEach((stop, index) => {
                    if (index < dayIndex || (index === dayIndex && dayProgress > 0.5)) {
                        stop.classList.add('completed');
                    } else {
                        stop.classList.remove('completed');
                    }
                });
            } else {
                // No event reached yet, show at start
                progressLine.style.width = '0%';
                timeDisplay.style.left = '5%';
                timeDisplay.textContent = '9:50 AM';
                dayStops.forEach(stop => stop.classList.remove('completed'));
            }
        };
        
        window.addEventListener('scroll', updateProgress);
        updateProgress();
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .timeline-bar {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: 80px;
                background: rgba(255, 255, 255, 0.98);
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                backdrop-filter: blur(10px);
            }
            
            .timeline-container {
                position: relative;
                max-width: 1200px;
                margin: 0 auto;
                height: 100%;
                padding: 20px;
            }
            
            .timeline-line {
                position: absolute;
                top: 50%;
                left: 40px;
                right: 40px;
                height: 2px;
                background: #e0e0e0;
                transform: translateY(-50%);
            }
            
            .timeline-progress {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 0%;
                background: linear-gradient(90deg, #3498db, #e74c3c);
                transition: width 0.3s ease-out;
            }
            
            .day-stop {
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 40px;
                height: 40px;
                background: white;
                border: 3px solid #e0e0e0;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                z-index: 5;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .day-stop:hover {
                transform: translate(-50%, -50%) scale(1.1);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            
            .day-stop.completed {
                border-color: #3498db;
                background: #3498db;
            }
            
            .day-label {
                position: absolute;
                bottom: -25px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 11px;
                font-weight: 600;
                color: #666;
                white-space: nowrap;
            }
            
            .current-time {
                position: absolute;
                top: -25px;
                left: 5%;
                transform: translateX(-50%);
                background: #333;
                color: white;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 11px;
                font-weight: 600;
                white-space: nowrap;
                transition: left 0.3s ease-out;
                z-index: 10;
            }
            
            body {
                padding-top: 90px;
            }
            
            @media (max-width: 768px) {
                .timeline-bar {
                    height: 70px;
                }
                
                .timeline-container {
                    padding: 15px;
                }
                
                .day-stop {
                    width: 35px;
                    height: 35px;
                    font-size: 16px;
                }
                
                .day-label {
                    font-size: 10px;
                    bottom: -20px;
                }
                
                .current-time {
                    font-size: 10px;
                    padding: 3px 10px;
                }
                
                body {
                    padding-top: 80px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Initialize timeline when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.timelineBarInstance = new TimelineBar();
    });
} else {
    // DOM is already loaded
    window.timelineBarInstance = new TimelineBar();
}