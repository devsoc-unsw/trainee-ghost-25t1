import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { SignUp, Login, TeamSelection, Home } from "./pages";
import AuthProvider from "./context/authProvider";
import HomeProvider from "./context/HomeProvider";

function App() {
  return (
    <>
      <main>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/team-selection" element={<TeamSelection />} />
              <Route
                path="/"
                element={
                  <HomeProvider>
                    <Home />
                  </HomeProvider>
                }
              />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
