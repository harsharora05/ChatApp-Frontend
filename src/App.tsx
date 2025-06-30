import { useEffect } from "react"
import { Homepage } from "./pages/Homepage"

export const App = () => {
  useEffect(() => { localStorage.setItem("Theme", "Light") }, []);
  return <div>
    <Homepage />
  </div>
}