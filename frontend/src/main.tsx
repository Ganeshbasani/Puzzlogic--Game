import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";

const rootStyles = getComputedStyle(document.documentElement);
const themeColor = rootStyles.getPropertyValue("--color-primary").trim();
const themeMeta = document.querySelector('meta[name="theme-color"]');

if (themeColor) {
  if (themeMeta) {
    themeMeta.setAttribute("content", themeColor);
  } else {
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = themeColor;
    document.head.appendChild(meta);
  }
}

createRoot(document.getElementById("root")!).render(<App />);
