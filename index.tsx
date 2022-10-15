import React, {useEffect} from "react";
import ReactDOM from "react-dom/client";
import App from "pages/App";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import "./styles/utils.css";
import "./styles/styles.css";
import "inter-ui/inter.css";

const darkTheme = createTheme({
  type: "dark",
  theme: {
    fonts: {
      sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto","Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif',
    },
  },
});
 
function ReactApp() {
  useEffect(() => {
    const onScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      console.log("bottom page")
    }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <React.StrictMode>
      <NextUIProvider theme={darkTheme}>
        <App />
      </NextUIProvider>
    </React.StrictMode>
  );
}

const root = document.getElementById("root") as HTMLElement;
const app = ReactDOM.createRoot(root);
app.render(<ReactApp />);
