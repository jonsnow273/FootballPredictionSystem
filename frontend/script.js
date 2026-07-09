const upcomingContainer = document.getElementById("upcoming-fixtures-container");
const pastContainer = document.getElementById("past-fixtures-container");

const cardTemplate = document.querySelector('.fixtures-card').cloneNode(true);
const pastCardTemplate = document.querySelector('.past-fixtures-card').cloneNode(true);

function showSkeletons(container, count = 3) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-card';
        container.appendChild(skeleton);
    }
}

function revealCard(card, index) {
    setTimeout(() => {
        card.classList.add('show');
    }, index * 60);
}

function buildUpcomingCard(match) {
    const card = cardTemplate.cloneNode(true);

    card.querySelector(".home-team").textContent = match.home_team;
    card.querySelector(".away-team").textContent = match.away_team;
    card.querySelector(".home-logo").src = match.home_crest;
    card.querySelector(".away-logo").src = match.away_crest;

    const predictBtn = card.querySelector(".btn");
    predictBtn.addEventListener("click", async () => {
        predictBtn.classList.add("loading");
        try {
            const predictUrl = `http://localhost:8000/predict?home_team=${encodeURIComponent(match.home_team)}&away_team=${encodeURIComponent(match.away_team)}`;
            const response = await fetch(predictUrl);

            if (!response.ok) {
                throw new Error(`Prediction failed (${response.status})`);
            }

            const predictData = await response.json();
            predictBtn.textContent = `${predictData.predicted_home_goals} - ${predictData.predicted_away_goals}`;
        } catch (err) {
            predictBtn.textContent = "N/A";
        } finally {
            predictBtn.classList.remove("loading");
            predictBtn.disabled = true;
        }
    });

    return card;
}

async function buildPastCard(match) {
    const card = pastCardTemplate.cloneNode(true);

    card.querySelector(".home-team-result").textContent = match.home_team;
    card.querySelector(".away-team-result").textContent = match.away_team;
    card.querySelector(".home-logo-past").src = match.home_crest;
    card.querySelector(".away-team-logo").src = match.away_crest;
    card.querySelector(".home-team-score").textContent = match.actual_home_goals;
    card.querySelector(".away-team-score").textContent = match.actual_away_goals;

    try {
        const predictUrl = `http://localhost:8000/predict?home_team=${encodeURIComponent(match.home_team)}&away_team=${encodeURIComponent(match.away_team)}`;
        const predictResponse = await fetch(predictUrl);

        if (!predictResponse.ok) {
            throw new Error(`Prediction failed (${predictResponse.status})`);
        }

        const predictData = await predictResponse.json();
        card.querySelector(".PredictedScore").textContent =
            `${predictData.predicted_home_goals} - ${predictData.predicted_away_goals}`;
    } catch (err) {
        card.querySelector(".PredictedScore").textContent = "N/A";
    }

    return card;
}

async function getFixtures() {
    showSkeletons(upcomingContainer, 3);
    showSkeletons(pastContainer, 3);

    let data;
    try {
        const response = await fetch("http://localhost:8000/fixtures");
        if (!response.ok) {
            throw new Error(`Fixtures request failed (${response.status})`);
        }
        data = await response.json();
    } catch (err) {
        upcomingContainer.innerHTML = `<p>Could not load fixtures. Is the backend running?</p>`;
        pastContainer.innerHTML = '';
        console.error(err);
        return;
    }

    console.log(data);

    upcomingContainer.innerHTML = '';
    data.upcoming.forEach((match, index) => {
        const card = buildUpcomingCard(match);
        upcomingContainer.appendChild(card);
        revealCard(card, index);
    });

    pastContainer.innerHTML = '';
    let index = 0;
    for (const match of data.past) {
        const card = await buildPastCard(match);
        pastContainer.appendChild(card);
        revealCard(card, index);
        index++;
    }
}

getFixtures();

document.getElementById("past-tab-btn").addEventListener("click", () => {
    pastContainer.style.display = "block";
    upcomingContainer.style.display = "none";
    document.getElementById("past-tab-btn").classList.add("active");
    document.getElementById("upcoming-tab-btn").classList.remove("active");
});

document.getElementById("upcoming-tab-btn").addEventListener("click", () => {
    pastContainer.style.display = "none";
    upcomingContainer.style.display = "block";
    document.getElementById("upcoming-tab-btn").classList.add("active");
    document.getElementById("past-tab-btn").classList.remove("active");
});