from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os 
import sys

# lets backend import model from predict file

sys.path.append(os.path.join(os.path.dirname("__file__"), '..'))

from model.predict import predict_score

app = FastAPI()

# allows frontend to call the backend 

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_headers = ["*"],
    allow_methods = ["*"],
)

@app.get("/")
def root():
    return{"message":"football prediction api is running"}

# predict.py

@app.get("/predict")
def predict(home_team: str, away_team: str, is_neutral: int = 0, is_world_cup: int = 0, is_continental: int = 0):
    home_g, away_g, probs = predict_score(home_team, away_team, is_neutral, is_world_cup, is_continental)
    try:
         home_g, away_g, probs = predict_score(home_team, away_team, is_neutral, is_world_cup, is_continental)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    return{
        "home_team" : home_team,
        "away_team" : away_team,
        "predicted_home_goals" : home_g,
        "predicted_away_goals" : away_g,
        "probability" : round(probs * 100, 1)
    }

from backend.fixtures import get_fixtures

# fixtures.py

@app.get("/fixtures")
def fixtures():
    return get_fixtures()


from backend.h2h import get_h2h

# h2h.py

@app.get("/h2h")
def h2h(team1 : str, team2 : str):
    return get_h2h(team1, team2)