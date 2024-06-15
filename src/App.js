import { Topbar } from "./components/Topbar";
import { Sidebar } from "./components/Sidebar";
import { HomePage, LoginPage } from "./pages";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";


function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar/>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
