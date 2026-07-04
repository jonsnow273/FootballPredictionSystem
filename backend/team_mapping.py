TEAM_NAME_MAP = {
    "United States": "USA",
    "Korea Republic": "South Korea",
    "IR Iran": "Iran",
    "Côte d'Ivoire": "Ivory Coast",
    "Türkiye": "Turkey",
    "Bosnia and Herzegovina": "Bosnia-Herzegovina",
    "North Macedonia": "North Macedonia",
    "DR Congo": "DR Congo",
    "Cape Verde Islands": "Cape Verde",
}

def map_team_name(api_name):
    return TEAM_NAME_MAP.get(api_name, api_name)