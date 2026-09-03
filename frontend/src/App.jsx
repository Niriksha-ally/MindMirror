import { useEffect, useMemo, useState } from "react";
import "./App.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API = "http://localhost:5000/api";

// =====================================================
// HOME
// =====================================================

function Home({ setPage }) {
  return (
    <main className="container home-page">

      <section className="hero">

        <div className="hero-text">

          <p className="small-title">
            PERSONAL WELLBEING ANALYZER
          </p>

          <h1>
            Understand yourself,
            <br />
            one day at a time.
          </h1>

          <p className="hero-description">
            MindMirror helps you track your mood, stress,
            energy and sleep and understand how your daily
            habits affect your wellbeing.
          </p>

          <div className="hero-buttons">

            <button
              className="main-button"
              onClick={() => setPage("checkin")}
            >
              Start Today's Check-in →
            </button>

            <button
              className="secondary-button"
              onClick={() => setPage("dashboard")}
            >
              View Dashboard
            </button>

          </div>

        </div>

        <div className="hero-card">

          <div className="hero-icon">
            🌿
          </div>

          <h2>
            Track → Analyze → Discover → Reflect
          </h2>

          <p>
            Turn your everyday wellbeing data into
            simple and meaningful personal insights.
          </p>

        </div>

      </section>


      {/* SIMPLE FEATURES */}

      <section className="features">

        <div className="feature">

          <span>📊</span>

          <h3>Track</h3>

          <p>
            Record your mood, stress, energy,
            sleep and daily goals.
          </p>

        </div>


        <div className="feature">

          <span>🔍</span>

          <h3>Discover</h3>

          <p>
            See patterns and changes in your
            personal wellbeing.
          </p>

        </div>


        <div className="feature">

          <span>📔</span>

          <h3>Reflect</h3>

          <p>
            Keep a private diary to understand
            your thoughts and experiences.
          </p>

        </div>

      </section>

    </main>
  );
}


// =====================================================
// DASHBOARD
// =====================================================

function Dashboard({
  mood,
  stress,
  energy,
  sleep,
  summary,
  pattern,
  checkIns,
  setPage,
}) {

  const streak = calculateStreak(checkIns);

  const latestGoal =
    checkIns.length > 0
      ? checkIns[checkIns.length - 1].goal
      : "";

  const completedGoals = checkIns.filter(
    (item) => item.goalCompleted
  ).length;

  const goalRate =
    checkIns.length > 0
      ? Math.round((completedGoals / checkIns.length) * 100)
      : 0;

  return (
    <main className="container">

      <div className="page-title">

        <p className="small-title">
          YOUR WELLBEING
        </p>

        <h1>Dashboard</h1>

        <p>
          A simple overview of your wellbeing and
          personal progress.
        </p>

      </div>


      {/* CURRENT VALUES */}

      <div className="cards">

        <MetricCard
          icon="🙂"
          title="Mood"
          value={`${mood}/10`}
          text="Today's level"
        />

        <MetricCard
          icon="😟"
          title="Stress"
          value={`${stress}/10`}
          text="Today's level"
        />

        <MetricCard
          icon="⚡"
          title="Energy"
          value={`${energy}/10`}
          text="Today's level"
        />

        <MetricCard
          icon="🌙"
          title="Sleep"
          value={`${sleep} hrs`}
          text="Last recorded"
        />

      </div>


      {/* QUICK STATS */}

      <section className="quick-stats">

        <div className="quick-stat">
          <span>🔥</span>
          <div>
            <strong>{streak}</strong>
            <small>Day streak</small>
          </div>
        </div>

        <div className="quick-stat">
          <span>📝</span>
          <div>
            <strong>{checkIns.length}</strong>
            <small>Total check-ins</small>
          </div>
        </div>

        <div className="quick-stat">
          <span>🎯</span>
          <div>
            <strong>{goalRate}%</strong>
            <small>Goals completed</small>
          </div>
        </div>

      </section>


      {/* AVERAGES */}

      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <p className="section-label">YOUR DATA</p>

            <h2>📊 Personal Averages</h2>
          </div>

          <span className="data-count">
            {checkIns.length} entries
          </span>

        </div>

        <div className="average-grid">

          <div>
            <span>Mood</span>
            <strong>{summary.mood}/10</strong>
          </div>

          <div>
            <span>Stress</span>
            <strong>{summary.stress}/10</strong>
          </div>

          <div>
            <span>Energy</span>
            <strong>{summary.energy}/10</strong>
          </div>

          <div>
            <span>Sleep</span>
            <strong>{summary.sleep} hrs</strong>
          </div>

        </div>

      </section>


      {/* GRAPH */}

      <WellbeingChart checkIns={checkIns} />


      {/* GOAL */}

      <section className="dashboard-section goal-section">

        <div>

          <p className="section-label">
            TODAY'S GOAL
          </p>

          <h2>🎯 {latestGoal || "No goal added yet"}</h2>

          <p>
            {latestGoal
              ? "Keep working towards your daily goal."
              : "Add a goal during your next check-in."}
          </p>

        </div>

        <button
          className="secondary-button"
          onClick={() => setPage("checkin")}
        >
          {latestGoal ? "Update Goal" : "Add Goal"}
        </button>

      </section>


      {/* PERSONAL INSIGHT */}

      <section className="dashboard-section insight-box">

        <p className="section-label">
          PERSONAL ANALYSIS
        </p>

        <h2>💡 What MindMirror noticed</h2>

        <p className="big-insight">
          {pattern}
        </p>

        <small>
          These observations are based only on the
          information you enter into MindMirror.
          They are not medical diagnoses.
        </small>

      </section>


      {/* WEEKLY SUMMARY */}

      <WeeklySummary checkIns={checkIns} />

    </main>
  );
}


// =====================================================
// METRIC CARD
// =====================================================

function MetricCard({ icon, title, value, text }) {
  return (
    <div className="card">

      <div className="card-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p className="card-value">
        {value}
      </p>

      <span>{text}</span>

    </div>
  );
}


// =====================================================
// GRAPH
// =====================================================

function WellbeingChart({ checkIns }) {

  const recent = checkIns.slice(-7);

  const labels = recent.map((item) =>
    item.createdAt
      ? new Date(item.createdAt).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
          }
        )
      : "Day"
  );

  const data = {

    labels,

    datasets: [

      {
        label: "Mood",
        data: recent.map((item) => Number(item.mood)),
        borderColor: "#eab308",
        backgroundColor: "#eab308",
        tension: 0.35,
      },

      {
        label: "Stress",
        data: recent.map((item) => Number(item.stress)),
        borderColor: "#ef4444",
        backgroundColor: "#ef4444",
        tension: 0.35,
      },

      {
        label: "Energy",
        data: recent.map((item) => Number(item.energy)),
        borderColor: "#22c55e",
        backgroundColor: "#22c55e",
        tension: 0.35,
      },

      {
        label: "Sleep",
        data: recent.map((item) =>
          Math.min(Number(item.sleep), 10)
        ),
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.35,
      },

    ],
  };


  const options = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {
        position: "bottom",
      },

      title: {
        display: false,
      },

      tooltip: {
        mode: "index",
        intersect: false,
      },

    },

    scales: {

      y: {
        beginAtZero: true,
        max: 10,

        title: {
          display: true,
          text: "Wellbeing level",
        },
      },

      x: {
        title: {
          display: true,
          text: "Recent days",
        },
      },

    },

  };


  return (

    <section className="dashboard-section">

      <div className="section-heading">

        <div>

          <p className="section-label">
            LAST 7 ENTRIES
          </p>

          <h2>📈 Wellbeing Trends</h2>

        </div>

      </div>


      {recent.length < 2 ? (

        <div className="chart-empty">

          <div>📈</div>

          <h3>Not enough data yet</h3>

          <p>
            Add at least two check-ins to see
            your wellbeing trends.
          </p>

        </div>

      ) : (

        <div className="chart-container">
          <Line data={data} options={options} />
        </div>

      )}

    </section>

  );
}


// =====================================================
// WEEKLY SUMMARY
// =====================================================

function WeeklySummary({ checkIns }) {

  const recent = checkIns.slice(-7);

  if (recent.length === 0) {
    return (
      <section className="dashboard-section weekly-section">

        <p className="section-label">
          WEEKLY REFLECTION
        </p>

        <h2>🌱 Your week</h2>

        <p>
          Start checking in each day to build
          your first weekly summary.
        </p>

      </section>
    );
  }


  const averageMood =
    recent.reduce(
      (sum, item) => sum + Number(item.mood),
      0
    ) / recent.length;


  const averageStress =
    recent.reduce(
      (sum, item) => sum + Number(item.stress),
      0
    ) / recent.length;


  const averageSleep =
    recent.reduce(
      (sum, item) => sum + Number(item.sleep),
      0
    ) / recent.length;


  let message = "Your week is building up.";

  if (averageMood >= 7 && averageStress <= 4) {
    message =
      "Your recent wellbeing looks positive, with good mood and manageable stress.";
  } else if (averageStress >= 7) {
    message =
      "Your recent stress level has been relatively high. Take some time to rest and reflect.";
  } else if (averageSleep < 6) {
    message =
      "Your recent sleep has been lower than 6 hours on average. Notice how this affects your energy and mood.";
  } else if (averageMood < 5) {
    message =
      "Your recent mood has been lower than usual. Your diary may help you understand what has been affecting you.";
  } else {
    message =
      "Your recent wellbeing looks fairly balanced. Keep checking in to understand your patterns over time.";
  }


  return (

    <section className="dashboard-section weekly-section">

      <p className="section-label">
        LAST 7 CHECK-INS
      </p>

      <h2>🌱 Weekly Reflection</h2>

      <div className="weekly-grid">

        <div>
          <span>Average mood</span>
          <strong>
            {averageMood.toFixed(1)}/10
          </strong>
        </div>

        <div>
          <span>Average stress</span>
          <strong>
            {averageStress.toFixed(1)}/10
          </strong>
        </div>

        <div>
          <span>Average sleep</span>
          <strong>
            {averageSleep.toFixed(1)} hrs
          </strong>
        </div>

      </div>

      <div className="weekly-message">
        💬 {message}
      </div>

    </section>

  );
}


// =====================================================
// CHECK-IN
// =====================================================

function CheckIn({
  mood,
  setMood,
  stress,
  setStress,
  energy,
  setEnergy,
  sleep,
  setSleep,
  goal,
  setGoal,
  goalCompleted,
  setGoalCompleted,
  saveCheckIn,
}) {

  return (

    <main className="container">

      <div className="page-title">

        <p className="small-title">
          DAILY REFLECTION
        </p>

        <h1>Daily Check-in</h1>

        <p>
          Take a moment to record how you feel today.
        </p>

      </div>


      <section className="checkin-box">

        <form onSubmit={saveCheckIn}>

          {/* MOOD */}

          <div className="slider-group">

            <label>

              <span>🙂 Mood</span>

              <strong>{mood}/10</strong>

            </label>

            <input
              type="range"
              min="1"
              max="10"
              value={mood}
              onChange={(event) =>
                setMood(Number(event.target.value))
              }
            />

          </div>


          {/* STRESS */}

          <div className="slider-group">

            <label>

              <span>😟 Stress</span>

              <strong>{stress}/10</strong>

            </label>

            <input
              type="range"
              min="1"
              max="10"
              value={stress}
              onChange={(event) =>
                setStress(Number(event.target.value))
              }
            />

          </div>


          {/* ENERGY */}

          <div className="slider-group">

            <label>

              <span>⚡ Energy</span>

              <strong>{energy}/10</strong>

            </label>

            <input
              type="range"
              min="1"
              max="10"
              value={energy}
              onChange={(event) =>
                setEnergy(Number(event.target.value))
              }
            />

          </div>


          {/* SLEEP */}

          <div className="input-group">

            <label>
              🌙 Sleep (hours)
            </label>

            <input
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={sleep}
              onChange={(event) =>
                setSleep(event.target.value)
              }
            />

          </div>


          {/* GOAL */}

          <div className="input-group">

            <label>
              🎯 Today's Goal
            </label>

            <input
              type="text"
              placeholder="Example: Study for 1 hour"
              value={goal}
              onChange={(event) =>
                setGoal(event.target.value)
              }
            />

          </div>


          {/* GOAL COMPLETION */}

          <label className="goal-check">

            <input
              type="checkbox"
              checked={goalCompleted}
              onChange={(event) =>
                setGoalCompleted(event.target.checked)
              }
            />

            <span>
              I completed today's goal
            </span>

          </label>


          <button
            className="main-button full-button"
            type="submit"
          >
            Save Check-in
          </button>

        </form>

      </section>

    </main>
  );
}


// =====================================================
// DIARY
// =====================================================

function Diary({
  diary,
  setDiary,
  diaryEntries,
  saveDiary,
}) {

  const [search, setSearch] = useState("");

  const filteredEntries = diaryEntries.filter((entry) =>
    entry.text
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  return (

    <main className="container">

      <div className="page-title">

        <p className="small-title">
          PERSONAL SPACE
        </p>

        <h1>My Diary</h1>

        <p>
          Write down your thoughts and experiences.
        </p>

      </div>


      <section className="diary-box">

        <h2>✍️ Today's Entry</h2>

        <form onSubmit={saveDiary}>

          <textarea
            value={diary}
            onChange={(event) =>
              setDiary(event.target.value)
            }
            placeholder="How was your day? What are you thinking about?"
          />

          <button
            className="main-button"
            type="submit"
          >
            Save Diary Entry
          </button>

        </form>

      </section>


      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <p className="section-label">
              YOUR JOURNAL
            </p>

            <h2>📔 Previous Entries</h2>
          </div>

          {diaryEntries.length > 0 && (

            <input
              className="search-input"
              type="text"
              placeholder="Search diary..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          )}

        </div>


        {filteredEntries.length === 0 ? (

          <p className="empty">
            {diaryEntries.length === 0
              ? "No diary entries yet."
              : "No entries match your search."}
          </p>

        ) : (

          filteredEntries.map((entry) => (

            <div
              className="diary-entry"
              key={entry._id}
            >

              <span>
                {entry.createdAt
                  ? new Date(
                      entry.createdAt
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Today"}
              </span>

              <p>{entry.text}</p>

            </div>

          ))

        )}

      </section>

    </main>
  );
}


// =====================================================
// HISTORY
// =====================================================

function History({ checkIns, pattern }) {

  return (

    <main className="container">

      <div className="page-title">

        <p className="small-title">
          YOUR DATA
        </p>

        <h1>Check-in History</h1>

        <p>
          Look back at your previous wellbeing
          check-ins.
        </p>

      </div>


      <section className="dashboard-section">

        {checkIns.length === 0 ? (

          <p className="empty">
            No check-ins yet.
          </p>

        ) : (

          [...checkIns]
            .reverse()
            .map((checkIn) => (

              <div
                className="history-card"
                key={checkIn._id}
              >

                <div>
                  <span>Date</span>

                  <strong>
                    {checkIn.createdAt
                      ? new Date(
                          checkIn.createdAt
                        ).toLocaleDateString("en-IN")
                      : "Today"}
                  </strong>
                </div>

                <div>
                  <span>Mood</span>

                  <strong>
                    🙂 {checkIn.mood}/10
                  </strong>
                </div>

                <div>
                  <span>Stress</span>

                  <strong>
                    😟 {checkIn.stress}/10
                  </strong>
                </div>

                <div>
                  <span>Energy</span>

                  <strong>
                    ⚡ {checkIn.energy}/10
                  </strong>
                </div>

                <div>
                  <span>Sleep</span>

                  <strong>
                    🌙 {checkIn.sleep} hrs
                  </strong>
                </div>

                <div className="history-goal">

                  <span>Goal</span>

                  <strong>
                    🎯 {checkIn.goal || "No goal"}
                  </strong>

                  {checkIn.goal && (
                    <small className={
                      checkIn.goalCompleted
                        ? "goal-done"
                        : "goal-pending"
                    }>
                      {checkIn.goalCompleted
                        ? "✓ Completed"
                        : "○ Not completed"}
                    </small>
                  )}

                </div>

              </div>

            ))

        )}

      </section>


      <section className="dashboard-section insight-box">

        <p className="section-label">
          PERSONAL PATTERN
        </p>

        <h2>🔍 What your data shows</h2>

        <p className="big-insight">
          {pattern}
        </p>

        <small>
          MindMirror provides personal wellbeing
          observations and is not a replacement
          for professional medical care.
        </small>

      </section>

    </main>
  );
}


// =====================================================
// HELPER - STREAK
// =====================================================

function calculateStreak(checkIns) {

  if (checkIns.length === 0) {
    return 0;
  }

  const dates = [
    ...new Set(
      checkIns.map((item) =>
        new Date(item.createdAt || Date.now())
          .toISOString()
          .split("T")[0]
      )
    ),
  ].sort().reverse();


  let streak = 1;


  for (let i = 0; i < dates.length - 1; i++) {

    const current = new Date(dates[i]);
    const previous = new Date(dates[i + 1]);

    const difference =
      (current - previous) /
      (1000 * 60 * 60 * 24);

    if (difference === 1) {
      streak++;
    } else {
      break;
    }

  }

  return streak;
}


// =====================================================
// MAIN APP
// =====================================================

function App() {

  const [page, setPage] = useState("home");

  const [mood, setMood] = useState(5);
  const [stress, setStress] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [sleep, setSleep] = useState(7);
  const [goal, setGoal] = useState("");
  const [goalCompleted, setGoalCompleted] = useState(false);

  const [checkIns, setCheckIns] = useState([]);

  const [diary, setDiary] = useState("");
  const [diaryEntries, setDiaryEntries] = useState([]);

  const [summary, setSummary] = useState({
    mood: 0,
    stress: 0,
    energy: 0,
    sleep: 0,
  });

  const [pattern, setPattern] = useState(
    "Keep adding check-ins to discover your personal patterns."
  );


  // =====================================================
  // GET CHECK-INS
  // =====================================================

  async function getCheckIns() {

    try {

      const response = await fetch(
        `${API}/checkins`
      );

      const data = await response.json();

      setCheckIns(data);

      calculateSummary(data);
      findPattern(data);


      if (data.length > 0) {

        const latest = data[data.length - 1];

        setMood(Number(latest.mood));
        setStress(Number(latest.stress));
        setEnergy(Number(latest.energy));
        setSleep(Number(latest.sleep));

        setGoal(latest.goal || "");
        setGoalCompleted(
          Boolean(latest.goalCompleted)
        );

      }

    } catch (error) {

      console.log(
        "Error getting check-ins:",
        error
      );

    }

  }


  // =====================================================
  // SUMMARY
  // =====================================================

  function calculateSummary(data) {

    if (data.length === 0) {

      setSummary({
        mood: 0,
        stress: 0,
        energy: 0,
        sleep: 0,
      });

      return;
    }


    let totalMood = 0;
    let totalStress = 0;
    let totalEnergy = 0;
    let totalSleep = 0;


    data.forEach((item) => {

      totalMood += Number(item.mood);
      totalStress += Number(item.stress);
      totalEnergy += Number(item.energy);
      totalSleep += Number(item.sleep);

    });


    setSummary({

      mood: (
        totalMood / data.length
      ).toFixed(1),

      stress: (
        totalStress / data.length
      ).toFixed(1),

      energy: (
        totalEnergy / data.length
      ).toFixed(1),

      sleep: (
        totalSleep / data.length
      ).toFixed(1),

    });

  }


  // =====================================================
  // PATTERN DETECTION
  // =====================================================

  function findPattern(data) {

    if (data.length < 2) {

      setPattern(
        "Keep adding check-ins to discover your personal patterns."
      );

      return;

    }


    let lowSleepHighStress = 0;
    let lowSleepLowEnergy = 0;
    let highStressLowMood = 0;


    data.forEach((item) => {

      const itemSleep = Number(item.sleep);
      const itemStress = Number(item.stress);
      const itemEnergy = Number(item.energy);
      const itemMood = Number(item.mood);


      if (
        itemSleep < 6 &&
        itemStress >= 7
      ) {
        lowSleepHighStress++;
      }


      if (
        itemSleep < 6 &&
        itemEnergy <= 4
      ) {
        lowSleepLowEnergy++;
      }


      if (
        itemStress >= 7 &&
        itemMood <= 4
      ) {
        highStressLowMood++;
      }

    });


    if (lowSleepHighStress > 0) {

      setPattern(
        `On ${lowSleepHighStress} recorded day${
          lowSleepHighStress > 1 ? "s" : ""
        }, lower sleep was accompanied by higher stress.`
      );

    } else if (lowSleepLowEnergy > 0) {

      setPattern(
        `On ${lowSleepLowEnergy} recorded day${
          lowSleepLowEnergy > 1 ? "s" : ""
        }, lower sleep was accompanied by lower energy.`
      );

    } else if (highStressLowMood > 0) {

      setPattern(
        `On ${highStressLowMood} recorded day${
          highStressLowMood > 1 ? "s" : ""
        }, higher stress was accompanied by lower mood.`
      );

    } else {

      setPattern(
        "No strong pattern has appeared yet. Keep checking in consistently."
      );

    }

  }


  // =====================================================
  // GET DIARY
  // =====================================================

  async function getDiaryEntries() {

    try {

      const response = await fetch(
        `${API}/diary`
      );

      const data = await response.json();

      setDiaryEntries(data);

    } catch (error) {

      console.log(
        "Error getting diary:",
        error
      );

    }

  }


  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {

    getCheckIns();
    getDiaryEntries();

  }, []);


  // =====================================================
  // SAVE CHECK-IN
  // =====================================================

  async function saveCheckIn(event) {

    event.preventDefault();


    const checkInData = {

      mood: Number(mood),
      stress: Number(stress),
      energy: Number(energy),
      sleep: Number(sleep),
      goal: goal.trim(),
      goalCompleted: goal
        ? goalCompleted
        : false,

    };


    try {

      const response = await fetch(
        `${API}/checkins`,
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(checkInData),

        }
      );


      if (response.ok) {

        alert(
          "Check-in saved successfully! 🌿"
        );

        setGoal("");

        setGoalCompleted(false);

        await getCheckIns();

        setPage("dashboard");

      } else {

        alert(
          "Failed to save check-in."
        );

      }

    } catch (error) {

      console.log(error);

      alert(
        "Cannot connect to the backend."
      );

    }

  }


  // =====================================================
  // SAVE DIARY
  // =====================================================

  async function saveDiary(event) {

    event.preventDefault();


    if (diary.trim() === "") {

      alert(
        "Please write something first."
      );

      return;

    }


    try {

      const response = await fetch(
        `${API}/diary`,
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            text: diary.trim(),
          }),

        }
      );


      if (response.ok) {

        alert(
          "Diary entry saved! 📔"
        );

        setDiary("");

        await getDiaryEntries();

      } else {

        alert(
          "Failed to save diary entry."
        );

      }

    } catch (error) {

      console.log(error);

      alert(
        "Cannot connect to the backend."
      );

    }

  }


  // =====================================================
  // PAGE ROUTING
  // =====================================================

  function showPage() {

    if (page === "home") {

      return (
        <Home
          setPage={setPage}
        />
      );

    }


    if (page === "dashboard") {

      return (
        <Dashboard
          mood={mood}
          stress={stress}
          energy={energy}
          sleep={sleep}
          summary={summary}
          pattern={pattern}
          checkIns={checkIns}
          setPage={setPage}
        />
      );

    }


    if (page === "checkin") {

      return (
        <CheckIn
          mood={mood}
          setMood={setMood}
          stress={stress}
          setStress={setStress}
          energy={energy}
          setEnergy={setEnergy}
          sleep={sleep}
          setSleep={setSleep}
          goal={goal}
          setGoal={setGoal}
          goalCompleted={goalCompleted}
          setGoalCompleted={setGoalCompleted}
          saveCheckIn={saveCheckIn}
        />
      );

    }


    if (page === "diary") {

      return (
        <Diary
          diary={diary}
          setDiary={setDiary}
          diaryEntries={diaryEntries}
          saveDiary={saveDiary}
        />
      );

    }


    if (page === "history") {

      return (
        <History
          checkIns={checkIns}
          pattern={pattern}
        />
      );

    }


    return (
      <Home
        setPage={setPage}
      />
    );

  }


  // =====================================================
  // WEBSITE
  // =====================================================

  return (

    <div className="app">

      <header className="header">

        <div
          className="logo"
          onClick={() => setPage("home")}
        >
          🌿 MindMirror
        </div>


        <nav>

          <button
            className={
              page === "home"
                ? "active"
                : ""
            }
            onClick={() => setPage("home")}
          >
            Home
          </button>


          <button
            className={
              page === "dashboard"
                ? "active"
                : ""
            }
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>


          <button
            className={
              page === "checkin"
                ? "active"
                : ""
            }
            onClick={() => setPage("checkin")}
          >
            Check-in
          </button>


          <button
            className={
              page === "diary"
                ? "active"
                : ""
            }
            onClick={() => setPage("diary")}
          >
            Diary
          </button>


          <button
            className={
              page === "history"
                ? "active"
                : ""
            }
            onClick={() => setPage("history")}
          >
            History
          </button>

        </nav>

      </header>


      {showPage()}


      <footer className="footer">

        <div className="footer-logo">
          🌿 MindMirror
        </div>

        <p>
          Track. Analyze. Discover. Reflect.
        </p>

        <small>
          MindMirror is a personal wellbeing
          tracking tool and is not a replacement
          for professional medical advice.
        </small>

      </footer>

    </div>

  );
}


export default App;