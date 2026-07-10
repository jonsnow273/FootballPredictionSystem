from pydantic import BaseModel
from typing import Optional


class PredictionResponse(BaseModel):
    home_team: str
    away_team: str
    predicted_home_goals: int
    predicted_away_goals: int
    probability: float


class H2HMatch(BaseModel):
    date: str
    home_team: str
    away_team: str
    home_goals: int
    away_goals: int
    tournament: str


class NoH2HDataResponse(BaseModel):
    message: str


class Fixture(BaseModel):
    home_team: str
    away_team: str
    home_crest: Optional[str] = None
    away_crest: Optional[str] = None
    date: str
    competition: str
    status: str
    actual_home_goals: Optional[int] = None
    actual_away_goals: Optional[int] = None


class FixturesResponse(BaseModel):
    upcoming: list[Fixture]
    past: list[Fixture]