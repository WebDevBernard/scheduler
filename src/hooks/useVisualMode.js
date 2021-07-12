import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newMode, replace = false){
    // should transition to another node
    setMode(newMode)
    // should replace the current mode
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), newMode])
    } else {
      setHistory(prev => [...prev, newMode])
    }
  }
  function back(){
    // should return to previous mode
    if (history.length > 1){
      setMode(history[history.length - 2])
      setHistory(prev => [...prev.slice(0, -1)])
    }
  }
  return { mode, transition, back };
}
