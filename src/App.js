import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Homepage from "./components/Homepage/Homepage";
import Profile from "./components/Profile/Profile";
import styled from "styled-components";
import ProtectedRoutes from "./components/ProtectedRoutes";

const AppContainer = styled.div`
  font-family: Helvetica, Arial, sans-serif;
`;

function App() {
  return (
    <AppContainer>
      <Router>
        <Routes>
          {/* public routes */}
          <Route exact path="/JeremiePiard_13_21092022/" element={<Homepage />} />
          <Route path="/JeremiePiard_13_21092022/login" element={<Login />} />

          {/* protected routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/JeremiePiard_13_21092022/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
