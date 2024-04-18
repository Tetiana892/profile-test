import React from "react";
import SmokingInput from "./components/SmokingInput/SmokingInput";
import GuestsInput from "./components/GuestsInput/GuestsInput";
import styles from "./App.module.scss";
import HandleUpload from "./components/UploaderPhoto/HandleUpload";

function App() {
  return (
    <div className={styles.container}>
      <SmokingInput />
      <GuestsInput />
      <HandleUpload />
    </div>
  );
}

export default App;
