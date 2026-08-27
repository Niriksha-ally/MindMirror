import { useState } from "react";

function App() {
  const [mood, setMood] = useState(5);
  const [stress, setStress] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [sleep, setSleep] = useState(7);
  const [goal, setGoal] = useState("");

  function saveCheckIn(event) {
    event.preventDefault();

    alert("Check-in saved!");
  }

  return (
    <div>
      <h1>🌿 MindMirror</h1>

      <p>Personal Wellbeing Pattern Analyzer</p>

      <p>
        Track. Analyze. Discover. Reflect.
      </p>

      <hr />

      <h2>Today's Wellbeing</h2>

      <p>🙂 Mood: {mood} / 10</p>
      <p>😟 Stress: {stress} / 10</p>
      <p>⚡ Energy: {energy} / 10</p>
      <p>🌙 Sleep: {sleep} hours</p>

      <hr />

      <h2>Daily Check-in</h2>

      <form onSubmit={saveCheckIn}>

        <label>
          Mood: {mood} / 10
        </label>

        <br />

        <input
          type="range"
          min="1"
          max="10"
          value={mood}
          onChange={(event) => setMood(event.target.value)}
        />

        <br />
        <br />

        <label>
          Stress: {stress} / 10
        </label>

        <br />

        <input
          type="range"
          min="1"
          max="10"
          value={stress}
          onChange={(event) => setStress(event.target.value)}
        />

        <br />
        <br />

        <label>
          Energy: {energy} / 10
        </label>

        <br />

        <input
          type="range"
          min="1"
          max="10"
          value={energy}
          onChange={(event) => setEnergy(event.target.value)}
        />

        <br />
        <br />

        <label>
          Sleep: 
        </label>

        <input
          type="number"
          min="0"
          max="24"
          step="0.5"
          value={sleep}
          onChange={(event) => setSleep(event.target.value)}
        />

        <br />
        <br />

        <label>
          Today's Goal:
        </label>

        <br />

        <input
          type="text"
          placeholder="Example: Study for 1 hour"
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          Save Check-in
        </button>

      </form>

      <hr />

      <h2>Personal Pattern</h2>

      <p>
        Your recent stress was higher when your sleep was lower.
      </p>

      <p>
        This is based on your personal data and is not a medical diagnosis.
      </p>
    </div>
  );
}

export default App;