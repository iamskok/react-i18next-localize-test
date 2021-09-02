import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import "./App.css";
import Switch from "./Switch";

function App() {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();

  const handleClick = () => setCount((prevState) => prevState + 1);

  return (
    <div className="App">
      <Switch />
      <h1>{t("description.part2")}</h1>
      <p>
        <Trans i18nKey="description.part1">
          Edit <code>src/App.js</code> and save to <span>reload</span>.
        </Trans>
      </p>
      <time>{t("date", { date: new Date() })}</time>
      <button
        onClick={handleClick}
        style={{
          cursor: "pointer",
          margin: "20px 0",
        }}
      >
        {t("counter", { count })}
      </button>
    </div>
  );
}

export default App;
