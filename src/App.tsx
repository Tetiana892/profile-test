import React from "react";
import SmokingInput from "./components/SmokingInput/SmokingInput";
import GuestsInput from "./components/GuestsInput/GuestsInput";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.container}>
      <SmokingInput />
      <GuestsInput />
    </div>
  );
}

export default App;
