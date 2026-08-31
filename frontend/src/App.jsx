import { useEffect, useState } from "react";
import "./App.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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


// =====================================================
// HOME PAGE
// =====================================================

function Home({ setPage }) {
  return (
    <main className="container home-page">

      {/* HERO */}

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
            MindMirror helps you track your mood,
            stress, energy and sleep and discover
            patterns in your personal wellbeing.
          </p>

          <button
            className="main-button"
            onClick={() => setPage("checkin")}
          >
            Start Today's Check-in →
          </button>

        </div>


        <div className="hero-card">

          <div className="hero-icon">
            🌿
          </div>

          <h2>
            Track → Analyze → Discover → Reflect
          </h2>

          <p>
            Understand your everyday wellbeing
            through your own personal data.
          </p>

        </div>

      </section>


      {/* TRACK / DISCOVER / REFLECT */}

      <section className="features">

        <div className="feature">

          <span>📊</span>

          <h3>
            Track
          </h3>

          <p>
            Record your daily mood, stress,
            energy and sleep.
          </p>

        </div>


        <div className="feature">

          <span>🔍</span>

          <h3>
            Discover
          </h3>

          <p>
            Find simple patterns in your
            personal wellbeing data.
          </p>

        </div>


        <div className="feature">

          <span>📔</span>

          <h3>
            Reflect
          </h3>

          <p>
            Write diary entries and reflect
            on your everyday experiences.
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
  setPage
}) {

  // GRAPH DATA

  const chartData = {
    labels: checkIns.map((checkIn, index) =>
      checkIn.createdAt
        ? new Date(checkIn.createdAt).toLocaleDateString()
        : `Day ${index + 1}`
    ),

    datasets: [

      {
        label: "Mood",
        data: checkIns.map((checkIn) =>
          Number(checkIn.mood)
        ),

        borderColor: "#e5b900",
        backgroundColor: "#e5b900",

        tension: 0.3,
        borderWidth: 3,

        pointRadius: 5,
        pointHoverRadius: 8,

        yAxisID: "wellbeing"
      },


      {
        label: "Stress",
        data: checkIns.map((checkIn) =>
          Number(checkIn.stress)
        ),

        borderColor: "#ef4444",
        backgroundColor: "#ef4444",

        tension: 0.3,
        borderWidth: 3,

        pointRadius: 5,
        pointHoverRadius: 8,

        yAxisID: "wellbeing"
      },


      {
        label: "Energy",
        data: checkIns.map((checkIn) =>
          Number(checkIn.energy)
        ),

        borderColor: "#20a866",
        backgroundColor: "#20a866",

        tension: 0.3,
        borderWidth: 3,

        pointRadius: 5,
        pointHoverRadius: 8,

        yAxisID: "wellbeing"
      },


      {
        label: "Sleep",
        data: checkIns.map((checkIn) =>
          Number(checkIn.sleep)
        ),

        borderColor: "#3198dc",
        backgroundColor: "#3198dc",

        tension: 0.3,
        borderWidth: 3,

        pointRadius: 5,
        pointHoverRadius: 8,

        yAxisID: "sleep"
      }

    ]
  };


  // GRAPH OPTIONS

  const chartOptions = {

    responsive: true,

    maintainAspectRatio: false,

    interaction: {
      mode: "index",
      intersect: false
    },

    plugins: {

      legend: {
        position: "top",

        labels: {
          font: {
            size: 14
          },

          padding: 20
        }
      },

      tooltip: {
        padding: 12,

        titleFont: {
          size: 14
        },

        bodyFont: {
          size: 14
        }
      }
    },

    scales: {

      x: {
        ticks: {
          font: {
            size: 12
          }
        },

        grid: {
          color: "#e8eee9"
        }
      },


      wellbeing: {

        type: "linear",

        position: "left",

        min: 0,

        max: 10,

        title: {
          display: true,
          text: "Mood / Stress / Energy",
          font: {
            size: 13
          }
        },

        ticks: {
          font: {
            size: 12
          }
        },

        grid: {
          color: "#e8eee9"
        }
      },


      sleep: {

        type: "linear",

        position: "right",

        min: 0,

        max: 12,

        title: {
          display: true,
          text: "Sleep (hours)",
          font: {
            size: 13
          }
        },

        ticks: {
          font: {
            size: 12
          }
        },

        grid: {
          drawOnChartArea: false
        }
      }

    }
  };


  return (

    <main className="container">

      {/* PAGE TITLE */}

      <div className="page-title">

        <p className="small-title">
          YOUR WELLBEING
        </p>

        <h1>
          Dashboard
        </h1>

        <p>
          A simple overview of your wellbeing data.
        </p>

      </div>


      {/* CURRENT VALUES */}

      <div className="cards">

        <div className="card">

          <div className="card-icon">
            🙂
          </div>

          <h3>
            Mood
          </h3>

          <p className="card-value">
            {mood}/10
          </p>

          <span>
            Happiness & positivity
          </span>

        </div>


        <div className="card">

          <div className="card-icon">
            😟
          </div>

          <h3>
            Stress
          </h3>

          <p className="card-value">
            {stress}/10
          </p>

          <span>
            Pressure & tension
          </span>

        </div>


        <div className="card">

          <div className="card-icon">
            ⚡
          </div>

          <h3>
            Energy
          </h3>

          <p className="card-value">
            {energy}/10
          </p>

          <span>
            Vitality & activity
          </span>

        </div>


        <div className="card">

          <div className="card-icon">
            🌙
          </div>

          <h3>
            Sleep
          </h3>

          <p className="card-value">
            {sleep} hrs
          </p>

          <span>
            Rest & relaxation
          </span>

        </div>

      </div>


      {/* AVERAGES */}

      <section className="dashboard-section">

        <h2>
          📊 Your Average
        </h2>

        <div className="average-grid">

          <div>
            <span>🙂 Mood</span>
            <strong>{summary.mood}/10</strong>
          </div>

          <div>
            <span>😟 Stress</span>
            <strong>{summary.stress}/10</strong>
          </div>

          <div>
            <span>⚡ Energy</span>
            <strong>{summary.energy}/10</strong>
          </div>

          <div>
            <span>🌙 Sleep</span>
            <strong>{summary.sleep} hrs</strong>
          </div>

        </div>

      </section>


      {/* WELLBEING GRAPH */}

      <section className="dashboard-section graph-section">

        <h2>
          📈 Wellbeing Trends
        </h2>

        <p className="section-description">
          See how your mood, stress, energy and sleep
          change over time.
        </p>


        {checkIns.length < 2 ? (

          <p className="empty">
            Add at least two check-ins to see your wellbeing graph.
          </p>

        ) : (

          <div className="chart-container">

            <Line
              data={chartData}
              options={chartOptions}
            />

          </div>

        )}

      </section>


      {/* PERSONAL INSIGHT */}

      <section className="dashboard-section insight-box">

        <h2>
          🔍 Personal Insight
        </h2>

        <p>
          {pattern}
        </p>

        <small>
          This insight is based on your personal
          data and is not a medical diagnosis.
        </small>

      </section>


      {/* PROGRESS */}

      <section className="dashboard-section">

        <h2>
          📈 Your Progress
        </h2>

        <p>
          You have completed{" "}
          <strong>{checkIns.length}</strong>{" "}
          check-in
          {checkIns.length !== 1 ? "s" : ""}.
        </p>

        <button
          className="main-button"
          onClick={() => setPage("checkin")}
        >
          Add New Check-in
        </button>

      </section>

    </main>
  );
}


// =====================================================
// CHECK-IN PAGE
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
  saveCheckIn
}) {

  return (

    <main className="container">

      <div className="page-title">

        <p className="small-title">
          DAILY REFLECTION
        </p>

        <h1>
          Daily Check-in
        </h1>

        <p>
          Take a moment to record how you feel today.
        </p>

      </div>


      <section className="checkin-box">

        <form onSubmit={saveCheckIn}>

          {/* MOOD */}

          <div className="slider-group">

            <label>

              <span>
                🙂 Mood
              </span>

              <strong>
                {mood}/10
              </strong>

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

              <span>
                😟 Stress
              </span>

              <strong>
                {stress}/10
              </strong>

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

              <span>
                ⚡ Energy
              </span>

              <strong>
                {energy}/10
              </strong>

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


          <button
            className="main-button"
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
// DIARY PAGE
// =====================================================

function Diary({
  diary,
  setDiary,
  diaryEntries,
  saveDiary
}) {

  return (

    <main className="container">

      <div className="page-title">

        <p className="small-title">
          PERSONAL SPACE
        </p>

        <h1>
          My Diary
        </h1>

        <p>
          Write down your thoughts and experiences.
        </p>

      </div>


      <section className="diary-box">

        <h2>
          ✍️ Today's Entry
        </h2>

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

        <h2>
          📔 Previous Entries
        </h2>

        {diaryEntries.length === 0 ? (

          <p className="empty">
            No diary entries yet.
          </p>

        ) : (

          diaryEntries.map((entry) => (

            <div
              className="diary-entry"
              key={entry._id}
            >

              <span>
                {entry.createdAt
                  ? new Date(
                      entry.createdAt
                    ).toLocaleDateString()
                  : "Today"}
              </span>

              <p>
                {entry.text}
              </p>

            </div>

          ))

        )}

      </section>

    </main>
  );
}


// =====================================================
// HISTORY PAGE
// =====================================================

function History({
  checkIns,
  pattern
}) {

  return (

    <main className="container">

      <div className="page-title">

        <p className="small-title">
          YOUR DATA
        </p>

        <h1>
          Check-in History
        </h1>

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

          checkIns.map((checkIn) => (

            <div
              className="history-card"
              key={checkIn._id}
            >

              <div>

                <span>
                  Mood
                </span>

                <strong>
                  🙂 {checkIn.mood}/10
                </strong>

              </div>


              <div>

                <span>
                  Stress
                </span>

                <strong>
                  😟 {checkIn.stress}/10
                </strong>

              </div>


              <div>

                <span>
                  Energy
                </span>

                <strong>
                  ⚡ {checkIn.energy}/10
                </strong>

              </div>


              <div>

                <span>
                  Sleep
                </span>

                <strong>
                  🌙 {checkIn.sleep} hrs
                </strong>

              </div>


              <div>

                <span>
                  Goal
                </span>

                <strong>
                  🎯 {checkIn.goal || "No goal"}
                </strong>

              </div>

            </div>

          ))

        )}

      </section>


      <section className="dashboard-section insight-box">

        <h2>
          🔍 Personal Pattern
        </h2>

        <p>
          {pattern}
        </p>

        <small>
          MindMirror provides personal wellbeing
          insights and is not a replacement for
          professional medical care.
        </small>

      </section>

    </main>
  );
}


// =====================================================
// MAIN APP
// =====================================================

function App() {

  // PAGE

  const [page, setPage] = useState("home");


  // CHECK-IN VALUES

  const [mood, setMood] = useState(5);
  const [stress, setStress] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [sleep, setSleep] = useState(7);
  const [goal, setGoal] = useState("");


  // CHECK-IN HISTORY

  const [checkIns, setCheckIns] = useState([]);


  // DIARY

  const [diary, setDiary] = useState("");
  const [diaryEntries, setDiaryEntries] = useState([]);


  // SUMMARY

  const [summary, setSummary] = useState({
    mood: 0,
    stress: 0,
    energy: 0,
    sleep: 0
  });


  // PERSONAL PATTERN

  const [pattern, setPattern] = useState(
    "Keep adding check-ins to discover your personal patterns."
  );


  // =====================================================
  // GET CHECK-INS
  // =====================================================

  async function getCheckIns() {

    try {

      const response = await fetch(
        "http://localhost:5000/api/checkins"
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

      }

    } catch (error) {

      console.log(
        "Error getting check-ins:",
        error
      );

    }

  }


  // =====================================================
  // CALCULATE SUMMARY
  // =====================================================

  function calculateSummary(data) {

    if (data.length === 0) {

      setSummary({
        mood: 0,
        stress: 0,
        energy: 0,
        sleep: 0
      });

      return;
    }


    let totalMood = 0;
    let totalStress = 0;
    let totalEnergy = 0;
    let totalSleep = 0;


    data.forEach((checkIn) => {

      totalMood += Number(checkIn.mood);
      totalStress += Number(checkIn.stress);
      totalEnergy += Number(checkIn.energy);
      totalSleep += Number(checkIn.sleep);

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
      ).toFixed(1)

    });

  }


  // =====================================================
  // FIND PERSONAL PATTERN
  // =====================================================

  function findPattern(data) {

    if (data.length < 2) {

      setPattern(
        "Keep adding check-ins to discover your personal patterns."
      );

      return;

    }


    let lowSleepHighStress = 0;


    data.forEach((checkIn) => {

      if (
        Number(checkIn.sleep) < 6 &&
        Number(checkIn.stress) >= 7
      ) {

        lowSleepHighStress++;

      }

    });


    if (lowSleepHighStress > 0) {

      setPattern(
        "Your stress was higher on some days when your sleep was lower."
      );

    } else {

      setPattern(
        "No clear pattern found yet. Keep adding daily check-ins."
      );

    }

  }


  // =====================================================
  // GET DIARY
  // =====================================================

  async function getDiaryEntries() {

    try {

      const response = await fetch(
        "http://localhost:5000/api/diary"
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

      goal: goal

    };


    try {

      const response = await fetch(
        "http://localhost:5000/api/checkins",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(
            checkInData
          )

        }
      );


      if (response.ok) {

        alert(
          "Check-in saved successfully!"
        );

        setGoal("");

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
        "http://localhost:5000/api/diary",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            text: diary
          })

        }
      );


      if (response.ok) {

        alert(
          "Diary entry saved!"
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
  // SELECT PAGE
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

      {/* HEADER */}

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
            onClick={() =>
              setPage("home")
            }
          >
            Home
          </button>


          <button
            className={
              page === "dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              setPage("dashboard")
            }
          >
            Dashboard
          </button>


          <button
            className={
              page === "checkin"
                ? "active"
                : ""
            }
            onClick={() =>
              setPage("checkin")
            }
          >
            Check-in
          </button>


          <button
            className={
              page === "diary"
                ? "active"
                : ""
            }
            onClick={() =>
              setPage("diary")
            }
          >
            Diary
          </button>


          <button
            className={
              page === "history"
                ? "active"
                : ""
            }
            onClick={() =>
              setPage("history")
            }
          >
            History
          </button>

        </nav>

      </header>


      {/* PAGE */}

      {showPage()}


      {/* FOOTER */}

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