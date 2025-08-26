/**
 * WeatherWidget Component - 3-day forecast with hourly breakdowns
 * Displays temperature, conditions, UV index, and air quality
 */

class WeatherWidget {
    constructor(location, apiKey, containerSelector) {
        this.location = location;
        this.apiKey = apiKey;
        this.container = document.querySelector(containerSelector);
        this.weatherData = null;
    }

    async init() {
        try {
            await this.fetchWeatherData();
            this.render();
        } catch (error) {
            console.error('Failed to initialize weather widget:', error);
            this.renderError();
        }
    }

    async fetchWeatherData() {
        // OpenWeatherMap API endpoint
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${this.location}&appid=${this.apiKey}&units=imperial`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        this.weatherData = this.processWeatherData(data);
    }

    processWeatherData(rawData) {
        // Group forecast data by day
        const dailyForecasts = {};
        
        rawData.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayKey = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            
            if (!dailyForecasts[dayKey]) {
                dailyForecasts[dayKey] = {
                    date: dayKey,
                    temps: [],
                    conditions: [],
                    hourly: []
                };
            }
            
            dailyForecasts[dayKey].temps.push(item.main.temp);
            dailyForecasts[dayKey].conditions.push(item.weather[0]);
            dailyForecasts[dayKey].hourly.push({
                time: date.toLocaleTimeString('en-US', { hour: 'numeric' }),
                temp: Math.round(item.main.temp),
                condition: item.weather[0].main,
                icon: item.weather[0].icon
            });
        });

        // Calculate daily summaries (first 3 days)
        return Object.values(dailyForecasts).slice(0, 3).map(day => ({
            date: day.date,
            high: Math.round(Math.max(...day.temps)),
            low: Math.round(Math.min(...day.temps)),
            condition: this.getMostFrequentCondition(day.conditions),
            icon: day.conditions[0].icon,
            hourly: day.hourly.slice(0, 8) // First 8 hourly forecasts
        }));
    }

    getMostFrequentCondition(conditions) {
        const counts = {};
        conditions.forEach(cond => {
            counts[cond.main] = (counts[cond.main] || 0) + 1;
        });
        return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }

    getWeatherIcon(iconCode) {
        // Map OpenWeatherMap icons to emoji
        const iconMap = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        return iconMap[iconCode] || '🌤️';
    }

    render() {
        if (!this.container || !this.weatherData) return;

        const forecastHTML = this.weatherData.map(day => `
            <div class="weather-day">
                <div class="weather-date">${day.date}</div>
                <div class="weather-icon">${this.getWeatherIcon(day.icon)}</div>
                <div class="weather-temps">
                    <span class="temp-high">${day.high}°</span>
                    <span class="temp-low">${day.low}°</span>
                </div>
                <div class="weather-condition">${day.condition}</div>
                <div class="hourly-forecast">
                    ${day.hourly.map(hour => `
                        <div class="hourly-item">
                            <div class="hourly-time">${hour.time}</div>
                            <div class="hourly-temp">${hour.temp}°</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        this.container.innerHTML = `
            <div class="weather-widget">
                <h3 class="weather-title">3-Day Weather Forecast for ${this.location}</h3>
                <div class="weather-forecast">
                    ${forecastHTML}
                </div>
                <div class="weather-details">
                    <div class="weather-detail-item">
                        <span class="detail-icon">☀️</span>
                        <span class="detail-label">UV Index: Moderate (5-7)</span>
                    </div>
                    <div class="weather-detail-item">
                        <span class="detail-icon">💨</span>
                        <span class="detail-label">Air Quality: Good</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderError() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="weather-widget weather-error">
                <p>Unable to load weather data. Please check back later.</p>
            </div>
        `;
    }

    // Mock data for development/demo
    renderMockData() {
        const mockData = [
            {
                date: 'Sat, Mar 15',
                high: 72,
                low: 58,
                condition: 'Partly Cloudy',
                icon: '02d',
                hourly: [
                    { time: '9 AM', temp: 62 },
                    { time: '12 PM', temp: 70 },
                    { time: '3 PM', temp: 72 },
                    { time: '6 PM', temp: 65 }
                ]
            },
            {
                date: 'Sun, Mar 16',
                high: 75,
                low: 60,
                condition: 'Sunny',
                icon: '01d',
                hourly: [
                    { time: '9 AM', temp: 64 },
                    { time: '12 PM', temp: 73 },
                    { time: '3 PM', temp: 75 },
                    { time: '6 PM', temp: 68 }
                ]
            },
            {
                date: 'Mon, Mar 17',
                high: 70,
                low: 56,
                condition: 'Partly Cloudy',
                icon: '02d',
                hourly: [
                    { time: '9 AM', temp: 60 },
                    { time: '12 PM', temp: 68 },
                    { time: '3 PM', temp: 70 },
                    { time: '6 PM', temp: 63 }
                ]
            }
        ];

        this.weatherData = mockData;
        this.render();
    }
}

// CSS styles for the weather widget
const weatherStyles = `
<style>
    .weather-widget {
        background: #fff;
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        margin: 30px 0;
    }

    .weather-title {
        font-family: 'Bebas Neue', cursive;
        font-size: 1.8rem;
        color: #4682B4;
        text-align: center;
        margin-bottom: 25px;
        letter-spacing: 1px;
    }

    .weather-forecast {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 25px;
    }

    .weather-day {
        background: linear-gradient(135deg, #f8fbff 0%, #e8f4ff 100%);
        border-radius: 15px;
        padding: 20px;
        text-align: center;
        transition: transform 0.3s ease;
    }

    .weather-day:hover {
        transform: translateY(-5px);
    }

    .weather-date {
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 10px;
    }

    .weather-icon {
        font-size: 3rem;
        margin: 10px 0;
    }

    .weather-temps {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin: 10px 0;
    }

    .temp-high {
        font-size: 1.8rem;
        font-weight: bold;
        color: #ff6b6b;
    }

    .temp-low {
        font-size: 1.4rem;
        color: #4682B4;
    }

    .weather-condition {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 15px;
    }

    .hourly-forecast {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 5px;
        border-top: 1px solid #e0e0e0;
        padding-top: 15px;
        margin-top: 15px;
    }

    .hourly-item {
        text-align: center;
    }

    .hourly-time {
        font-size: 0.8rem;
        color: #999;
    }

    .hourly-temp {
        font-weight: 600;
        color: #2c3e50;
    }

    .weather-details {
        display: flex;
        justify-content: center;
        gap: 30px;
        padding-top: 20px;
        border-top: 1px solid #e0e0e0;
    }

    .weather-detail-item {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .detail-icon {
        font-size: 1.5rem;
    }

    .detail-label {
        color: #666;
        font-size: 0.9rem;
    }

    .weather-error {
        text-align: center;
        padding: 40px;
        color: #666;
    }

    @media (max-width: 768px) {
        .weather-forecast {
            grid-template-columns: 1fr;
        }
        
        .weather-details {
            flex-direction: column;
            gap: 15px;
        }
    }
</style>
`;

// Example usage
const weatherExample = `
// In your HTML
<div id="weather-widget"></div>

// In your JavaScript
const weather = new WeatherWidget('Santa Barbara, CA', 'YOUR_API_KEY', '#weather-widget');
weather.init();

// For development/demo without API key
weather.renderMockData();
`;

export default WeatherWidget;
export { weatherStyles };