"""
Weather API Module - Fetches weather data for travel destinations
Supports OpenWeatherMap API with caching and fallback data
"""

import os
import json
import requests
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class WeatherAPI:
    """Handles weather data fetching and processing for travel itineraries"""
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv('OPENWEATHER_API_KEY')
        self.base_url = "https://api.openweathermap.org/data/2.5"
        self.cache_dir = "backend/data/weather_cache"
        self._ensure_cache_dir()
    
    def _ensure_cache_dir(self):
        """Create cache directory if it doesn't exist"""
        os.makedirs(self.cache_dir, exist_ok=True)
    
    def get_forecast(self, location: str, days: int = 3) -> Dict:
        """
        Get weather forecast for a location
        
        Args:
            location: City name or coordinates
            days: Number of days to forecast (max 5)
        
        Returns:
            Weather forecast data
        """
        if not self.api_key:
            logger.warning("No API key found, returning mock data")
            return self._get_mock_forecast(location, days)
        
        try:
            # Check cache first
            cached_data = self._get_cached_forecast(location)
            if cached_data:
                return cached_data
            
            # Fetch from API
            forecast_data = self._fetch_forecast(location)
            processed_data = self._process_forecast(forecast_data, days)
            
            # Cache the result
            self._cache_forecast(location, processed_data)
            
            return processed_data
            
        except Exception as e:
            logger.error(f"Error fetching weather data: {e}")
            return self._get_mock_forecast(location, days)
    
    def _fetch_forecast(self, location: str) -> Dict:
        """Fetch forecast data from OpenWeatherMap API"""
        params = {
            'q': location,
            'appid': self.api_key,
            'units': 'imperial'
        }
        
        response = requests.get(f"{self.base_url}/forecast", params=params)
        response.raise_for_status()
        
        return response.json()
    
    def _process_forecast(self, raw_data: Dict, days: int) -> Dict:
        """Process raw API data into structured format"""
        city_info = raw_data.get('city', {})
        forecasts = []
        
        # Group forecasts by day
        daily_data = {}
        
        for item in raw_data.get('list', []):
            dt = datetime.fromtimestamp(item['dt'])
            day_key = dt.strftime('%Y-%m-%d')
            
            if day_key not in daily_data:
                daily_data[day_key] = {
                    'temps': [],
                    'conditions': [],
                    'humidity': [],
                    'wind_speed': [],
                    'hourly': []
                }
            
            daily_data[day_key]['temps'].append(item['main']['temp'])
            daily_data[day_key]['conditions'].append(item['weather'][0])
            daily_data[day_key]['humidity'].append(item['main']['humidity'])
            daily_data[day_key]['wind_speed'].append(item['wind']['speed'])
            
            # Add hourly data (limit to 8 per day)
            if len(daily_data[day_key]['hourly']) < 8:
                daily_data[day_key]['hourly'].append({
                    'time': dt.strftime('%-I %p'),
                    'temp': round(item['main']['temp']),
                    'condition': item['weather'][0]['main'],
                    'icon': item['weather'][0]['icon'],
                    'description': item['weather'][0]['description']
                })
        
        # Convert to daily summaries
        for i, (day_key, day_data) in enumerate(daily_data.items()):
            if i >= days:
                break
                
            dt = datetime.strptime(day_key, '%Y-%m-%d')
            
            forecast = {
                'date': dt.strftime('%a, %b %d'),
                'day_name': dt.strftime('%A'),
                'high': round(max(day_data['temps'])),
                'low': round(min(day_data['temps'])),
                'condition': self._get_primary_condition(day_data['conditions']),
                'icon': day_data['conditions'][0]['icon'],
                'description': day_data['conditions'][0]['description'],
                'humidity': round(sum(day_data['humidity']) / len(day_data['humidity'])),
                'wind_speed': round(sum(day_data['wind_speed']) / len(day_data['wind_speed'])),
                'hourly': day_data['hourly']
            }
            
            forecasts.append(forecast)
        
        return {
            'location': {
                'name': city_info.get('name', location),
                'country': city_info.get('country', ''),
                'coordinates': {
                    'lat': city_info.get('coord', {}).get('lat'),
                    'lon': city_info.get('coord', {}).get('lon')
                }
            },
            'current': {
                'temperature': forecasts[0]['high'] if forecasts else 70,
                'condition': forecasts[0]['condition'] if forecasts else 'Clear',
                'description': forecasts[0]['description'] if forecasts else 'clear sky'
            },
            'forecast': forecasts,
            'additional_info': {
                'uv_index': self._estimate_uv_index(forecasts[0]['condition'] if forecasts else 'Clear'),
                'air_quality': 'Good',  # Would need separate API for real data
                'sunrise': city_info.get('sunrise', '6:30 AM'),
                'sunset': city_info.get('sunset', '7:00 PM')
            },
            'last_updated': datetime.now().isoformat()
        }
    
    def _get_primary_condition(self, conditions: List[Dict]) -> str:
        """Determine the primary weather condition from a list"""
        condition_counts = {}
        
        for cond in conditions:
            main = cond['main']
            condition_counts[main] = condition_counts.get(main, 0) + 1
        
        return max(condition_counts, key=condition_counts.get)
    
    def _estimate_uv_index(self, condition: str) -> str:
        """Estimate UV index based on weather condition"""
        uv_map = {
            'Clear': 'High (7-9)',
            'Clouds': 'Moderate (3-5)',
            'Rain': 'Low (1-2)',
            'Snow': 'Low (1-2)',
            'Thunderstorm': 'Low (1-2)'
        }
        return uv_map.get(condition, 'Moderate (5-7)')
    
    def _get_cached_forecast(self, location: str) -> Optional[Dict]:
        """Get forecast from cache if available and fresh"""
        cache_file = os.path.join(self.cache_dir, f"{location.lower().replace(' ', '_')}.json")
        
        if os.path.exists(cache_file):
            with open(cache_file, 'r') as f:
                cached_data = json.load(f)
            
            # Check if cache is fresh (less than 1 hour old)
            last_updated = datetime.fromisoformat(cached_data['last_updated'])
            if datetime.now() - last_updated < timedelta(hours=1):
                logger.info(f"Using cached weather data for {location}")
                return cached_data
        
        return None
    
    def _cache_forecast(self, location: str, data: Dict):
        """Cache forecast data"""
        cache_file = os.path.join(self.cache_dir, f"{location.lower().replace(' ', '_')}.json")
        
        with open(cache_file, 'w') as f:
            json.dump(data, f, indent=2)
    
    def _get_mock_forecast(self, location: str, days: int) -> Dict:
        """Return mock forecast data for development/testing"""
        base_date = datetime.now()
        forecasts = []
        
        # Mock weather patterns
        patterns = [
            {'condition': 'Clear', 'icon': '01d', 'high': 75, 'low': 60},
            {'condition': 'Partly Cloudy', 'icon': '02d', 'high': 72, 'low': 58},
            {'condition': 'Cloudy', 'icon': '03d', 'high': 68, 'low': 55},
            {'condition': 'Light Rain', 'icon': '10d', 'high': 65, 'low': 52}
        ]
        
        for i in range(days):
            current_date = base_date + timedelta(days=i)
            pattern = patterns[i % len(patterns)]
            
            hourly_data = []
            for hour in [9, 12, 15, 18]:
                temp_variation = (hour - 12) * 2  # Temperature peaks at noon
                hourly_data.append({
                    'time': f"{hour % 12 or 12} {'PM' if hour >= 12 else 'AM'}",
                    'temp': pattern['high'] - 5 + temp_variation,
                    'condition': pattern['condition'],
                    'icon': pattern['icon'],
                    'description': pattern['condition'].lower()
                })
            
            forecast = {
                'date': current_date.strftime('%a, %b %d'),
                'day_name': current_date.strftime('%A'),
                'high': pattern['high'],
                'low': pattern['low'],
                'condition': pattern['condition'],
                'icon': pattern['icon'],
                'description': pattern['condition'].lower(),
                'humidity': 65,
                'wind_speed': 10,
                'hourly': hourly_data
            }
            
            forecasts.append(forecast)
        
        return {
            'location': {
                'name': location,
                'country': 'US',
                'coordinates': {'lat': 34.4208, 'lon': -119.6982}
            },
            'current': {
                'temperature': forecasts[0]['high'] if forecasts else 70,
                'condition': forecasts[0]['condition'] if forecasts else 'Clear',
                'description': forecasts[0]['description'] if forecasts else 'clear sky'
            },
            'forecast': forecasts,
            'additional_info': {
                'uv_index': 'Moderate (5-7)',
                'air_quality': 'Good',
                'sunrise': '6:30 AM',
                'sunset': '7:00 PM'
            },
            'last_updated': datetime.now().isoformat()
        }
    
    def get_packing_suggestions(self, forecast_data: Dict) -> List[str]:
        """Generate packing suggestions based on weather forecast"""
        suggestions = ['Comfortable walking shoes', 'Sunglasses']
        
        # Analyze all forecast days
        conditions = set()
        min_temp = float('inf')
        max_temp = float('-inf')
        
        for day in forecast_data.get('forecast', []):
            conditions.add(day['condition'])
            min_temp = min(min_temp, day['low'])
            max_temp = max(max_temp, day['high'])
        
        # Temperature-based suggestions
        if min_temp < 60:
            suggestions.append('Light jacket or sweater for evenings')
        if max_temp > 80:
            suggestions.append('Sunscreen (SPF 30+)')
            suggestions.append('Hat for sun protection')
        
        # Condition-based suggestions
        if 'Rain' in conditions or 'Drizzle' in conditions:
            suggestions.append('Umbrella or rain jacket')
            suggestions.append('Waterproof shoes')
        
        if 'Clear' in conditions or 'Sunny' in conditions:
            suggestions.append('Beach attire if visiting coast')
        
        return suggestions


# Example usage
if __name__ == "__main__":
    # Initialize weather API
    weather = WeatherAPI()
    
    # Get forecast for Santa Barbara
    forecast = weather.get_forecast("Santa Barbara, CA", days=3)
    
    print(f"Weather for {forecast['location']['name']}:")
    print(f"Current: {forecast['current']['temperature']}°F, {forecast['current']['condition']}")
    
    print("\n3-Day Forecast:")
    for day in forecast['forecast']:
        print(f"{day['date']}: {day['high']}°/{day['low']}°F, {day['condition']}")
    
    # Get packing suggestions
    suggestions = weather.get_packing_suggestions(forecast)
    print("\nPacking Suggestions:")
    for suggestion in suggestions:
        print(f"- {suggestion}")