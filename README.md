# ⚽ Football Match Score Predictor

A web app that predicts football match scores using historical data and a Poisson regression model. Pulls live upcoming fixtures from a football API, predicts the most likely scoreline for each match, and displays results through a simple web interface.

## How It Works

1. **Training (offline, one-time):** A Poisson regression model is trained on historical match data to learn each team's attack and defense strength.
2. **Fixtures:** The backend fetches upcoming real-world matches (Champions League, Premier League, La Liga, etc.) from the football-data.org API.
3. **Prediction:** For each fixture, the model calculates expected goals for both teams and converts that into a probability distribution over possible scorelines using the Poisson distribution.
4. **Frontend:** Displays upcoming matches with their predicted scores and probabilities.

## Tech Stack

| Layer | Tools |
|---|---|
| Model | scikit-learn (`PoissonRegressor`), scipy |
| Data handling | pandas, numpy |
| Backend | FastAPI, uvicorn, pydantic |
| External data | football-data.org API |
| Frontend | HTML, CSS, JavaScript |
| Model persistence | joblib |

## Project Structure
