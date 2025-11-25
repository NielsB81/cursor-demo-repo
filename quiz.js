// Midnight Kebab House Flavor Quiz

const globalStats = {
    totalQuizzesTaken: 0,
    personalityDistribution: {
        doner: 0,
        chicken_wrap: 0,
        falafel: 0
    },
    impactStats: {
        ordersShared: 0,
        sauceLevel: 0,
        playlistsQueued: 0
    }
};

const quizQuestions = [
    {
        question: "How do you kick off a release-night session?",
        options: [
            { text: "Sync the squad, review the plan, stay zen", personality: "doner", impact: "steadyFlow" },
            { text: "Light the fire, tackle blockers head-on", personality: "chicken_wrap", impact: "fireStarter" },
            { text: "Check vibes, share snacks, boost morale", personality: "falafel", impact: "teamCaptain" }
        ],
        fact: "Late-night focus hits different when you match food energy to squad energy."
    },
    {
        question: "Pick your ideal collaboration style:",
        options: [
            { text: "Deep work with crisp status updates", personality: "doner", impact: "calmAnchor" },
            { text: "Pair-programming marathons with spicy banter", personality: "chicken_wrap", impact: "boldMoves" },
            { text: "Facilitate, mediate, and keep everyone hydrated", personality: "falafel", impact: "comfortGuardian" }
        ],
        fact: "Teams ship faster when someone owns the energy in the room."
    },
    {
        question: "What soundtrack keeps you locked in?",
        options: [
            { text: "Lo-fi beats & mint tea", personality: "doner", impact: "vibeCurator" },
            { text: "Bass-heavy drops that rattle the monitors", personality: "chicken_wrap", impact: "adrenaline" },
            { text: "Eclectic mix + crowd pleasers for drive-by singalongs", personality: "falafel", impact: "socialSpark" }
        ],
        fact: "Music changes how we taste food and how we debug."
    },
    {
        question: "Production is on fire. What happens next?",
        options: [
            { text: "Triage, prioritize, keep commits atomic", personality: "doner", impact: "dataDriven" },
            { text: "Grab the torch, deploy hotfixes, own the aftermath", personality: "chicken_wrap", impact: "speedRunner" },
            { text: "Rally the crew, communicate, celebrate the win", personality: "falafel", impact: "communityHero" }
        ],
        fact: "Every outage needs a calm strategist, a fearless sprinter, and a people-first anchor."
    }
];

const kebabPersonalities = {
    doner: {
        name: "Calm Döner Strategist",
        description: "You’re the steady flame on the rotisserie—consistent, reliable, and quietly powerful. People lean on you when chaos hits.",
        combos: ["Night Shift Duo", "Street Feast Platter"],
        powerUps: [
            "Prep mise en place before crunch time",
            "Keep mint ayran chilled for the crew",
            "Serve patch notes with garlic yogurt smoothness"
        ],
        nightImpact: {
            positive: "You bring structure to shipping marathons and never skip documentation.",
            action: "Share your checklists so the rest of the team can coast on your calm energy."
        },
        tip: getCurrentSeasonTip('doner')
    },
    chicken_wrap: {
        name: "Spicy Wrap Instigator",
        description: "Bold, fast, and a little reckless—in the best way. You add heat to every standup and love turning blockers into momentum.",
        combos: ["Night Shift Duo", "Grill Party"],
        powerUps: [
            "Rotate playlists to keep adrenaline high",
            "Pair deployments with extra chili oil",
            "Lead the hype when new features land"
        ],
        nightImpact: {
            positive: "Your energy keeps tickets moving and bugs afraid.",
            action: "Channel that spice into focused bursts so the squad can draft behind you."
        },
        tip: getCurrentSeasonTip('chicken_wrap')
    },
    falafel: {
        name: "Falafel Heartbeat",
        description: "You’re crispy on the outside, all empathy inside. You balance teams, notice burnout, and make sure everyone eats.",
        combos: ["Veggie Crush", "Street Feast Platter"],
        powerUps: [
            "Schedule hydration breaks",
            "Stack loyalty stamps for the squad",
            "Keep tahini and bug tracker comments flowing"
        ],
        nightImpact: {
            positive: "You make overnight launches feel human.",
            action: "Keep checking in—your softness is the best uptime insurance."
        },
        tip: getCurrentSeasonTip('falafel')
    }
};

let currentQuestion = 0;
let personalityScores = {
    doner: 0,
    chicken_wrap: 0,
    falafel: 0
};
let impactScore = 0;

function getCurrentSeasonTip(persona) {
    const tips = {
        doner: "Pair each commit with a sip of mint ayran to keep that calm streak alive.",
        chicken_wrap: "Balance the heat: spicy wrap in one hand, rollback plan in the other.",
        falafel: "Prep extra tahini—someone always needs a morale boost around 2 AM."
    };
    return tips[persona];
}

function startQuiz() {
    currentQuestion = 0;
    personalityScores = { doner: 0, chicken_wrap: 0, falafel: 0 };
    impactScore = 0;
    displayQuestion();
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-questions').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
}

function displayQuestion() {
    const questionContainer = document.getElementById('quiz-questions');
    const question = quizQuestions[currentQuestion];
    
    questionContainer.innerHTML = `
        <h3>Question ${currentQuestion + 1} of ${quizQuestions.length}</h3>
        <p class="question">${question.question}</p>
        <div class="fun-fact">${question.fact}</div>
        <div class="options">
            ${question.options.map((option, index) => `
                <button onclick="selectOption('${option.personality}', '${option.impact}')" class="quiz-option">
                    ${option.text}
                </button>
            `).join('')}
        </div>
        <div class="quiz-progress">
            <div class="progress-bar" style="width: ${(currentQuestion + 1) / quizQuestions.length * 100}%"></div>
        </div>
    `;
}

function selectOption(personality, impact) {
    personalityScores[personality]++;
    impactScore += calculateImpactScore(impact);
    
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        updateGlobalStats();
        showResult();
    }
}

function calculateImpactScore(impact) {
    const impactScores = {
        steadyFlow: 18,
        fireStarter: 22,
        teamCaptain: 16,
        calmAnchor: 17,
        boldMoves: 23,
        comfortGuardian: 15,
        vibeCurator: 14,
        adrenaline: 19,
        socialSpark: 18,
        dataDriven: 20,
        speedRunner: 24,
        communityHero: 16
    };
    return impactScores[impact] || 0;
}

function updateGlobalStats() {
    globalStats.totalQuizzesTaken++;
    const result = Object.entries(personalityScores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    globalStats.personalityDistribution[result]++;
    
    globalStats.impactStats.ordersShared += Math.floor(impactScore / 40);
    globalStats.impactStats.sauceLevel += Math.round(impactScore * 1.5);
    globalStats.impactStats.playlistsQueued += Math.floor(impactScore / 8);
}

function showResult() {
    const result = Object.entries(personalityScores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    const personality = kebabPersonalities[result];
    const resultContainer = document.getElementById('quiz-result');
    
    document.getElementById('quiz-questions').style.display = 'none';
    resultContainer.style.display = 'block';
    
    resultContainer.innerHTML = `
        <h2>Your Kebab Persona: ${personality.name}!</h2>
        <p class="personality-description">${personality.description}</p>
        
        <div class="impact-section">
            <h3>🌙 Your Night Shift Energy</h3>
            <p>${personality.nightImpact.positive}</p>
            <p class="impact-action">👉 ${personality.nightImpact.action}</p>
            <div class="impact-stats">
                <div class="impact-stat">
                    <span class="impact-number">+${Math.floor(impactScore / 40)}</span>
                    <span class="impact-label">Orders Shared</span>
                </div>
                <div class="impact-stat">
                    <span class="impact-number">${Math.round(impactScore * 1.5)}</span>
                    <span class="impact-label">Sauce Drizzles</span>
                </div>
                <div class="impact-stat">
                    <span class="impact-number">${Math.floor(impactScore / 8)}</span>
                    <span class="impact-label">Playlists Queued</span>
                </div>
            </div>
        </div>

        <div class="health-section">
            <h3>🔧 Power-Ups</h3>
            <ul>
                ${personality.powerUps.map(tip => `
                    <li>${tip}</li>
                `).join('')}
            </ul>
        </div>

        <div class="seasonal-section">
            <h3>🍽 Pro Tip</h3>
            <p>${personality.tip}</p>
        </div>

        <div class="recommendations">
            <h3>🎁 Recommended Combos:</h3>
            <ul>
                ${personality.combos.map(bundle => `
                    <li><a href="bundles.html">${bundle}</a></li>
                `).join('')}
            </ul>
        </div>

        <div class="global-impact">
            <h3>🌎 Join the Late-Night Table</h3>
            <p>You're part of the crew keeping Utrecht fueled after midnight.</p>
            <div class="global-stats">
                <div class="stat">
                    <span class="number">${globalStats.totalQuizzesTaken}</span>
                    <span class="label">Personas Claimed</span>
                </div>
                <div class="stat">
                    <span class="number">${globalStats.impactStats.ordersShared}</span>
                    <span class="label">Orders Shared</span>
                </div>
                <div class="stat">
                    <span class="number">${globalStats.impactStats.playlistsQueued}</span>
                    <span class="label">Playlists Queued</span>
                </div>
            </div>
        </div>

        <div class="share-section">
            <h3>📢 Share Your Impact</h3>
            <p>Drop your persona on social and flex your midnight appetite.</p>
            <div class="share-buttons">
                <button onclick="shareResult('twitter')" class="share-button twitter">Share on Twitter</button>
                <button onclick="shareResult('facebook')" class="share-button facebook">Share on Facebook</button>
            </div>
        </div>

        <button onclick="startQuiz()" class="retry-button">Take Quiz Again</button>
    `;
}

function shareResult(platform) {
    const result = Object.entries(personalityScores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    const personality = kebabPersonalities[result];
    const shareText = `I'm a ${personality.name} at Midnight Kebab House 🌙🔥 Find your late-night kebab persona and keep the grill vibes going! #KebabPersonality #MidnightKebabHouse`;
    
    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`
    };
    
    window.open(shareUrls[platform], '_blank');
} 