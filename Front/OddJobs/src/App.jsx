import { BrowserRouter, Routes, Route } from "react-router-dom";

import { OddJobs } from "./pages/landingPage/OddJobs";
import { Client } from "./pages/ClientU/Client";
import { Worker } from "./pages/WorkerU/Worker";

import { LandingPageContextProvider } from "./context/LandingPageContext/LandingPageContext";
import { UsersPageContextProvider } from "./context/UsersPageContext/UsersPageContext";
import NotPageFound from "./pages/NoPage/NotFountPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPageContextProvider>
              <OddJobs />
            </LandingPageContextProvider>
          }
        />
        <Route
          path="/Client"
          element={
            <UsersPageContextProvider>
              <Client />
            </UsersPageContextProvider>
          }
        />
        <Route
          path="/Worker"
          element={
            <UsersPageContextProvider>
              <Worker />
            </UsersPageContextProvider>
          }
        />
        <Route path="*" element={<NotPageFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
