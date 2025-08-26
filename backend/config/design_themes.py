#!/usr/bin/env python3
"""
Design Themes Configuration for Travel Itinerary Generator

Based on successful Santa Barbara vintage travel poster theme.
Each theme defines colors, fonts, and styling that creates cohesive visual identity.
"""

DESIGN_THEMES = {
    "vintage_coastal": {
        "name": "Vintage Coastal",
        "description": "Inspired by 1950s travel posters with ocean themes",
        "colors": {
            "primary": "#4682B4",      # Steel blue
            "secondary": "#87CEEB",    # Sky blue  
            "accent": "#ff6b6b",       # Coral red
            "background": "#fef9f3",   # Warm white
            "text_dark": "#2c3e50",    # Dark slate
            "text_light": "#666666",   # Medium gray
        },
        "fonts": {
            "display": "Bebas Neue",     # For big headers
            "serif": "Playfair Display", # For elegant titles
            "body": "Roboto",           # For readable content
        },
        "gradients": {
            "header": "linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)",
            "weather": "linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)",
            "accent": "linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%)"
        },
        "effects": {
            "card_shadow": "0 10px 30px rgba(0,0,0,0.1)",
            "hover_lift": "translateY(-5px)",
            "border_radius": "20px",
            "vintage_texture": True
        }
    },
    
    "mountain_adventure": {
        "name": "Mountain Adventure", 
        "description": "Earth tones inspired by national park posters",
        "colors": {
            "primary": "#8B4513",      # Saddle brown
            "secondary": "#DEB887",    # Burlywood
            "accent": "#FF8C00",       # Dark orange
            "background": "#FFF8DC",   # Cornsilk
            "text_dark": "#2F4F4F",    # Dark slate gray
            "text_light": "#696969",   # Dim gray
        },
        "fonts": {
            "display": "Oswald",
            "serif": "Merriweather", 
            "body": "Open Sans",
        },
        "gradients": {
            "header": "linear-gradient(135deg, #DEB887 0%, #8B4513 100%)",
            "weather": "linear-gradient(135deg, #DEB887 0%, #8B4513 100%)",
            "accent": "linear-gradient(135deg, #FFF8DC 0%, #F5DEB3 100%)"
        }
    },
    
    "urban_modern": {
        "name": "Urban Modern",
        "description": "Clean, contemporary design for city adventures", 
        "colors": {
            "primary": "#2C3E50",      # Dark blue gray
            "secondary": "#34495E",    # Wet asphalt
            "accent": "#E74C3C",       # Alizarin red
            "background": "#FFFFFF",    # Pure white
            "text_dark": "#2C3E50",    
            "text_light": "#7F8C8D",   # Asbestos gray
        },
        "fonts": {
            "display": "Montserrat",
            "serif": "Lora",
            "body": "Source Sans Pro",
        },
        "gradients": {
            "header": "linear-gradient(135deg, #34495E 0%, #2C3E50 100%)",
            "weather": "linear-gradient(135deg, #BDC3C7 0%, #95A5A6 100%)",
            "accent": "linear-gradient(135deg, #ECF0F1 0%, #BDC3C7 100%)"
        }
    },
    
    "tropical_paradise": {
        "name": "Tropical Paradise",
        "description": "Vibrant colors inspired by tropical destinations",
        "colors": {
            "primary": "#00CED1",      # Dark turquoise  
            "secondary": "#20B2AA",    # Light sea green
            "accent": "#FF6347",       # Tomato red
            "background": "#F0FFFF",   # Azure
            "text_dark": "#008B8B",    # Dark cyan
            "text_light": "#4682B4",   # Steel blue
        },
        "fonts": {
            "display": "Righteous",
            "serif": "Crimson Text",
            "body": "Nunito Sans",
        },
        "gradients": {
            "header": "linear-gradient(135deg, #20B2AA 0%, #00CED1 100%)",
            "weather": "linear-gradient(135deg, #AFEEEE 0%, #00CED1 100%)",
            "accent": "linear-gradient(135deg, #F0FFFF 0%, #E0FFFF 100%)"
        }
    }
}

def get_theme_css(theme_name: str) -> str:
    """Generate CSS variables for a specific theme"""
    
    if theme_name not in DESIGN_THEMES:
        theme_name = "vintage_coastal"  # Default fallback
    
    theme = DESIGN_THEMES[theme_name]
    
    css_variables = f"""
    :root {{
        /* Colors */
        --primary-color: {theme['colors']['primary']};
        --secondary-color: {theme['colors']['secondary']};
        --accent-color: {theme['colors']['accent']};
        --background-color: {theme['colors']['background']};
        --text-dark: {theme['colors']['text_dark']};
        --text-light: {theme['colors']['text_light']};
        
        /* Fonts */
        --font-display: '{theme['fonts']['display']}', cursive;
        --font-serif: '{theme['fonts']['serif']}', serif;
        --font-body: '{theme['fonts']['body']}', sans-serif;
        
        /* Gradients */
        --gradient-header: {theme['gradients']['header']};
        --gradient-weather: {theme['gradients']['weather']};
        --gradient-accent: {theme['gradients']['accent']};
    """
    
    if 'effects' in theme:
        effects = theme['effects']
        css_variables += f"""
        
        /* Effects */
        --card-shadow: {effects.get('card_shadow', '0 2px 4px rgba(0,0,0,0.1)')};
        --hover-lift: {effects.get('hover_lift', 'translateY(-2px)')};
        --border-radius: {effects.get('border_radius', '10px')};
        """
    
    css_variables += "\n    }\n"
    
    return css_variables

# Example of how themes would be applied
THEME_APPLICATIONS = {
    "coastal_destinations": "vintage_coastal",    # Santa Barbara, San Diego, etc.
    "mountain_destinations": "mountain_adventure", # Aspen, Yellowstone, etc.  
    "city_destinations": "urban_modern",          # NYC, Chicago, etc.
    "tropical_destinations": "tropical_paradise", # Hawaii, Miami, etc.
}

def suggest_theme_for_destination(destination: str, activities: list) -> str:
    """Suggest appropriate theme based on destination and activities"""
    
    destination_lower = destination.lower()
    activity_keywords = " ".join(activities).lower()
    
    # Check for coastal indicators
    coastal_keywords = ["beach", "ocean", "coast", "pier", "harbor", "surf"]
    if any(keyword in destination_lower or keyword in activity_keywords 
           for keyword in coastal_keywords):
        return "vintage_coastal"
    
    # Check for mountain indicators  
    mountain_keywords = ["mountain", "hiking", "ski", "national park", "trail"]
    if any(keyword in destination_lower or keyword in activity_keywords 
           for keyword in mountain_keywords):
        return "mountain_adventure"
        
    # Check for tropical indicators
    tropical_keywords = ["tropical", "island", "palm", "resort", "snorkel"]
    if any(keyword in destination_lower or keyword in activity_keywords 
           for keyword in tropical_keywords):
        return "tropical_paradise"
    
    # Default to urban for cities
    return "urban_modern"

if __name__ == "__main__":
    # Example usage
    print("Theme for Santa Barbara with beach activities:")
    theme = suggest_theme_for_destination("Santa Barbara", ["beach", "zoo", "restaurant"])
    print(f"Suggested theme: {theme}")
    print("\nGenerated CSS:")
    print(get_theme_css(theme))