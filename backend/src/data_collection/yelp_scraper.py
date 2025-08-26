#!/usr/bin/env python3
"""
Yelp Review Scraper for Travel Itinerary Generator

Extracts key information from Yelp reviews to generate:
- Must-try menu items
- Pro tips from reviewers  
- Rating summaries
- Review quotes that paint vivid pictures
"""

import requests
import json
from typing import Dict, List, Optional

class YelpReviewCurator:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.yelp.com/v3"
        self.headers = {"Authorization": f"Bearer {api_key}"}
    
    def get_business_reviews(self, business_id: str) -> Dict:
        """Get reviews for a specific business"""
        url = f"{self.base_url}/businesses/{business_id}/reviews"
        response = requests.get(url, headers=self.headers)
        return response.json()
    
    def search_businesses(self, location: str, term: str, limit: int = 10) -> Dict:
        """Search for businesses in a location"""
        url = f"{self.base_url}/businesses/search"
        params = {
            "location": location,
            "term": term,
            "limit": limit,
            "sort_by": "rating"
        }
        response = requests.get(url, headers=self.headers, params=params)
        return response.json()
    
    def extract_must_try_items(self, reviews: List[Dict]) -> List[str]:
        """Extract frequently mentioned menu items from reviews"""
        # Implementation would analyze review text for food mentions
        # Return items mentioned multiple times with positive context
        pass
    
    def extract_pro_tips(self, reviews: List[Dict]) -> List[str]:
        """Extract actionable advice from reviews"""
        # Look for sentences with "tip", "advice", "recommend", "make sure"
        # Filter for non-obvious insights
        pass
    
    def find_vivid_quotes(self, reviews: List[Dict]) -> List[Dict]:
        """Find review quotes that paint pictures rather than generic praise"""
        # Avoid generic "great food, good service"
        # Prefer specific descriptions of experiences
        pass
    
    def generate_rating_summary(self, business_data: Dict) -> Dict:
        """Generate rating summary with context"""
        return {
            "stars": business_data.get("rating", 0),
            "review_count": business_data.get("review_count", 0),
            "price_level": business_data.get("price", ""),
            "categories": [cat["title"] for cat in business_data.get("categories", [])]
        }

# Example usage for Santa Barbara FisHouse extraction
if __name__ == "__main__":
    # This shows how we would extract the data we manually curated
    curated_example = {
        "must_try_items": [
            "🦞 Lobster Mac & Cheese - 'Legendary!'",
            "🦀 Cioppino - 'sooo much fresh crab and shrimp'", 
            "🐟 Macadamia Mahi Mahi - 'creamy pineapple beurre blanc'",
            "🥣 Clam Chowder - 'Best New England chowder on the west coast'"
        ],
        "pro_tips": [
            "Fire pit patio seating fills up fast at sunset!",
            "Happy Hour: Mon-Thu 4PM-Close | Fri 4PM-Close | Sat 2-5PM | Sun 4PM-Close"
        ],
        "vivid_quote": {
            "text": "We spent a lot of money on food at far more expensive, higher rated places this trip, and FisHouse was the best overall choice we made!",
            "source": "Yelp Reviewer"
        },
        "rating_summary": {
            "stars": 4.2,
            "review_count": 1461,
            "ranking": "#31 of 395 Santa Barbara restaurants"
        }
    }