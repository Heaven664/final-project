import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(destination, status) {
    setHistory(prev => {
      if (status !== true) {
        return [...prev, destination];
      }
      return [...prev.slice(0,-1), destination];
    });
      setMode(destination);
    }

  function back() {
    if (mode !== initial) {
      history.pop();
      const element = history[history.length - 1];
      return setMode(element);
    }
  }

  return { mode, transition, back };
}
