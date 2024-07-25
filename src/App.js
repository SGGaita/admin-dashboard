import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard,  HomePage, LoginPage, NewUser } from "./pages";
import { SidebarComponent } from "./components/Sidebar";
import {Topbar} from './components/Topbar'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Datatable } from "./pages/DataTable/Datatable";
import {mockDataTeam} from "./data/mockData"
import { StatusCheck } from "./pages/StatusCheck";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SidebarComponent isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
            <Route path="/" element={<LoginPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/new-job" exact element={<HomePage />} />
              {/* //<Route path="/open-jobs" exact element={<Datatable title="Open Job cards" subtitle="Create New Job card" data={mockDataTeam} />} /> */}
              {/* CLient routes*/}
              <Route path="/status-check" element={<StatusCheck/>}/>
              <Route path="/new-user" element={<NewUser/>}/>
              <Route />

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;