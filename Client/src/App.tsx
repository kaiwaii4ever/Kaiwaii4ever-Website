import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createDarkTheme } from './theme';
import Login from './pages/Login/Login';
import DashboardPages from './pages/Dashboard/Dashboard';
import MainPages from './pages/Main/Main';

const darkTheme = createDarkTheme();

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<DashboardPages />} />
          <Route path="/*" element={<MainPages />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;