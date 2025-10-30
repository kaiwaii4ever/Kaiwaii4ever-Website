import { Box, CssBaseline } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import Main from "./DashboardPages/Main";
import Settings from "./DashboardPages/Settings";
import Profile from "./DashboardPages/Profile";

import YATBDocUser from './DashboardPages/YATB/DocumentedUsers';
import YATBPlayerStore from './DashboardPages/YATB/PlayerStore'; 
import YATBDev from './DashboardPages/YATB/Developer';
import YATBBannedUsers from './DashboardPages/YATB/BannedUser';

import YATBInDevDocUser from './DashboardPages/YATB-INDEV/DocumentedUsers';
import YATBInDevPlayerStore from './DashboardPages/YATB-INDEV/PlayerStore';
import YATBInDevDev from './DashboardPages/YATB-INDEV/Developer';
import YATBInDevBannedUsers from './DashboardPages/YATB-INDEV/BannedUser';


export default function DashboardPage() {
  return (
    <>
      <CssBaseline />
      <Topbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/profile" element={<Navigate to="/dashboard" replace />} />

          <Route path="YATB/documented-users" element={<YATBDocUser />} />
          <Route path="YATB/player-store" element={<YATBPlayerStore />} />
          <Route path="YATB/developer" element={<YATBDev />} />
          <Route path="YATB/banned-users" element={<YATBBannedUsers />} />

          <Route path="YATB-INDEV/documented-users" element={<YATBInDevDocUser />} />
          <Route path="YATB-INDEV/player-store" element={<YATBInDevPlayerStore />} />
          <Route path="YATB-INDEV/developer" element={<YATBInDevDev />} />
          <Route path="YATB-INDEV/banned-users" element={<YATBInDevBannedUsers />} />
        </Routes>
      </Box>
    </>
  );
}