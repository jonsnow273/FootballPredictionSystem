import pandas as pd

df = pd.read_csv("data/international_matches.csv")

def get_h2h(team1, team2):

    h2h_home = df[(df['_home_team'] == team1) & (df['_away_team'] == team2)]
    h2h_away = df[(df['_home_team'] == team2) & (df['_away_team'] == team1)]
    h2h = pd.concat([h2h_home, h2h_away])

    if h2h.empty:
        return{"message" : f"no data was found in {team1} and {team2}"}
    
    h2h['_date'] = pd.to_datetime(h2h['_date'])
    h2h = h2h.sort_values(by='_date', ascending=False).head(5)

    results = []
    for _, row in h2h.iterrows():
              results.append({
            "date": str(row['_date'].date()),
            "home_team": row['_home_team'],
            "away_team": row['_away_team'],
            "home_goals": int(row['home_goals']),
            "away_goals": int(row['away_goals']),
            "tournament": row['_tournament']
        })
    return results

