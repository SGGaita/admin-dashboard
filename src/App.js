import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Dashboard, HomePage, LoginPage, NewUser } from "./pages";
import { SidebarComponent } from "./components/Sidebar";
import { Topbar } from './components/Topbar'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { mockDataTeam } from "./data/mockData"
import { StatusCheck } from "./pages/StatusCheck";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { selectLogin } from "./redux/authSlice";
import { RoutesLayout } from "./RoutesLayout";

function App() {
  const [theme, colorMode] = useMode();
 

  

  return (
    <Provider store={store}>  <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RoutesLayout/>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  );
}

export default App;
